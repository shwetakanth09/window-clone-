import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
`;

const Header = styled.div`
  padding: 8px 12px;
  background: #000080;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff00;
  display: inline-block;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  background: #fff;
  border: 2px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin: 4px;
  min-height: 200px;
`;

const Message = styled.div`
  margin-bottom: 8px;
  padding: 4px 0;
`;

const MessageAuthor = styled.span`
  font-weight: bold;
  color: ${({ $color }) => $color || '#000080'};
`;

const MessageTime = styled.span`
  color: #808080;
  font-size: 10px;
  margin-left: 6px;
`;

const MessageText = styled.div`
  margin-top: 2px;
  color: #000;
`;

const InputArea = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 4px 6px;
  font-family: inherit;
  font-size: 12px;
  border: 2px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  background: #fff;
  outline: none;
`;

const SendButton = styled.button`
  padding: 4px 16px;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  cursor: pointer;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
  }
`;

const INITIAL_MESSAGES = [
  { id: 1, author: 'xque', text: 'welcome to the chat!', color: '#000080', time: '12:00 PM' },
  { id: 2, author: 'system', text: 'This is a local chat simulation. No data is sent externally.', color: '#808080', time: '12:00 PM' },
  { id: 3, author: 'xque', text: 'feel free to type anything below', color: '#000080', time: '12:01 PM' },
];

const BOT_RESPONSES = [
  'that\'s cool!',
  'nice one :)',
  'lol',
  'interesting...',
  'tell me more!',
  'haha yeah',
  'for real tho',
  'based',
  'true true',
  'same tbh',
];

export default function ChatApp() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      id: Date.now(),
      author: 'you',
      text,
      color: '#cc0000',
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        author: 'xque',
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        color: '#000080',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <Container>
      <Header>
        <StatusDot />
        Chat — xque
      </Header>
      <MessageArea>
        {messages.map((msg) => (
          <Message key={msg.id}>
            <MessageAuthor $color={msg.color}>{msg.author}</MessageAuthor>
            <MessageTime>{msg.time}</MessageTime>
            <MessageText>{msg.text}</MessageText>
          </Message>
        ))}
        <div ref={bottomRef} />
      </MessageArea>
      <InputArea>
        <MessageInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputArea>
    </Container>
  );
}
