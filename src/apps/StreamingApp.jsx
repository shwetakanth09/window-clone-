import styled from 'styled-components';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 8px;
  gap: 8px;
`;

const Header = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: #fff;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: bold;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
`;

const Description = styled.div`
  background: #fff;
  border: 2px inset #808080;
  padding: 10px 12px;
  font-size: 12px;
  color: #000;
  line-height: 1.5;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-top: 4px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const LinkCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  text-decoration: none;
  color: #000;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  min-width: 140px;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
  }

  &:hover {
    background: #d4d0c8;
  }
`;

const CardIcon = styled.span`
  font-size: 28px;
`;

const CardTitle = styled.span`
  font-size: 13px;
`;

const CardDesc = styled.span`
  font-size: 10px;
  color: #555;
  font-weight: normal;
`;

const YouTubeSection = styled.div`
  border: 2px inset #808080;
  background: #fff;
  padding: 8px;
`;

const YTHeader = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
`;

const YTLink = styled.a`
  display: inline-block;
  padding: 6px 14px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #404040;
  border-right: 2px solid #404040;
  text-decoration: none;
  color: #000080;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
  }
`;

const InfoBar = styled.div`
  font-size: 10px;
  color: #555;
  border-top: 1px solid #808080;
  padding-top: 6px;
  margin-top: auto;
`;

function StreamingApp() {
  return (
    <Container>
      <Header>Streaming Services</Header>
      <Description>
        This is an API aggregate streaming service. It offers zero ads, zero popups,
        and handles lots of concurrent users.
      </Description>

      <SectionLabel>Streaming Sites</SectionLabel>
      <CardGrid>
        <LinkCard href="https://totalanime.me/" target="_blank" rel="noopener noreferrer">
          <CardIcon>🎬</CardIcon>
          <CardTitle>TotalAnime</CardTitle>
          <CardDesc>Open in new tab</CardDesc>
        </LinkCard>
        <LinkCard href="https://freeanime.me/" target="_blank" rel="noopener noreferrer">
          <CardIcon>📺</CardIcon>
          <CardTitle>FreeAnime</CardTitle>
          <CardDesc>Open in new tab</CardDesc>
        </LinkCard>
      </CardGrid>

      <SectionLabel>YouTube Playlist</SectionLabel>
      <YouTubeSection>
        <YTHeader>Favorite Tracks Playlist</YTHeader>
        <YTLink
          href="https://www.youtube.com/playlist?list=PLLgmgkxiK6hM47PEwFHDT6R81-oBiqWkm"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ Open YouTube Playlist
        </YTLink>
      </YouTubeSection>

      <InfoBar>
        TotalAnime &bull; FreeAnime &bull; Powered by xque streaming aggregate
      </InfoBar>
    </Container>
  );
}

export default StreamingApp;
