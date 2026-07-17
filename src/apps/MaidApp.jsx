import React, { useEffect, useRef, useState } from 'react';
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
const Body = styled.div` padding: 10px; background: #d4d0c8; `;
const TopBar = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px; `;
const Mood = styled.span` font-size: 16px; `;
const Palette = styled.div` display: flex; gap: 3px; `;
const Swatch = styled.button`
  width: 20px; height: 20px; border: 2px solid ${p => p.active ? '#000' : '#888'};
  background: ${p => p.color}; cursor: pointer; padding: 0;
`;
const Slider = styled.input` width: 80px; vertical-align: middle; margin-left: 8px; `;
const Btn = styled.button`
  padding: 3px 10px; background: #c0c0c0; font-size: 11px; cursor: pointer;
  border: 2px solid #dfdfdf; border-right-color: #808080; border-bottom-color: #808080;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  &:active { border-color: #808080; border-right-color: #dfdfdf; border-bottom-color: #dfdfdf; }
`;
const CanvasWrap = styled.div`
  border: 2px inset #999; background: #fff; cursor: crosshair; overflow: hidden;
`;
const Canvas = styled.canvas` display: block; width: 100%; `;

const COLORS = ['#000000','#ff0000','#ff8800','#ffff00','#00cc00','#0088ff','#8800ff','#ff00ff'];
const EMOJIS = ['🎨','✏️','🖌️','🖍️','🎭','✨','🌸','🦋','🌈','🎶','💫','🌺'];

export default function MaidApp({ onClose }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [brush, setBrush] = useState(4);
  const [mood, setMood] = useState(EMOJIS[0]);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 480; canvas.height = 320;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);

    const getPos = e => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    };

    const start = e => { drawing.current = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    const draw = e => {
      if (!drawing.current) return;
      const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = color; ctx.lineWidth = brush;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    };
    const stop = () => { drawing.current = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);

    const interval = setInterval(() => setMood(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]), 3000);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stop);
      canvas.removeEventListener('mouseleave', stop);
      clearInterval(interval);
    };
  }, [color, brush]);

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>🎨 Arts & Crafts</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <TopBar>
            <div>
              <Mood>{mood}</Mood>
              <Palette>
                {COLORS.map(c => (
                  <Swatch key={c} color={c} active={color === c} onClick={() => setColor(c)} />
                ))}
              </Palette>
            </div>
            <div>
              <span style={{ fontSize: 11 }}>Brush:</span>
              <Slider type="range" min="1" max="20" value={brush} onChange={e => setBrush(+e.target.value)} />
              <Btn onClick={clear}>Clear</Btn>
            </div>
          </TopBar>
          <CanvasWrap>
            <Canvas ref={canvasRef} />
          </CanvasWrap>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <Btn>Upload image</Btn>
            <Btn>Set as wallpaper</Btn>
          </div>
        </Body>
      </WinBox>
    </Overlay>
  );
}
