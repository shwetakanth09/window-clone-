import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #c0c0c0; border: 2px solid #dfdfdf; border-top-color: #fff;
  border-left-color: #fff; border-right-color: #808080; border-bottom-color: #808080;
  width: 420px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #880e4f, #ad1457);
  padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;
`;
const Title = styled.span` color: #fff; font-size: 12px; font-weight: bold; `;
const CloseBtn = styled.button`
  background: #c0c0c0; border: 1px solid #dfdfdf; border-right-color: #808080;
  border-bottom-color: #808080; width: 18px; height: 18px; font-size: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
`;
const Body = styled.div`
  padding: 30px 20px; text-align: center;
  background: linear-gradient(180deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%);
`;
const TitleText = styled.h1`
  color: #880e4f; margin: 0 0 6px; font-size: 26px; font-family: serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;
const Subtitle = styled.p` color: #ad1457; font-size: 13px; margin: 0 0 4px; font-style: italic; `;
const MonikaText = styled.p`
  color: #880e4f; font-size: 18px; font-weight: bold; margin: 16px 0 0;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  animation: pulse 2s ease-in-out infinite;
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
`;
const Divider = styled.hr` border: none; border-top: 2px solid #e91e63; margin: 12px 0; `;
const Note = styled.p` color: #666; font-size: 11px; margin: 16px 0 0; `;

export default function DDLCApp({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>💗 DDLC</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <TitleText>Doki Doki Literature Club</TitleText>
          <Subtitle>A game about literature and love</Subtitle>
          <Divider />
          <MonikaText>Just Monika.</MonikaText>
          <Note>warning: this app contains scenes of emotional distress</Note>
        </Body>
      </WinBox>
    </Overlay>
  );
}
