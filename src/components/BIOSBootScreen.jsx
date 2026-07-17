import { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const scanline = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 4px #aaa; }
  50% { text-shadow: 0 0 8px #fff, 0 0 12px #0f0; }
`;

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #000;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const ScanlineOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  z-index: 2;
`;

const MovingScanline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(0, 255, 0, 0.03),
    transparent
  );
  animation: ${scanline} 6s linear infinite;
  z-index: 3;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  margin-bottom: 20px;
`;

const Line = styled.pre`
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: ${({ $color }) => $color || '#aaa'};
  line-height: 1.7;
  white-space: pre-wrap;
  animation: ${glow} 3s ease-in-out infinite;
  opacity: 0;
  animation: fadeInLine 0.1s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  @keyframes fadeInLine {
    to { opacity: 1; }
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 9px;
  height: 16px;
  background: #0f0;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
  box-shadow: 0 0 6px #0f0;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 30px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #555;
`;

const ProgressBar = styled.div`
  flex: 1;
  max-width: 300px;
  height: 4px;
  background: #111;
  border-radius: 2px;
  overflow: hidden;
  margin-left: 20px;
  align-self: center;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #0a0, #0f0);
  width: ${({ $progress }) => $progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px #0f0;
`;

const PromptText = styled.div`
  position: absolute;
  bottom: 60px;
  left: 40px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #555;
  animation: ${blink} 2s step-end infinite;
`;

const BIOS_LINES = [
  { text: 'PhoenixBIOS 1.4 Release 6.0', color: '#fff' },
  { text: 'Copyright 1985-2001 Phoenix Technologies Ltd.', color: '#888' },
  { text: 'Copyright 2001-2003 VMware, Inc.', color: '#888' },
  { text: 'VMware BIOS build 314', color: '#888' },
  { text: '', color: '#aaa' },
  { text: 'Memory Test: 4096 MB OK', color: '#0f0' },
  { text: '', color: '#aaa' },
  { text: 'ATAPI CD-ROM: VMware Virtual IDECDROM Drive', color: '#aaa' },
  { text: 'VMware Virtual disk: 20.0 GB', color: '#aaa' },
  { text: '', color: '#aaa' },
  { text: 'Detecting Primary Master... VMware Virtual disk', color: '#aaa' },
  { text: 'Detecting Primary Slave... None', color: '#666' },
  { text: 'Detecting Secondary Master... VMware Virtual IDECDROM Drive', color: '#aaa' },
  { text: 'Detecting Secondary Slave... None', color: '#666' },
  { text: '', color: '#aaa' },
  { text: 'USB Controller: 4 ports detected', color: '#0f0' },
  { text: 'Network Adapter: VMware Virtual Ethernet', color: '#0f0' },
  { text: '', color: '#aaa' },
  { text: 'Press F2 to enter SETUP', color: '#ff0' },
  { text: '04/01/2024-VMware-440BX-82440BX-W83977F-2A6LH927C-00', color: '#555' },
];

export default function BIOSBootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (visibleLines >= BIOS_LINES.length) {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
    const delay = BIOS_LINES[visibleLines].text === '' ? 40 : 100 + Math.random() * 60;
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setProgress(Math.round(((visibleLines + 1) / BIOS_LINES.length) * 100));
    }, delay);
    return () => clearTimeout(timer);
  }, [visibleLines, finish]);

  useEffect(() => {
    const hardStop = setTimeout(finish, 4500);
    return () => clearTimeout(hardStop);
  }, [finish]);

  return (
    <Container
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={finish}
    >
      <ScanlineOverlay />
      <MovingScanline />
      <Content>
        <TopSection>
          {BIOS_LINES.slice(0, visibleLines).map((line, i) => (
            <Line key={i} $color={line.color} $delay={`${i * 0.05}s`}>
              {line.text}
            </Line>
          ))}
          {visibleLines < BIOS_LINES.length && <Cursor />}
        </TopSection>
      </Content>
      <BottomBar>
        <span>VMware BIOS v3.14</span>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
        <span>{progress}%</span>
      </BottomBar>
      <PromptText>Press any key to skip...</PromptText>
    </Container>
  );
}
