import { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const progressPulse = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #0a0a1a 0%, #0d1117 50%, #0a0a2e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const Stars = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent),
    radial-gradient(1px 1px at 200px 60px, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 250px 20px, #fff, transparent),
    radial-gradient(1px 1px at 300px 90px, rgba(255,255,255,0.5), transparent);
  background-size: 350px 100px;
  animation: ${float} 8s ease-in-out infinite;
  opacity: 0.4;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const WindowsLogo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  transform: perspective(200px) rotateY(-5deg);
`;

const LogoPane = styled.div`
  background: ${({ $color }) => $color};
  border-radius: 2px;
  opacity: 0.9;
  box-shadow: 0 0 15px ${({ $color }) => $color}40;
`;

const Title = styled(motion.div)`
  font-family: 'Segoe UI', 'Franklin Gothic Medium', Arial, sans-serif;
  font-size: 32px;
  font-weight: 200;
  color: #fff;
  letter-spacing: 8px;
  text-transform: lowercase;
  background: linear-gradient(90deg, #fff, #a8d8ff, #fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s linear infinite;
`;

const Subtitle = styled(motion.div)`
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 6px;
  margin-top: 8px;
  text-transform: uppercase;
`;

const SegmentBar = styled(motion.div)`
  display: flex;
  gap: 3px;
  margin-bottom: 50px;
`;

const Segment = styled(motion.div)`
  width: 18px;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 1px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
`;

const SegmentFill = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #0099ff);
  border-radius: 1px;
  box-shadow: 0 0 8px #00d4ff80;
`;

const Copyright = styled(motion.div)`
  position: absolute;
  bottom: 35px;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
`;

const LoadingText = styled(motion.div)`
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 3px;
  margin-bottom: 20px;
`;

export default function BootScreen({ onComplete }) {
  const [segments, setSegments] = useState(0);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (segments >= 16) {
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => setSegments((s) => s + 1), 150 + Math.random() * 100);
    return () => clearTimeout(timer);
  }, [segments, finish]);

  useEffect(() => {
    const t = setTimeout(finish, 3500);
    return () => clearTimeout(t);
  }, [finish]);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      onClick={finish}
    >
      <Stars />
      <LogoContainer>
        <WindowsLogo>
          <LogoPane $color="#f25022" />
          <LogoPane $color="#7fba00" />
          <LogoPane $color="#00a4ef" />
          <LogoPane $color="#ffb900" />
        </WindowsLogo>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          windows
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          xp professional
        </Subtitle>
      </LogoContainer>

      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        loading...
      </LoadingText>

      <SegmentBar>
        {Array.from({ length: 16 }).map((_, i) => (
          <Segment key={i}>
            {i < segments && (
              <SegmentFill
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Segment>
        ))}
      </SegmentBar>

      <Copyright
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Copyright © Microsoft Corporation
      </Copyright>
    </Container>
  );
}
