import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

const Message = styled(motion.div)`
  font-family: 'Segoe UI', sans-serif;
  font-size: 16px;
  color: rgba(255,255,255,0.8);
  letter-spacing: 2px;
  margin-bottom: 30px;
`;

const Spinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #0078d4;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Goodbye = styled(motion.div)`
  position: absolute;
  bottom: 60px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
`;

export default function ShutDownScreen({ onComplete }) {
  const [phase, setPhase] = useState('saving');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('off'), 2000);
    const t2 = setTimeout(() => onComplete?.(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        {phase === 'saving' ? (
          <>
            <Message
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Windows is shutting down...
            </Message>
            <Spinner />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
            }}
          />
        )}
        <Goodbye
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          It is now safe to turn off your computer.
        </Goodbye>
      </Container>
    </motion.div>
  );
}
