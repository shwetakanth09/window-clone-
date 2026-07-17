import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
  background: #c0c0c0;
`

const TerminalArea = styled.div`
  flex: 1;
  background: #0c0c0c;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  margin: 2px;
  padding: 8px;
  overflow-y: auto;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
`

const Line = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
`

const InputLine = styled.div`
  display: flex;
  white-space: pre;
`

const Prompt = styled.span`
  color: #00ff00;
  flex-shrink: 0;
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #00ff00;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 1px;
`

const PromptText = 'xque@terminal:~$ '

export default function TerminalApp({ onClose }) {
  const [lines, setLines] = useState([
    'Welcome to xque terminal emulator.',
    'Type "help" for available commands.',
    '',
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const termRef = useRef(null)

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight
    }
  }, [lines])

  const processCommand = (cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return []

    const parts = trimmed.split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    switch (command) {
      case 'help':
        return [
          'Available commands:',
          '  help     - Show this help message',
          '  about    - About xque',
          '  clear    - Clear the terminal',
          '  date     - Show current date and time',
          '  echo     - Echo text',
          '  ls       - List files',
          '  whoami   - Show current user',
          '  uname    - Show system info',
        ]
      case 'about':
        return [
          'xque / xqyet',
          'Fullstack Developer',
          'This is a fake terminal emulator running in the browser.',
        ]
      case 'clear':
        return '__CLEAR__'
      case 'date':
        return [new Date().toString()]
      case 'echo':
        return [args || '']
      case 'ls':
        return [
          'Desktop/',
          'Documents/',
          'Downloads/',
          'projects/',
          'resume.txt',
          'notes.md',
        ]
      case 'whoami':
        return ['xque']
      case 'uname':
        return ['xqueOS 1.0.0 (Browser) x86_64 JavaScript']
      default:
        return [`bash: ${command}: command not found`]
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newLines = [...lines, PromptText + input]
    const result = processCommand(input)

    if (result === '__CLEAR__') {
      setLines([])
    } else {
      setLines([...newLines, ...result, ''])
    }

    if (input.trim()) {
      setHistory((prev) => [...prev, input])
    }
    setInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const newIndex = historyIndex + 1
      if (newIndex < history.length) {
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    }
  }

  return (
    <AppContainer onClick={() => inputRef.current?.focus()}>
      <TerminalArea ref={termRef}>
        {lines.map((line, i) => (
          <Line key={i}>{line}</Line>
        ))}
        <form onSubmit={handleSubmit}>
          <InputLine>
            <Prompt>{PromptText}</Prompt>
            <span>{input}</span>
            <Cursor />
            <HiddenInput
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
            />
          </InputLine>
        </form>
      </TerminalArea>
    </AppContainer>
  )
}
