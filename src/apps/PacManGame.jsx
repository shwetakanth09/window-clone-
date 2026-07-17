import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const Window = styled.div`
  background: #1a1a2e; border: 2px solid #555; border-radius: 8px; overflow: hidden;
  width: 420px; max-width: 95vw;
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

export default function PacManGame({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const COLS = 21, ROWS = 19, TILE = 20;
    canvas.width = COLS * TILE; canvas.height = ROWS * TILE + 30;
    const W = canvas.width, H = canvas.height;

    const maze = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
      [1,1,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,1],
      [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0],
      [1,1,1,1,0,1,0,1,1,2,2,2,1,1,0,1,0,1,1,1,1],
      [0,0,0,0,0,0,0,1,2,2,2,2,2,1,0,0,0,0,0,0,0],
      [1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
      [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0],
      [1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
      [1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1],
      [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

    const game = {
      pac: { x: 10, y: 9, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, mouth: 0, mouthDir: 1 },
      ghost: { x: 10, y: 0, dir: { x: 1, y: 0 }, color: '#e74c3c' },
      dots: 0, score: 0, over: false, won: false, started: false, frame: 0,
    };

    let totalDots = 0;
    const dotMap = maze.map((row, r) => row.map((v, c) => {
      if (v === 0) { totalDots++; return 1; }
      return 0;
    }));
    game.dots = totalDots;

    const canMove = (x, y) => x >= 0 && x < COLS && y >= 0 && y < ROWS && maze[y][x] !== 1;

    const onKey = e => {
      if (game.over || game.won) return;
      game.started = true;
      if (e.key === 'ArrowUp') game.pac.nextDir = { x: 0, y: -1 };
      else if (e.key === 'ArrowDown') game.pac.nextDir = { x: 0, y: 1 };
      else if (e.key === 'ArrowLeft') game.pac.nextDir = { x: -1, y: 0 };
      else if (e.key === 'ArrowRight') game.pac.nextDir = { x: 1, y: 0 };
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    const restart = () => {
      game.pac.x = 10; game.pac.y = 9; game.pac.dir = { x: 0, y: 0 }; game.pac.nextDir = { x: 0, y: 0 };
      game.ghost.x = 10; game.ghost.y = 0; game.ghost.dir = { x: 1, y: 0 };
      game.score = 0; game.over = false; game.won = false; game.started = false; game.frame = 0;
      totalDots = 0;
      maze.forEach((row, r) => row.forEach((v, c) => { if (v === 0) { totalDots++; dotMap[r][c] = 1; } else dotMap[r][c] = 0; }));
      game.dots = totalDots;
    };
    canvas.addEventListener('click', () => { if (game.over || game.won) restart(); });

    const loop = () => {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      game.frame++;

      if (game.started && !game.over && !game.won) {
        // move pac
        if (canMove(game.pac.x + game.pac.nextDir.x, game.pac.y + game.pac.nextDir.y)) {
          game.pac.dir = game.pac.nextDir;
        }
        if (game.frame % 6 === 0) {
          const nx = game.pac.x + game.pac.dir.x, ny = game.pac.y + game.pac.dir.y;
          if (canMove(nx, ny)) { game.pac.x = nx; game.pac.y = ny; }
        }

        // eat dots
        if (dotMap[game.pac.y][game.pac.x]) {
          dotMap[game.pac.y][game.pac.x] = 0;
          game.score += 10; game.dots--;
        }

        // ghost AI
        if (game.frame % 8 === 0) {
          const dirs = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
          const opposite = { x: -game.ghost.dir.x, y: -game.ghost.dir.y };
          const valid = dirs.filter(d => !(d.x === opposite.x && d.y === opposite.y) && canMove(game.ghost.x + d.x, game.ghost.y + d.y));
          if (valid.length) {
            valid.sort((a, b) => {
              const da = Math.abs(game.pac.x - (game.ghost.x + a.x)) + Math.abs(game.pac.y - (game.ghost.y + a.y));
              const db = Math.abs(game.pac.x - (game.ghost.x + b.x)) + Math.abs(game.pac.y - (game.ghost.y + b.y));
              return da - db;
            });
            game.ghost.dir = valid[Math.floor(Math.random() * Math.min(2, valid.length))];
          }
          game.ghost.x += game.ghost.dir.x;
          game.ghost.y += game.ghost.dir.y;
        }

        if (game.pac.x === game.ghost.x && game.pac.y === game.ghost.y) game.over = true;
        if (game.dots <= 0) game.won = true;
      }

      // draw maze
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (maze[r][c] === 1) {
            ctx.fillStyle = '#1a1a6e';
            ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
          } else if (dotMap[r][c]) {
            ctx.fillStyle = '#ffcc00';
            ctx.beginPath(); ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, 3, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      // pac-man
      const px = game.pac.x * TILE + TILE / 2, py = game.pac.y * TILE + TILE / 2;
      game.pac.mouth += 0.15 * game.pac.mouthDir;
      if (game.pac.mouth > 0.4 || game.pac.mouth < 0) game.pac.mouthDir *= -1;
      const angle = Math.atan2(game.pac.dir.y, game.pac.dir.x);
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.arc(px, py, TILE / 2 - 2, angle + game.pac.mouth, angle + Math.PI * 2 - game.pac.mouth);
      ctx.lineTo(px, py); ctx.fill();

      // ghost
      const gx = game.ghost.x * TILE + TILE / 2, gy = game.ghost.y * TILE + TILE / 2;
      ctx.fillStyle = game.ghost.color;
      ctx.beginPath(); ctx.arc(gx, gy, TILE / 2 - 2, Math.PI, 0);
      ctx.lineTo(gx + TILE / 2 - 2, gy + TILE / 2 - 2);
      for (let i = 0; i < 3; i++) {
        const wx = gx - TILE / 2 + 2 + i * (TILE - 4) / 3;
        ctx.quadraticCurveTo(wx + (TILE - 4) / 6, gy + TILE / 2 - 6, wx + (TILE - 4) / 3, gy + TILE / 2 - 2);
      }
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(gx - 4, gy - 3, 3, 0, Math.PI * 2); ctx.arc(gx + 4, gy - 3, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#00f';
      ctx.beginPath(); ctx.arc(gx - 4, gy - 2, 1.5, 0, Math.PI * 2); ctx.arc(gx + 4, gy - 2, 1.5, 0, Math.PI * 2); ctx.fill();

      // HUD
      ctx.fillStyle = '#fff'; ctx.font = '14px monospace'; ctx.textAlign = 'left';
      ctx.fillText('Score: ' + game.score, 5, ROWS * TILE + 18);

      if (game.over) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, W, ROWS * TILE);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W / 2, ROWS * TILE / 2 - 5);
        ctx.font = '13px monospace'; ctx.fillText('Click to restart', W / 2, ROWS * TILE / 2 + 18); ctx.textAlign = 'left';
      }
      if (game.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, W, ROWS * TILE);
        ctx.fillStyle = '#ffcc00'; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', W / 2, ROWS * TILE / 2 - 5);
        ctx.font = '13px monospace'; ctx.fillText('Click to restart', W / 2, ROWS * TILE / 2 + 18); ctx.textAlign = 'left';
      }

      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <Window>
        <TitleBar>
          <Title>pac_man.exe</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Canvas ref={canvasRef} />
      </Window>
    </Overlay>
  );
}
