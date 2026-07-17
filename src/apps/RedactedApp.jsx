import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #1a1a1a; border: 2px solid #444; border-radius: 8px; overflow: hidden;
  width: 360px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #111, #333);
  padding: 8px 12px; display: flex; justify-content: space-between; align-items: center;
`;
const Title = styled.span` color: #888; font-size: 12px; font-weight: bold; `;
const CloseBtn = styled.button`
  background: #444; color: #888; border: none; width: 20px; height: 20px;
  border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;
  &:hover { color: #fff; }
`;
const Body = styled.div` padding: 30px 20px; text-align: center; background: #0a0a0a; `;
const GameTitle = styled.h2` color: #666; margin: 0 0 8px; font-size: 20px; letter-spacing: 4px; text-transform: uppercase; `;
const Desc = styled.p` color: #444; font-size: 12px; margin: 0 0 20px; `;
const VisitBtn = styled.a`
  display: inline-block; padding: 10px 24px; background: #222; color: #888;
  border: 1px solid #444; border-radius: 4px; text-decoration: none; font-size: 13px;
  cursor: pointer; font-family: 'MS Sans Serif', Tahoma, sans-serif;
  transition: all 0.2s;
  &:hover { background: #333; color: #ccc; border-color: #666; }
`;

export default function RedactedApp({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>█ REDACTED</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <GameTitle>Redacted</GameTitle>
          <Desc>bio page & social links</Desc>
          <VisitBtn href="https://redacted.bio/" target="_blank" rel="noopener noreferrer">
            ▶ Visit Profile
          </VisitBtn>
        </Body>
      </WinBox>
    </Overlay>
  );
}
