import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const Window = styled.div`
  background: #1a1a2e; border: 2px solid #555; border-radius: 8px; overflow: hidden;
  width: 600px; max-width: 95vw;
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

export default function DinoGame({ onClose }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 560; canvas.height = 200;
    const W = canvas.width, H = canvas.height;
    let animId;

    const game = {
      dino: { x: 60, y: H - 50, w: 30, h: 30, vy: 0, grounded: true },
      obstacles: [], score: 0, speed: 3, over: false, started: false,
      frame: 0, groundY: H - 50,
    };
    gameRef.current = game;

    const jump = () => {
      if (game.over) { restart(); return; }
      if (game.dino.grounded) { game.dino.vy = -10; game.dino.grounded = false; }
    };
    const restart = () => {
      game.obstacles = []; game.score = 0; game.speed = 3;
      game.over = false; game.started = true;
      game.dino.y = game.groundY; game.dino.vy = 0; game.dino.grounded = true;
    };

    const onKey = e => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); } };
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('click', jump);

    const spawnObstacle = () => {
      const h = 20 + Math.random() * 25;
      game.obstacles.push({ x: W, y: game.groundY + 30 - h, w: 15 + Math.random() * 10, h });
    };

    const loop = () => {
      ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#333'; ctx.fillRect(0, H - 20, W, 20);

      if (!game.over) {
        game.frame++;
        if (game.started) {
          game.dino.vy += 0.5;
          game.dino.y += game.dino.vy;
          if (game.dino.y >= game.groundY) { game.dino.y = game.groundY; game.dino.vy = 0; game.dino.grounded = true; }

          if (game.frame % 90 === 0) spawnObstacle();
          game.obstacles.forEach(o => o.x -= game.speed);
          game.obstacles = game.obstacles.filter(o => o.x > -50);

          if (game.frame % 6 === 0) game.score++;
          game.speed = 3 + game.score * 0.002;

          for (const o of game.obstacles) {
            if (game.dino.x + 5 < o.x + o.w && game.dino.x + game.dino.w - 5 > o.x &&
              game.dino.y + 5 < o.y + o.h && game.dino.y + game.dino.h > o.y) {
              game.over = true;
            }
          }
        }

        // draw dino
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(game.dino.x, game.dino.y, game.dino.w, game.dino.h);
        ctx.fillStyle = '#000';
        ctx.fillRect(game.dino.x + 22, game.dino.y + 6, 5, 5);
        // legs animation
        const legOffset = game.dino.grounded ? Math.sin(game.frame * 0.3) * 4 : 3;
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(game.dino.x + 4, game.dino.y + game.dino.h, 8, 4 + legOffset);
        ctx.fillRect(game.dino.x + 18, game.dino.y + game.dino.h, 8, 4 - legOffset);

        game.obstacles.forEach(o => {
          ctx.fillStyle = '#c0392b';
          ctx.beginPath();
          ctx.moveTo(o.x + o.w / 2, o.y);
          ctx.lineTo(o.x, o.y + o.h);
          ctx.lineTo(o.x + o.w, o.y + o.h);
          ctx.fill();
          ctx.fillStyle = '#27ae60';
          ctx.fillRect(o.x + 3, o.y + o.h - 4, o.w - 6, 4);
        });
      }

      ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
      ctx.fillText('Score: ' + game.score, W - 120, 25);

      if (game.over) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 24px monospace'; ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W / 2, H / 2 - 10);
        ctx.font = '14px monospace';
        ctx.fillText('Score: ' + game.score + '  |  Click or Space to restart', W / 2, H / 2 + 20);
        ctx.textAlign = 'left';
      }

      if (!game.started && !game.over) {
        ctx.fillStyle = '#fff'; ctx.font = '16px monospace'; ctx.textAlign = 'center';
        ctx.fillText('Press Space or Click to Start', W / 2, H / 2);
        ctx.textAlign = 'left';
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('keydown', onKey); canvas.removeEventListener('click', jump); };
  }, []);

  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <Window>
        <TitleBar>
          <Title>dino_runner.exe</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Canvas ref={canvasRef} />
      </Window>
    </Overlay>
  );
}
