import { useState } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
  background: #fff;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fff;
`

const LogoText = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
  user-select: none;
`

const ColorLetter = styled.span`
  color: ${({ $color }) => $color};
`

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
`

const SearchBar = styled.div`
  width: 100%;
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #dfdfdf;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  background: transparent;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`

const WinButton = styled.button`
  font-family: inherit;
  font-size: 12px;
  padding: 4px 14px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-shadow: inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080;
  cursor: pointer;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-shadow: inset 1px 1px 0 #808080;
  }
`

const Footer = styled.div`
  display: flex;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
  justify-content: center;
`

const FooterLink = styled.a`
  color: #666;
  font-size: 11px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default function InternetApp({ onClose }) {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
    }
  }

  const handleLucky = () => {
    window.open('https://wiby.me/surprise/', '_blank')
  }

  const logoColors = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335']

  return (
    <AppContainer>
      <Content>
        <LogoText>
          {'xque'.split('').map((ch, i) => (
            <ColorLetter key={i} $color={logoColors[i % logoColors.length]}>
              {ch}
            </ColorLetter>
          ))}
        </LogoText>

        <SearchForm as="form" onSubmit={handleSearch}>
          <SearchBar>
            <SearchInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the web..."
            />
          </SearchBar>
          <ButtonRow>
            <WinButton type="submit">xque Search</WinButton>
            <WinButton type="button" onClick={handleLucky}>
              I'm Feeling Lucky
            </WinButton>
          </ButtonRow>
        </SearchForm>
      </Content>

      <Footer>
        <FooterLink href="#">Advertising Programs</FooterLink>
        <FooterLink href="#">Business Solutions</FooterLink>
        <FooterLink href="#">About xque</FooterLink>
      </Footer>
    </AppContainer>
  )
}
