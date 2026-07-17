import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(180deg, #e8e8e8 0%, #d4d0c8 3%, #c0c0c0 6%, #b8b8b8 100%);
  border-top: 1px solid #fff;
  display: flex;
  align-items: center;
  z-index: 8000;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  box-shadow: 0 -1px 3px rgba(0,0,0,0.15);
`;

const StartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 12px 0 8px;
  margin-left: 3px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(180deg, #3c8e34 0%, #2d7a28 50%, #1e6b1a 100%);
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  letter-spacing: 0.5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3);
  transition: all 0.1s ease;

  &:hover {
    background: linear-gradient(180deg, #4a9e42 0%, #388a32 50%, #287b24 100%);
  }

  &:active {
    background: linear-gradient(180deg, #1e6b1a 0%, #2d7a28 50%, #3c8e34 100%);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.3);
    padding: 1px 11px 0 7px;
  }
`;

const StartIcon = styled.span`
  font-size: 16px;
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  margin: 0 5px;
  background: #999;
  box-shadow: 1px 0 0 #fff;
`;

const WindowButtonsArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
  overflow: hidden;
  height: 100%;
  align-items: center;
`;

const WindowBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  max-width: 170px;
  min-width: 50px;
  padding: 0 10px;
  font-family: inherit;
  font-size: 11px;
  background: linear-gradient(180deg, #f4f4f4 0%, #e8e8e8 50%, #d8d8d8 100%);
  border: 1px solid #999;
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  color: #000;
  box-shadow: inset 0 1px 0 #fff;

  ${({ $focused }) => $focused && `
    background: linear-gradient(180deg, #d8e8f8 0%, #c0d4f0 50%, #a8c0e0 100%);
    border-color: #0078d4;
    font-weight: 600;
    box-shadow: 0 0 0 1px #0078d430, inset 0 1px 0 rgba(255,255,255,0.5);
  `}

  &:hover {
    background: linear-gradient(180deg, #e0f0ff 0%, #c8e0ff 50%, #b0d0ff 100%);
  }

  &:active {
    background: linear-gradient(180deg, #c0d0e0 0%, #a8c0d8 50%, #90b0d0 100%);
  }
`;

const Tray = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  margin-right: 3px;
  border: 1px solid #999;
  border-radius: 2px;
  font-size: 11px;
  gap: 8px;
  background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%);
  box-shadow: inset 0 1px 0 #fff;
`;

const TrayIcon = styled.span`
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover { opacity: 1; }
`;

const Clock = styled.span`
  font-size: 11px;
  min-width: 55px;
  text-align: center;
  color: #000;
`;

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Taskbar({
  openWindows = [],
  focusedWindow,
  onStartClick,
  onWindowClick,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <Bar>
      <StartButton onClick={onStartClick}>
        <StartIcon>🪟</StartIcon>
        start
      </StartButton>
      <Divider />
      <WindowButtonsArea>
        {openWindows.map((win) => (
          <WindowBtn
            key={win.id}
            $focused={focusedWindow === win.id}
            onClick={() => onWindowClick?.(win.id)}
          >
            <span>{win.icon}</span>
            {win.title}
          </WindowBtn>
        ))}
      </WindowButtonsArea>
      <Divider />
      <Tray>
        <TrayIcon title="Volume">🔊</TrayIcon>
        <TrayIcon title="Network">🌐</TrayIcon>
        <Clock title={time.toLocaleDateString()}>{formatTime(time)}</Clock>
      </Tray>
    </Bar>
  );
}
