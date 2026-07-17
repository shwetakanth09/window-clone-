import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #c0c0c0; border: 2px solid #dfdfdf; border-top-color: #fff;
  border-left-color: #fff; border-right-color: #808080; border-bottom-color: #808080;
  width: 480px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;
`;
const Title = styled.span` color: #fff; font-size: 12px; font-weight: bold; `;
const CloseBtn = styled.button`
  background: #c0c0c0; border: 1px solid #dfdfdf; border-right-color: #808080;
  border-bottom-color: #808080; width: 18px; height: 18px; font-size: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
`;
const Body = styled.div` padding: 16px; text-align: center; `;
const PlayerPlaceholder = styled.div`
  background: #000; width: 100%; aspect-ratio: 16/9; display: flex;
  align-items: center; justify-content: center; color: #555;
  font-size: 14px; border: 2px inset #999; margin-bottom: 12px;
`;
const GameTitle = styled.h2` color: #000080; margin: 0 0 12px; font-size: 16px; `;
const WatchBtn = styled.a`
  display: inline-block; padding: 8px 20px; background: #c0c0c0;
  border: 2px solid #dfdfdf; border-right-color: #808080; border-bottom-color: #808080;
  color: #000; text-decoration: none; font-size: 13px; cursor: pointer;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  &:active { border-color: #808080; border-right-color: #dfdfdf; border-bottom-color: #dfdfdf; }
`;

export default function VideoApp({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>🎬 Video Player</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <PlayerPlaceholder>▶ Video Player</PlayerPlaceholder>
          <GameTitle>My YouTube Playlist</GameTitle>
          <WatchBtn href="https://www.youtube.com/playlist?list=PLLgmgkxiK6hM47PEwFHDT6R81-oBiqWkm" target="_blank" rel="noopener noreferrer">
            ▶ Watch Playlist
          </WatchBtn>
        </Body>
      </WinBox>
    </Overlay>
  );
}
