import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #c0c0c0; border: 2px solid #dfdfdf; border-top-color: #fff;
  border-left-color: #fff; border-right-color: #808080; border-bottom-color: #808080;
  width: 520px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
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
const Body = styled.div` padding: 16px; `;
const Heading = styled.h2` color: #000080; text-align: center; margin: 0 0 16px; font-size: 18px; `;
const Cards = styled.div` display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; `;
const Card = styled.div`
  background: #d4d0c8; border: 2px solid #dfdfdf; border-right-color: #808080;
  border-bottom-color: #808080; padding: 16px; width: 140px; text-align: center;
`;
const CardTitle = styled.p` font-weight: bold; color: #000; margin: 0 0 12px; font-size: 13px; min-height: 36px; `;
const CardBtn = styled.a`
  display: inline-block; padding: 4px 16px; background: #c0c0c0;
  border: 2px solid #dfdfdf; border-right-color: #808080; border-bottom-color: #808080;
  color: #000; text-decoration: none; font-size: 12px; cursor: pointer;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  &:active { border-color: #808080; border-right-color: #dfdfdf; border-bottom-color: #dfdfdf; }
`;

const games = [
  { title: "Class of '09", url: "https://visionary-kashata-ba7c3e.netlify.app/" },
  { title: "The Re-Up", url: "https://tiny-scone-143cb7.netlify.app/" },
  { title: "The Flip Side", url: "https://superlative-snickerdoodle-4e9895.netlify.app/" },
];

export default function ClassOf09App({ onClose }) {
  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>📖 Visual Novels</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <Heading>Class of '09 Collection</Heading>
          <Cards>
            {games.map(g => (
              <Card key={g.title}>
                <CardTitle>{g.title}</CardTitle>
                <CardBtn href={g.url} target="_blank" rel="noopener noreferrer">▶ Play</CardBtn>
              </Card>
            ))}
          </Cards>
        </Body>
      </WinBox>
    </Overlay>
  );
}
