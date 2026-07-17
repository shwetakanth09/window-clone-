import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const Window = styled.div`
  background: #1a1a2e; border: 2px solid #555; border-radius: 8px; overflow: hidden;
  width: 400px; max-width: 95vw;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #2d2d44, #1a1a2e);
  padding: 8px 12px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #333;
`;
const Title = styled.span` color: #aaa; font-family: 'MS Sans Serif', Tahoma, sans-serif; font-size: 13px; `;
const CloseBtn = styled.button`
  background: #c0392b; color: white; border: none; width: 22px; height: 22px;
  border-radius: 3px; cursor: pointer; font-size: 12px; font-weight: bold;
`;
const Canvas = styled.canvas` display: block; width: 100%; cursor: pointer; `;

export default function FlappyGame({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 380; canvas.height = 500;
    const W = canvas.width, H = canvas.height;
    let animId;

    const game = {
      bird: { x: 100, y: H / 2, vy: 0, r: 14 },
      pipes: [], score: 0, over: false, started: false, frame: 0,
      gap: 130, pipeW: 50, pipeSpeed: 2.5,
    };

    const flap = () => {
      if (game.over) { restart(); return; }
      game.started = true;
      game.bird.vy = -7;
    };
    const restart = () => {
      game.bird.y = H / 2; game.bird.vy = 0;
      game.pipes = []; game.score = 0; game.over = false; game.started = false; game.frame = 0;
    };

    const onKey = e => { if (e.code === 'Space') { e.preventDefault(); flap(); } };
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('click', flap);

    const spawnPipe = () => {
      const topH = 60 + Math.random() * (H - game.gap - 120);
      game.pipes.push({ x: W, topH });
    };

    const loop = () => {
      ctx.fillStyle = '#0f0f23'; ctx.fillRect(0, 0, W, H);

      if (!game.over) {
        game.frame++;
        if (game.started) {
          game.bird.vy += 0.45;
          game.bird.y += game.bird.vy;

          if (game.frame % 100 === 0) spawnPipe();
          game.pipes.forEach(p => p.x -= game.pipeSpeed);
          game.pipes = game.pipes.filter(p => p.x > -game.pipeW);

          game.pipes.forEach(p => {
            const bx = game.bird.x, by = game.bird.y, br = game.bird.r;
            const inX = bx + br > p.x && bx - br < p.x + game.pipeW;
            const hitTop = by - br < p.topH;
            const hitBot = by + br > p.topH + game.gap;
            if (inX && (hitTop || hitBot)) game.over = true;
          });

          if (game.bird.y > H - game.bird.r || game.bird.y < 0) game.over = true;

          if (!game.over) {
            game.pipes.forEach(p => {
              if (!p.scored && p.x + game.pipeW < game.bird.x) { p.scored = true; game.score++; }
            });
          }
        }

        // draw pipes
        game.pipes.forEach(p => {
          ctx.fillStyle = '#27ae60'; ctx.strokeStyle = '#1e8449'; ctx.lineWidth = 2;
          ctx.fillRect(p.x, 0, game.pipeW, p.topH); ctx.strokeRect(p.x, 0, game.pipeW, p.topH);
          ctx.fillRect(p.x, p.topH + game.gap, game.pipeW, H - p.topH - game.gap);
          ctx.strokeRect(p.x, p.topH + game.gap, game.pipeW, H - p.topH - game.gap);
          // caps
          ctx.fillStyle = '#2ecc71';
          ctx.fillRect(p.x - 4, p.topH - 15, game.pipeW + 8, 15);
          ctx.fillRect(p.x - 4, p.topH + game.gap, game.pipeW + 8, 15);
        });

        // draw bird
        const bx = game.bird.x, by = game.bird.y;
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath(); ctx.arc(bx, by, game.bird.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e67e22';
        ctx.beginPath(); ctx.moveTo(bx + 10, by - 3); ctx.lineTo(bx + 20, by); ctx.lineTo(bx + 10, by + 3); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(bx + 3, by - 4, 3, 0, Math.PI * 2); ctx.fill();
        // wing
        const wingY = by + Math.sin(game.frame * 0.3) * 5;
        ctx.fillStyle = '#e6b800';
        ctx.beginPath(); ctx.ellipse(bx - 6, wingY, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
      }

      ctx.fillStyle = '#fff'; ctx.font = 'bold 20px monospace'; ctx.textAlign = 'center';
      ctx.fillText(game.score, W / 2, 35);

      if (game.over) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 24px monospace';
        ctx.fillText('GAME OVER', W / 2, H / 2 - 10);
        ctx.font = '14px monospace';
        ctx.fillText('Score: ' + game.score + '  |  Click to restart', W / 2, H / 2 + 20);
      }

      if (!game.started && !game.over) {
        ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
        ctx.fillText('Click or Space to Flap', W / 2, H / 2);
      }
      ctx.textAlign = 'left';

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('keydown', onKey); canvas.removeEventListener('click', flap); };
  }, []);

  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <Window>
        <TitleBar>
          <Title>flappy_bird.exe</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Canvas ref={canvasRef} />
      </Window>
    </Overlay>
  );
}
