import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const eqBar = keyframes`
  0%, 100% { height: 10%; }
  25% { height: 80%; }
  50% { height: 40%; }
  75% { height: 95%; }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1a1a2e;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  color: #e0e0e0;
  overflow: hidden;
`;

const PlayerHeader = styled.div`
  padding: 12px 16px;
  background: linear-gradient(180deg, #16213e, #0f3460);
  text-align: center;
  border-bottom: 1px solid #333;
`;

const TrackTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #00d4ff;
  text-shadow: 0 0 10px #00d4ff40;
  margin-bottom: 2px;
`;

const TrackArtist = styled.div`
  font-size: 11px;
  color: #888;
`;

const EQSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 60px;
  padding: 10px 0;
  background: #0a0a1a;
`;

const EQBar = styled.div`
  width: 4px;
  background: linear-gradient(180deg, #ff6b6b, #ffd93d, #00d4ff);
  border-radius: 1px;
  animation: ${eqBar} ${({ $speed }) => $speed}s ease-in-out infinite;
  animation-play-state: ${({ $playing }) => ($playing ? 'running' : 'paused')};
`;

const ProgressSection = styled.div`
  padding: 8px 16px;
  background: #111;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, #00d4ff, #0099ff);
  border-radius: 2px;
  transition: width 0.3s linear;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #666;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background: #111;
`;

const CtrlBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: ${({ $primary }) => ($primary ? '#00d4ff' : '#222')};
  color: ${({ $primary }) => ($primary ? '#000' : '#ccc')};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: ${({ $primary }) => ($primary ? '0 0 15px #00d4ff40' : 'none')};

  &:hover {
    transform: scale(1.1);
    background: ${({ $primary }) => ($primary ? '#00e5ff' : '#333')};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: #111;
`;

const VolumeLabel = styled.span`
  font-size: 14px;
`;

const VolumeSlider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  background: #333;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #00d4ff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 6px #00d4ff40;
  }
`;

const Playlist = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #0a0a1a;
  border-top: 1px solid #222;
`;

const PlaylistHeader = styled.div`
  padding: 8px 12px;
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #111;
  border-bottom: 1px solid #222;
`;

const PlaylistItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-bottom: 1px solid #1a1a1a;
  background: ${({ $active }) => ($active ? '#00d4ff10' : 'transparent')};
  transition: background 0.1s;

  &:hover {
    background: #ffffff08;
  }
`;

const TrackNumber = styled.span`
  font-size: 11px;
  color: #555;
  min-width: 20px;
`;

const TrackInfo = styled.div`
  flex: 1;
`;

const TrackName = styled.div`
  font-size: 12px;
  color: ${({ $active }) => ($active ? '#00d4ff' : '#ccc')};
`;

const TrackDuration = styled.span`
  font-size: 11px;
  color: #555;
`;

const TRACKS = [
  { name: 'READ MY MIND', duration: '3:42' },
  { name: 'Caramella', duration: '2:58' },
  { name: 'Windows Ambience', duration: '5:15' },
  { name: 'Bella Ciao', duration: '2:34' },
  { name: 'Resonance', duration: '3:21' },
];

export default function MusicApp() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setTrack((t) => (t + 1) % TRACKS.length);
            return 0;
          }
          return p + 0.5;
        });
      }, 200);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const togglePlay = () => setPlaying((p) => !p);
  const prevTrack = () => { setTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };
  const nextTrack = () => { setTrack((t) => (t + 1) % TRACKS.length); setProgress(0); };

  return (
    <Container>
      <PlayerHeader>
        <TrackTitle>{TRACKS[track].name}</TrackTitle>
        <TrackArtist>xque</TrackArtist>
      </PlayerHeader>

      <EQSection>
        {Array.from({ length: 16 }).map((_, i) => (
          <EQBar
            key={i}
            $speed={0.3 + Math.random() * 0.8}
            $playing={playing}
          />
        ))}
      </EQSection>

      <ProgressSection>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
        <TimeDisplay>
          <span>{formatTime(progress, TRACKS[track].duration)}</span>
          <span>{TRACKS[track].duration}</span>
        </TimeDisplay>
      </ProgressSection>

      <Controls>
        <CtrlBtn onClick={prevTrack}>⏮</CtrlBtn>
        <CtrlBtn $primary onClick={togglePlay}>
          {playing ? '⏸' : '▶'}
        </CtrlBtn>
        <CtrlBtn onClick={nextTrack}>⏭</CtrlBtn>
      </Controls>

      <VolumeSection>
        <VolumeLabel>🔊</VolumeLabel>
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </VolumeSection>

      <Playlist>
        <PlaylistHeader>Playlist ({TRACKS.length} tracks)</PlaylistHeader>
        {TRACKS.map((t, i) => (
          <PlaylistItem
            key={i}
            $active={i === track}
            onClick={() => { setTrack(i); setProgress(0); }}
          >
            <TrackNumber>{i === track && playing ? '▶' : `${i + 1}`}</TrackNumber>
            <TrackInfo>
              <TrackName $active={i === track}>{t.name}</TrackName>
            </TrackInfo>
            <TrackDuration>{t.duration}</TrackDuration>
          </PlaylistItem>
        ))}
      </Playlist>
    </Container>
  );
}

function formatTime(progressPercent, durationStr) {
  const parts = durationStr.split(':');
  const totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  const currentSec = Math.floor((progressPercent / 100) * totalSec);
  const m = Math.floor(currentSec / 60);
  const s = currentSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
