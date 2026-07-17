import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;
const WinBox = styled.div`
  background: #c0c0c0; border: 2px solid #dfdfdf; border-top-color: #fff;
  border-left-color: #fff; border-right-color: #808080; border-bottom-color: #808080;
  width: 400px; max-width: 95vw; font-family: 'MS Sans Serif', Tahoma, sans-serif;
`;
const TitleBar = styled.div`
  background: linear-gradient(90deg, #2e7d32, #4caf50);
  padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;
`;
const Title = styled.span` color: #fff; font-size: 12px; font-weight: bold; `;
const CloseBtn = styled.button`
  background: #c0c0c0; border: 1px solid #dfdfdf; border-right-color: #808080;
  border-bottom-color: #808080; width: 18px; height: 18px; font-size: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
`;
const Body = styled.div` padding: 20px; text-align: center; background: #d4d0c8; `;
const TitleText = styled.h2` color: #2e7d32; margin: 0 0 6px; font-size: 20px; `;
const Desc = styled.p` color: #555; font-size: 12px; margin: 0 0 16px; line-height: 1.5; `;
const Input = styled.input`
  padding: 6px 10px; border: 2px inset #999; font-family: 'MS Sans Serif', Tahoma, sans-serif;
  font-size: 13px; width: 100%; box-sizing: border-box; margin-bottom: 10px;
`;
const ConnectBtn = styled.button`
  padding: 6px 20px; background: #4caf50; color: #fff; border: 2px solid #2e7d32;
  font-size: 13px; font-weight: bold; cursor: pointer; font-family: 'MS Sans Serif', Tahoma, sans-serif;
  &:active { background: #388e3c; }
`;
const Status = styled.div`
  margin-top: 14px; padding: 10px; background: #111; color: #4caf50;
  font-family: monospace; font-size: 12px; border: 1px inset #666; text-align: left;
  min-height: 40px;
`;
const Dot = styled.span`
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.connected ? '#4caf50' : '#f44336'};
  margin-right: 6px; vertical-align: middle;
`;

export default function MinecraftApp({ onClose }) {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('idle');
  const [log, setLog] = useState('Ready to connect.');

  const handleConnect = () => {
    if (!username.trim()) return;
    setStatus('connecting');
    setLog(`> Username: ${username}\n> Connecting to wss://mc.xque.dev...`);
    setTimeout(() => {
      setStatus('connected');
      setLog(`> Connected!\n> WebSocket: wss://mc.xque.dev\n> Joining world...`);
    }, 1500);
  };

  return (
    <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <WinBox onClick={e => e.stopPropagation()}>
        <TitleBar>
          <Title>⛏️ Minecraft</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </TitleBar>
        <Body>
          <TitleText>⛏️ Minecraft Client</TitleText>
          <Desc>my virtual sandbox - It will automatically put you in my minecraft world after selecting your username.</Desc>
          <Input
            placeholder="Enter username..."
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleConnect(); }}
          />
          <ConnectBtn onClick={handleConnect} disabled={!username.trim()}>Connect</ConnectBtn>
          <Status>
            <Dot connected={status === 'connected'} />
            <span>{log}</span>
          </Status>
        </Body>
      </WinBox>
    </Overlay>
  );
}
