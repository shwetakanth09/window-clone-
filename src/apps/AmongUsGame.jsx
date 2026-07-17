import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #1a1a1a; border: 2px solid #555; border-radius: 8px; overflow: hidden;
  width: 380px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #b71c1c, #c62828);
  padding: 8px 12px; display: flex; justify-content: space-between; align-items: center;
`;
const Title = styled.span` color: #fff; font-size: 12px; font-weight: bold; `;
const CloseBtn = styled.button`
  background: #e53935; color: white; border: none; width: 20px; height: 20px;
  border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;
`;
const Body = styled.div` padding: 30px 20px; text-align: center; background: #0d0d0d; `;
const GameTitle = styled.h2` color: #e53935; margin: 0 0 12px; font-size: 22px; text-transform: uppercase; letter-spacing: 2px; `;
const Subtitle = styled.p` color: #888; font-size: 12px; margin: 0 0 20px; `;
const PlayBtn = styled.a`
  display: inline-block; padding: 10px 24px; background: #e53935; color: #fff;
  border: none; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: bold;
  cursor: pointer; text-transform: uppercase; letter-spacing: 1px;
  transition: background 0.2s;
  &:hover { background: #c62828; }
`;

export default function AmongUsGame({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>🔴 Among Us</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <GameTitle>Among Us</GameTitle>
          <Subtitle>Game loading from external source...</Subtitle>
          <PlayBtn href="https://hilarious-seahorse-053a9d.netlify.app/" target="_blank" rel="noopener noreferrer">
            ▶ Play in new tab
          </PlayBtn>
        </Body>
      </WinBox>
    </Overlay>
  );
}
