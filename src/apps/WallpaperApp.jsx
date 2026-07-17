import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Header = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: #fff;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: bold;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  margin: 4px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 0 8px 8px;
  min-height: 0;
`;

const GridSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  align-content: start;
  background: #fff;
  border: 2px inset #808080;
  padding: 6px;
  overflow-y: auto;
`;

const Thumb = styled.div`
  display: flex;
  flex-direction: column;
  border: ${p => p.$selected ? '2px solid #000080' : '2px solid #808080'};
  cursor: pointer;
  background: #c0c0c0;
  padding: 2px;

  &:hover {
    border-color: #000080;
  }
`;

const ThumbPreview = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: ${p => p.$bg};
`;

const ThumbLabel = styled.div`
  text-align: center;
  font-size: 9px;
  color: #000;
  padding: 2px;
`;

const PreviewSection = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
`;

const PreviewLabel = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: #000;
`;

const PreviewBox = styled.div`
  border: 2px inset #808080;
  background: #000;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PreviewBg = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.$bg || '#000'};
`;

const PreviewName = styled.div`
  font-size: 11px;
  color: #000;
  text-align: center;
  padding: 4px;
`;

const ApplyBtn = styled.button`
  padding: 6px 12px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  font-family: inherit;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  color: #000;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
  }

  &:disabled {
    color: #808080;
  }
`;

const wallpapers = [
  { name: 'Teal', bg: 'linear-gradient(180deg, #004040, #006060, #008080)' },
  { name: 'Dark Vista', bg: 'linear-gradient(180deg, #0d1117, #161b22, #21262d)' },
  { name: 'Rei', bg: 'linear-gradient(135deg, #1a0033, #4a0080, #7b2d8e)' },
  { name: 'Matrix', bg: 'linear-gradient(180deg, #000000, #001a00, #003300)' },
  { name: 'Space', bg: 'linear-gradient(180deg, #000022, #000044, #000011)' },
  { name: 'Neon', bg: 'linear-gradient(135deg, #ff00ff, #00ffff, #ff00ff)' },
  { name: 'Sunset', bg: 'linear-gradient(180deg, #e44d26, #f16529, #f39c12)' },
  { name: 'Forest', bg: 'linear-gradient(180deg, #134e1b, #1e7a2e, #2ecc71)' },
  { name: 'Ocean', bg: 'linear-gradient(180deg, #0c2340, #0d5697, #3498db)' },
];

function WallpaperApp({ onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <Container>
      <Header>Display Properties — Wallpaper</Header>
      <Content>
        <GridSection>
          {wallpapers.map((wp, i) => (
            <Thumb
              key={i}
              $selected={selected === i}
              onClick={() => setSelected(i)}
            >
              <ThumbPreview $bg={wp.bg} />
              <ThumbLabel>{wp.name}</ThumbLabel>
            </Thumb>
          ))}
        </GridSection>
        <PreviewSection>
          <PreviewLabel>Preview</PreviewLabel>
          <PreviewBox>
            <PreviewBg $bg={selected !== null ? wallpapers[selected].bg : undefined} />
          </PreviewBox>
          <PreviewName>
            {selected !== null ? wallpapers[selected].name : 'None selected'}
          </PreviewName>
          <ApplyBtn disabled={selected === null}>Apply</ApplyBtn>
          <ApplyBtn>Cancel</ApplyBtn>
        </PreviewSection>
      </Content>
    </Container>
  );
}

export default WallpaperApp;
