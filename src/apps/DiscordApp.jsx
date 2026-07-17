import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #c0c0c0; border: 2px solid #dfdfdf; border-top-color: #fff;
  border-left-color: #fff; border-right-color: #808080; border-bottom-color: #808080;
  width: 360px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
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
const Body = styled.div` padding: 24px 20px; text-align: center; `;
const Card = styled.div`
  background: #5865F2; border-radius: 8px; padding: 24px 20px;
  color: #fff;
`;
const GameTitle = styled.h2` margin: 0 0 8px; font-size: 18px; `;
const Desc = styled.p` color: rgba(255,255,255,0.8); font-size: 13px; margin: 0 0 16px; `;
const JoinBtn = styled.a`
  display: inline-block; padding: 10px 24px; background: #fff; color: #5865F2;
  border: none; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: bold;
  cursor: pointer; font-family: 'MS Sans Serif', Tahoma, sans-serif;
  &:hover { background: #e8e8ff; }
`;

export default function DiscordApp({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>💬 Discord</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <Card>
            <GameTitle>💬 Discord</GameTitle>
            <Desc>Join my Discord server and chat!</Desc>
            <JoinBtn href="https://redacted.bio/xque" target="_blank" rel="noopener noreferrer">
              ▶ Join Discord
            </JoinBtn>
          </Card>
        </Body>
      </WinBox>
    </Overlay>
  );
}
