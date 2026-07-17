import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --win-blue: #0078d4;
    --win-blue-dark: #005a9e;
    --win-bg: #ece9d8;
    --win-text: #000;
    --win-text-light: #666;
    --win-border: #888;
    --win-surface: #f0f0f0;
    --win-highlight: #0078d4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    color: #000;
    font-family: 'Segoe UI', 'Trebuchet MS', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  /* WinXP/Vista-style scrollbar */
  ::-webkit-scrollbar {
    width: 17px;
    height: 17px;
  }

  ::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-left: 1px solid #ccc;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #e8e8e8, #d0d0d0);
    border: 1px solid #999;
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #d8e8f8, #c0d8f0);
    border-color: #0078d4;
  }

  ::-webkit-scrollbar-button {
    display: block;
    width: 17px;
    height: 17px;
    background: linear-gradient(180deg, #f0f0f0, #e0e0e0);
    border: 1px solid #999;
  }

  ::-webkit-scrollbar-corner {
    background: #f0f0f0;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pop {
    0% { transform: scale(0.85); opacity: 0; }
    70% { transform: scale(1.02); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(0,120,212,0.3); }
    50% { box-shadow: 0 0 15px rgba(0,120,212,0.6); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* Selection styling */
  ::selection {
    background: #0078d4;
    color: #fff;
  }

  /* Smooth transitions for interactive elements */
  a, button, input {
    transition: all 0.15s ease;
  }

  /* Focus styles */
  input:focus, textarea:focus {
    outline: 2px solid #0078d4;
    outline-offset: -1px;
  }
`

export default GlobalStyles
