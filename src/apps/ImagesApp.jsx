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

const MenuBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 2px 6px;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
  font-size: 11px;
  color: #000;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-bottom: 1px solid #808080;
`;

const ActionBtn = styled.button`
  padding: 3px 10px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  font-family: inherit;
  font-size: 11px;
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

const ImageGrid = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
  align-content: start;
  background: #fff;
  margin: 2px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  border-top: ${p => p.$selected ? '2px solid #000080' : '2px solid #808080'};
  border-left: ${p => p.$selected ? '2px solid #000080' : '2px solid #808080'};
  border-bottom: ${p => p.$selected ? '2px solid #000080' : '2px solid #fff'};
  border-right: ${p => p.$selected ? '2px solid #000080' : '2px solid #fff'};
  cursor: pointer;
  overflow: hidden;
  background: #c0c0c0;

  &:hover {
    border-color: #000080;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: 16/10;
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  font-weight: bold;
`;

const ImageLabel = styled.div`
  padding: 3px 6px;
  font-size: 10px;
  color: #000;
  background: #c0c0c0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const StatusBar = styled.div`
  padding: 2px 8px;
  font-size: 10px;
  color: #000;
  border-top: 1px solid #808080;
  display: flex;
  justify-content: space-between;
`;

const wallpapers = [
  { name: 'Rei Ayanami', bg: 'linear-gradient(135deg, #1a0033, #4a0080, #7b2d8e)' },
  { name: 'Dark Vista', bg: 'linear-gradient(180deg, #0d1117, #161b22, #21262d)' },
  { name: 'Neon City', bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { name: 'Space', bg: 'linear-gradient(180deg, #000022, #000044, #000011)' },
  { name: 'Abstract', bg: 'linear-gradient(135deg, #2c3e50, #3498db, #2980b9)' },
  { name: 'Sunset', bg: 'linear-gradient(180deg, #e44d26, #f16529, #f39c12)' },
  { name: 'Forest', bg: 'linear-gradient(180deg, #134e1b, #1e7a2e, #2ecc71)' },
  { name: 'Ocean', bg: 'linear-gradient(180deg, #0c2340, #0d5697, #3498db)' },
];

function ImagesApp({ onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <Container>
      <MenuBar>
        <span>File</span><span>Edit</span><span>View</span><span>Help</span>
      </MenuBar>
      <Toolbar>
        <ActionBtn disabled={selected === null}>
          Set as Wallpaper
        </ActionBtn>
        <ActionBtn>Refresh</ActionBtn>
      </Toolbar>
      <ImageGrid>
        {wallpapers.map((wp, i) => (
          <ImageCard
            key={i}
            $selected={selected === i}
            onClick={() => setSelected(i)}
          >
            <Placeholder $bg={wp.bg}>{wp.name}</Placeholder>
            <ImageLabel>{wp.name}.jpg</ImageLabel>
          </ImageCard>
        ))}
      </ImageGrid>
      <StatusBar>
        <span>{wallpapers.length} items</span>
        <span>{selected !== null ? `Selected: ${wallpapers[selected].name}` : 'No selection'}</span>
      </StatusBar>
    </Container>
  );
}

export default ImagesApp;
