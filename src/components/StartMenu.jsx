import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 8500;
  background: rgba(0,0,0,0.15);
`;

const Menu = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  left: 3px;
  z-index: 8501;
  background: #f0f0f0;
  border: 1px solid #999;
  box-shadow: 4px 4px 15px rgba(0,0,0,0.3);
  display: flex;
  min-width: 400px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  color: #000;
  border-radius: 0 8px 0 0;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 50px;
  background: linear-gradient(180deg, #0058a8 0%, #003c7a 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  flex-shrink: 0;
`;

const SidebarText = styled.span`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: rgba(255,255,255,0.8);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid #ddd;
  background: linear-gradient(180deg, #e8f0fc, #d0e0f8);
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: linear-gradient(135deg, #0078d4, #00b4d8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 13px;
`;

const UserStatus = styled.div`
  font-size: 10px;
  color: #666;
`;

const Column = styled.div`
  flex: ${({ $wide }) => ($wide ? '1' : '0 0 170px')};
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const SectionHeader = styled.div`
  padding: 4px 12px;
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.1s;

  &:hover {
    background: #0078d4;
    color: #fff;
  }
`;

const MenuIcon = styled.span`
  font-size: 18px;
  width: 24px;
  text-align: center;
`;

const Separator = styled.div`
  height: 1px;
  margin: 3px 8px;
  background: #ddd;
`;

const PROGRAMS = [
  { name: 'About xque', icon: '👤', component: 'Resume' },
  { name: 'Contact', icon: '✉️', component: 'Contact' },
  { name: 'Coding Projects', icon: '💻', component: 'Coding' },
  { name: 'Music Player', icon: '🎵', component: 'Music' },
  { name: 'Streaming', icon: '📺', component: 'Streaming' },
  { name: 'Anime List', icon: '🎌', component: 'Anime' },
  { name: 'Terminal', icon: '⬛', component: 'Terminal' },
  { name: 'Minecraft', icon: '⛏️', component: 'Minecraft' },
  { name: 'Chat', icon: '💬', component: 'Chat' },
  { name: 'Internet', icon: '🌐', component: 'Internet' },
  { name: 'Paint', icon: '🎨', component: 'Paint' },
];

const SYSTEM = [
  { name: 'Settings', icon: '⚙️' },
  { name: 'Help', icon: '❓' },
  { name: 'Run...', icon: '▶️' },
];

const SHUTDOWN = [
  { name: 'Shut Down...', icon: '🔴' },
];

export default function StartMenu({ isOpen, onOpenApp, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose?.();
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <Menu
            ref={menuRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Sidebar>
              <SidebarText>windows</SidebarText>
            </Sidebar>

            <Column $wide>
              <UserProfile>
                <Avatar>🪟</Avatar>
                <div>
                  <UserName>xque</UserName>
                  <UserStatus>Fullstack Developer</UserStatus>
                </div>
              </UserProfile>
              <SectionHeader>Programs</SectionHeader>
              {PROGRAMS.map((item) => (
                <MenuItem
                  key={item.component}
                  onClick={() => { onOpenApp?.(item.component); onClose?.(); }}
                  whileHover={{ x: 2 }}
                >
                  <MenuIcon>{item.icon}</MenuIcon>
                  {item.name}
                </MenuItem>
              ))}
            </Column>

            <Column>
              <SectionHeader>System</SectionHeader>
              {SYSTEM.map((item) => (
                <MenuItem key={item.name} whileHover={{ x: 2 }}>
                  <MenuIcon>{item.icon}</MenuIcon>
                  {item.name}
                </MenuItem>
              ))}
              <Separator style={{ marginTop: 'auto' }} />
              <SectionHeader>Power</SectionHeader>
              {SHUTDOWN.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => { onOpenApp?.('ShutDown'); onClose?.(); }}
                  whileHover={{ x: 2 }}
                >
                  <MenuIcon>{item.icon}</MenuIcon>
                  {item.name}
                </MenuItem>
              ))}
            </Column>
          </Menu>
        </>
      )}
    </AnimatePresence>
  );
}
