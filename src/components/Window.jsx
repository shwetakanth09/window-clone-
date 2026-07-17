import { Rnd } from 'react-rnd';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1); }
`;

const WindowFrame = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ece9d8;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.2);
  animation: ${popIn} 0.2s ease-out;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 6px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, #0058e6 0%, #3a8cff 8%, #2b7fff 40%, #1260e0 88%, #0040b0 100%)'
      : 'linear-gradient(180deg, #b4b4b4 0%, #c8c8c8 8%, #c0c0c0 40%, #a8a8a8 88%, #909090 100%)'};
  color: #fff;
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
  border-radius: 7px 7px 0 0;

  &:active { cursor: grabbing; }
`;

const TitleIcon = styled.span`
  font-size: 15px;
  margin-right: 5px;
  line-height: 1;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));
`;

const TitleText = styled.span`
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 6px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const Controls = styled.div`
  display: flex;
  gap: 2px;
`;

const CtrlBtn = styled.button`
  width: 22px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif';
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  background: linear-gradient(180deg, #f8f8f8 0%, #e0e0e0 50%, #c8c8c8 100%);
  border: 1px solid #888;
  border-radius: 3px;
  cursor: pointer;
  padding: 0;
  color: #333;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8);
  transition: all 0.1s;

  &:hover {
    background: linear-gradient(180deg, #fff 0%, #e8e8e8 50%, #d0d0d0 100%);
    border-color: #0078d4;
  }

  &:active {
    background: linear-gradient(180deg, #c0c0c0 0%, #d0d0d0 50%, #e0e0e0 100%);
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
`;

const CloseBtn = styled(CtrlBtn)`
  &:hover {
    background: linear-gradient(180deg, #ff6b6b 0%, #e04040 50%, #c03030 100%);
    border-color: #c03030;
    color: #fff;
  }
`;

const WindowBody = styled.div`
  flex: 1;
  overflow: auto;
  background: #fff;
  border: 1px solid #888;
  border-top: none;
  margin: 0 2px 2px 2px;
  border-radius: 0 0 2px 2px;
`;

export default function Window({
  title = 'Window',
  icon,
  children,
  isActive = false,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  initialPosition = { x: 120, y: 80, width: 640, height: 420 },
  windowId,
}) {
  return (
    <Rnd
      size={{ width: initialPosition.width, height: initialPosition.height }}
      position={{ x: initialPosition.x, y: initialPosition.y }}
      onDragStart={() => onFocus?.(windowId)}
      onDragStop={() => onFocus?.(windowId)}
      onResizeStart={() => onFocus?.(windowId)}
      onResizeStop={() => onFocus?.(windowId)}
      minWidth={220}
      minHeight={160}
      dragHandleClassName="win-titlebar"
      bounds="parent"
    >
      <WindowFrame
        onClick={() => onFocus?.(windowId)}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.18 }}
      >
        <TitleBar className="win-titlebar" $active={isActive}>
          {icon && <TitleIcon>{icon}</TitleIcon>}
          <TitleText>{title}</TitleText>
          <Controls>
            <CtrlBtn onClick={(e) => { e.stopPropagation(); onMinimize?.(); }} title="Minimize">
              ─
            </CtrlBtn>
            <CtrlBtn onClick={(e) => { e.stopPropagation(); onMaximize?.(); }} title="Maximize">
              □
            </CtrlBtn>
            <CloseBtn onClick={(e) => { e.stopPropagation(); onClose?.(); }} title="Close">
              ✕
            </CloseBtn>
          </Controls>
        </TitleBar>
        <WindowBody>{children}</WindowBody>
      </WindowFrame>
    </Rnd>
  );
}
