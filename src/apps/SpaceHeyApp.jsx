import styled from 'styled-components';
import { socialLinks } from '../data/socialLinks';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
`;

const NavBtn = styled.button`
  width: 22px;
  height: 20px;
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #404040;
  border-right: 1px solid #404040;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
`;

const UrlBar = styled.div`
  flex: 1;
  padding: 2px 6px;
  background: #fff;
  border-top: 2px inset #808080;
  border-left: 2px inset #808080;
  border-bottom: 2px inset #fff;
  border-right: 2px inset #fff;
  font-size: 11px;
  color: #000;
`;

const ProfilePage = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #1a1a2e;
  margin: 2px;
  border-top: 2px inset #808080;
  border-left: 2px inset #808080;
  border-bottom: 2px inset #fff;
  border-right: 2px inset #fff;
`;

const ProfileBanner = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #0d0d1a, #1a0040, #0d0d1a);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 16px 12px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background: linear-gradient(135deg, #ff006e, #8338ec);
  border: 3px solid #1a1a2e;
  position: absolute;
  bottom: -30px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

const ProfileBody = styled.div`
  padding: 40px 16px 16px;
`;

const DisplayName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #e0e0e0;
`;

const Handle = styled.div`
  font-size: 11px;
  color: #808080;
  margin-top: 2px;
`;

const Tagline = styled.div`
  font-size: 12px;
  color: #ff006e;
  margin-top: 6px;
  font-style: italic;
`;

const AboutSection = styled.div`
  margin-top: 12px;
  background: #16162a;
  border: 1px solid #2a2a4a;
  padding: 10px;
  border-radius: 2px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #ff006e;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid #2a2a4a;
`;

const BioText = styled.div`
  font-size: 11px;
  color: #c0c0c0;
  line-height: 1.5;
`;

const LinksGrid = styled.div`
  margin-top: 12px;
  background: #16162a;
  border: 1px solid #2a2a4a;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: #2a2a4a;
  border-top: 1px solid #404060;
  border-left: 1px solid #404060;
  border-bottom: 1px solid #101020;
  border-right: 1px solid #101020;
  color: #e0e0e0;
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: #3a3a5a;
    color: #ff006e;
  }
`;

const LinkIcon = styled.span`
  font-size: 12px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff41;
  display: inline-block;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  background: #c0c0c0;
  border-top: 1px solid #808080;
  font-size: 10px;
  color: #000;
`;

function SpaceHeyApp({ onClose }) {
  return (
    <Container>
      <BrowserBar>
        <NavBtn>◀</NavBtn>
        <NavBtn>▶</NavBtn>
        <NavBtn>↻</NavBtn>
        <UrlBar>spacehey.com/xqyet</UrlBar>
      </BrowserBar>
      <ProfilePage>
        <ProfileBanner>
          <Avatar>xq</Avatar>
        </ProfileBanner>
        <ProfileBody>
          <DisplayName>xque / xqyet</DisplayName>
          <Handle>@xqyet &bull; <StatusDot /> Online</Handle>
          <Tagline>Fullstack Developer</Tagline>

          <AboutSection>
            <SectionTitle>About Me</SectionTitle>
            <BioText>
              Fullstack developer who loves building things and breaking things
              (usually in that order). I enjoy anime, retro computing, and
              making cool stuff on the web. When I'm not coding, I'm probably
              watching anime or tweaking my desktop setup. I build tools,
              websites, and whatever else catches my interest. Check out my
              projects and links below.
            </BioText>
          </AboutSection>

          <AboutSection style={{ marginTop: 12 }}>
            <SectionTitle>Interests</SectionTitle>
            <BioText>
              Programming &bull; Web Development &bull; Anime &bull; Retro UI
              &bull; Linux &bull; Open Source &bull; Cyberpunk Aesthetics
            </BioText>
          </AboutSection>

          <SectionTitle style={{ marginTop: 12, color: '#ff006e' }}>Links</SectionTitle>
          <LinksGrid>
            <SocialLink href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <LinkIcon>💻</LinkIcon> GitHub
            </SocialLink>
            <SocialLink href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
              <LinkIcon>💬</LinkIcon> Discord
            </SocialLink>
            <SocialLink href={socialLinks.spacehey} target="_blank" rel="noopener noreferrer">
              <LinkIcon>🌐</LinkIcon> SpaceHey
            </SocialLink>
            <SocialLink href={socialLinks.steam} target="_blank" rel="noopener noreferrer">
              <LinkIcon>🎮</LinkIcon> Steam
            </SocialLink>
            <SocialLink href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
              <LinkIcon>▶️</LinkIcon> YouTube
            </SocialLink>
            <SocialLink href={socialLinks.totalanime} target="_blank" rel="noopener noreferrer">
              <LinkIcon>🎬</LinkIcon> TotalAnime
            </SocialLink>
            <SocialLink href={socialLinks.freeanime} target="_blank" rel="noopener noreferrer">
              <LinkIcon>📺</LinkIcon> FreeAnime
            </SocialLink>
            <SocialLink href={socialLinks.ooBio} target="_blank" rel="noopener noreferrer">
              <LinkIcon>🔗</LinkIcon> oo.bio
            </SocialLink>
            <SocialLink href={socialLinks.terminal} target="_blank" rel="noopener noreferrer">
              <LinkIcon>🖥️</LinkIcon> Terminal
            </SocialLink>
            <SocialLink href={socialLinks.hedgecrates} target="_blank" rel="noopener noreferrer">
              <LinkIcon>📦</LinkIcon> Hedgecrates
            </SocialLink>
          </LinksGrid>
        </ProfileBody>
      </ProfilePage>
      <StatusBar>
        <span>Done</span>
        <span style={{ marginLeft: 'auto' }}>Internet Zone</span>
      </StatusBar>
    </Container>
  );
}

export default SpaceHeyApp;
