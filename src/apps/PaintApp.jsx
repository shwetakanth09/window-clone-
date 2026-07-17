import { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
  background: #c0c0c0;
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
  flex-wrap: wrap;
`

const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const ToolLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  margin-right: 4px;
`

const WinButton = styled.button`
  font-family: inherit;
  font-size: 11px;
  padding: 3px 10px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-shadow: inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080;
  cursor: pointer;
  ${({ $active }) =>
    $active &&
    `
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-shadow: inset 1px 1px 0 #808080;
  `}

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-shadow: inset 1px 1px 0 #808080;
  }
`

const ColorInput = styled.input`
  width: 24px;
  height: 24px;
  border: 1px solid #808080;
  padding: 0;
  cursor: pointer;
  background: none;
`

const SliderInput = styled.input`
  width: 80px;
  cursor: pointer;
`

const CanvasWrapper = styled.div`
  flex: 1;
  overflow: auto;
  background: #808080;
  margin: 2px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  box-shadow: inset 1px 1px 0 #404040;
`

const Canvas = styled.canvas`
  display: block;
  cursor: crosshair;
  background: #fff;
`

export default function PaintApp({ onClose }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)
  const [tool, setTool] = useState('pen')
  const lastPos = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const draw = useCallback(
    (from, to) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color
      ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    },
    [color, brushSize, tool],
  )

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const pos = getPos(e)
    lastPos.current = pos

    if (tool === 'pen' || tool === 'eraser') {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, (tool === 'eraser' ? brushSize * 3 : brushSize) / 2, 0, Math.PI * 2)
      ctx.fillStyle = tool === 'eraser' ? '#ffffff' : color
      ctx.fill()
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const pos = getPos(e)
    if (lastPos.current) {
      draw(lastPos.current, pos)
    }
    lastPos.current = pos
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    lastPos.current = null
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const handleExport = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'painting.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <AppContainer>
      <Toolbar>
        <ToolGroup>
          <ToolLabel>Tools:</ToolLabel>
          <WinButton $active={tool === 'pen'} onClick={() => setTool('pen')}>
            Pen
          </WinButton>
          <WinButton $active={tool === 'eraser'} onClick={() => setTool('eraser')}>
            Eraser
          </WinButton>
        </ToolGroup>

        <ToolGroup>
          <ToolLabel>Color:</ToolLabel>
          <ColorInput
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </ToolGroup>

        <ToolGroup>
          <ToolLabel>Size:</ToolLabel>
          <SliderInput
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span style={{ fontSize: 11 }}>{brushSize}px</span>
        </ToolGroup>

        <ToolGroup>
          <WinButton onClick={handleClear}>Clear</WinButton>
          <WinButton onClick={handleExport}>Export PNG</WinButton>
        </ToolGroup>
      </Toolbar>

      <CanvasWrapper>
        <Canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </CanvasWrapper>
    </AppContainer>
  )
}
