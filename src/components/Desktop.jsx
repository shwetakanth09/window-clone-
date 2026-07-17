import { useState, useCallback, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { desktopIcons } from '../data/desktopIcons';

const Container = styled(motion.div)`
  position: absolute;
  inset: 0;
  bottom: 40px;
  background: linear-gradient(180deg, #004040 0%, #006060 30%, #005858 70%, #003838 100%);
  overflow: hidden;
`;

const DesktopPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0,255,200,0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0,150,255,0.03) 0%, transparent 50%);
  pointer-events: none;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 88px);
  grid-auto-rows: 90px;
  gap: 6px;
  padding: 16px;
  align-content: start;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 4px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid transparent;
  background: ${({ $selected }) =>
    $selected ? 'rgba(0, 80, 160, 0.4)' : 'transparent'};
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  &:active {
    background: rgba(0, 80, 160, 0.5);
    transform: translateY(0);
  }
`;

const IconEmoji = styled(motion.span)`
  font-size: 34px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
`;

const IconLabel = styled.span`
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 11px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0,0,0,0.5);
  word-break: break-word;
  line-height: 1.2;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContextMenu = styled(motion.div)`
  position: fixed;
  background: #f0f0f0;
  border: 1px solid #999;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.3), inset 0 0 0 1px #fff;
  padding: 2px;
  min-width: 180px;
  z-index: 9000;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  color: #000;
`;

const ContextItem = styled.div`
  padding: 5px 28px 5px 12px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 2px;

  &:hover {
    background: #0078d4;
    color: #fff;
  }
`;

const Separator = styled.div`
  height: 1px;
  margin: 3px 4px;
  background: #ccc;
`;

export default function Desktop({ onOpenApp, activeWindows = [] }) {
  const [selected, setSelected] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const containerRef = useRef(null);

  const handleSingleClick = useCallback((id) => {
    setSelected(id);
    setContextMenu(null);
  }, []);

  const handleDoubleClick = useCallback(
    (component) => onOpenApp?.(component),
    [onOpenApp]
  );

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const dismiss = () => { setContextMenu(null); setSelected(null); };
    window.addEventListener('click', dismiss);
    return () => window.removeEventListener('click', dismiss);
  }, []);

  return (
    <Container ref={containerRef} onContextMenu={handleContextMenu}>
      <DesktopPattern />
      <IconGrid>
        {desktopIcons.map((icon, i) => (
          <IconWrapper
            key={icon.id}
            $selected={selected === icon.id}
            onClick={(e) => { e.stopPropagation(); handleSingleClick(icon.id); }}
            onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(icon.component); }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.015, duration: 0.3 }}
          >
            <IconEmoji
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon.icon}
            </IconEmoji>
            <IconLabel>{icon.label}</IconLabel>
          </IconWrapper>
        ))}
      </IconGrid>

      {contextMenu && (
        <ContextMenu
          style={{ left: contextMenu.x, top: contextMenu.y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <ContextItem onClick={() => window.location.reload()}>
            🔄 Refresh
          </ContextItem>
          <Separator />
          <ContextItem onClick={() => onOpenApp?.('Wallpaper')}>
            🖼️ Change Wallpaper
          </ContextItem>
          <ContextItem onClick={() => onOpenApp?.('Images')}>
            📷 View Images
          </ContextItem>
          <Separator />
          <ContextItem onClick={() => onOpenApp?.('Terminal')}>
            ⬛ Open Terminal
          </ContextItem>
          <Separator />
          <ContextItem onClick={() => onOpenApp?.('Resume')}>
            ℹ️ About xque
          </ContextItem>
        </ContextMenu>
      )}
    </Container>
  );
}
