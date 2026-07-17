import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  color: #333;
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #0078d4 0%, #00b4d8 100%);
  color: #fff;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border: 2px solid rgba(255,255,255,0.4);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 2px 0;
`;

const Title = styled.div`
  font-size: 13px;
  opacity: 0.85;
  font-weight: 300;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  background: #f8f8f8;
  flex-shrink: 0;
`;

const Tab = styled.button`
  padding: 8px 18px;
  font-family: inherit;
  font-size: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#0078d4' : '#666')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#0078d4' : 'transparent')};
  margin-bottom: -2px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  transition: all 0.15s;

  &:hover {
    color: #0078d4;
    background: #f0f6ff;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const BioQuote = styled.blockquote`
  margin: 0;
  padding: 12px 16px;
  background: linear-gradient(135deg, #f0f6ff, #e8f4fd);
  border-left: 3px solid #0078d4;
  border-radius: 0 6px 6px 0;
  font-style: italic;
  color: #444;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0078d4;
  margin: 0 0 10px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #e8e8e8;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SkillTag = styled.span`
  padding: 4px 10px;
  background: ${({ $color }) => $color || '#f0f0f0'};
  color: ${({ $textColor }) => $textColor || '#333'};
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MinecraftSection = styled.div`
  background: linear-gradient(135deg, #8bc34a20, #4caf5020);
  border: 1px solid #8bc34a40;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 16px;
`;

const Link = styled.a`
  color: #0078d4;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const SKILLS = [
  { name: 'JavaScript', color: '#f0db4f20', textColor: '#8a7a00' },
  { name: 'React', color: '#61dafb20', textColor: '#0078d4' },
  { name: 'Node.js', color: '#68a06320', textColor: '#3c873a' },
  { name: 'Python', color: '#3776ab20', textColor: '#3776ab' },
  { name: 'Rust', color: '#dea58420', textColor: '#b7410e' },
  { name: 'C#', color: '#9b4f9620', textColor: '#9b4f96' },
  { name: 'C++', color: '#659ad220', textColor: '#659ad2' },
  { name: 'Web Dev', color: '#e44d2620', textColor: '#e44d26' },
  { name: 'Blockchain', color: '#f7931a20', textColor: '#f7931a' },
  { name: 'Discord Bots', color: '#5865f220', textColor: '#5865f2' },
  { name: 'Rust CLI', color: '#dea58420', textColor: '#b7410e' },
  { name: 'WPF', color: '#512bd420', textColor: '#512bd4' },
];

export default function ResumeApp() {
  const [tab, setTab] = useState('about');

  return (
    <Container>
      <Header>
        <Avatar>🪟</Avatar>
        <HeaderInfo>
          <Name>xque / xqyet</Name>
          <Title>Fullstack Developer</Title>
        </HeaderInfo>
      </Header>

      <Tabs>
        <Tab $active={tab === 'about'} onClick={() => setTab('about')}>About</Tab>
        <Tab $active={tab === 'skills'} onClick={() => setTab('skills')}>Skills</Tab>
        <Tab $active={tab === 'story'} onClick={() => setTab('story')}>Story</Tab>
      </Tabs>

      <Content>
        {tab === 'about' && (
          <>
            <Section>
              <SectionTitle>who is xque?</SectionTitle>
              <p style={{ lineHeight: 1.6, color: '#555' }}>
                hi, I'm xque. this is my personal website — a creative sandbox where I
                showcase projects, share interests, and build cool things on the web.
              </p>
            </Section>

            <BioQuote>
              suffering is not your curse — it is your forge. the coward flees from
              the storm. the wise man walks into it — knowing that only through chaos
              is greatness born.
            </BioQuote>

            <MinecraftSection>
              <SectionTitle style={{ margin: '0 0 8px 0', border: 'none', padding: 0 }}>
                🎮 my virtual sandbox
              </SectionTitle>
              <p style={{ margin: 0, lineHeight: 1.5, color: '#555', fontSize: 12 }}>
                that these minecraft worlds... There was once a time that had not
                felt so distant, back when we were kids. now they live on as digital
                memories — worlds we built, block by block, together.
              </p>
            </MinecraftSection>

            <Section>
              <SectionTitle>Connect</SectionTitle>
              <p>
                <Link href="https://github.com/xqyet" target="_blank" rel="noreferrer">GitHub</Link>
                {' · '}
                <Link href="https://spacehey.com/xqyet" target="_blank" rel="noreferrer">SpaceHey</Link>
                {' · '}
                <Link href="https://steamcommunity.com/id/xqyet/" target="_blank" rel="noreferrer">Steam</Link>
              </p>
            </Section>
          </>
        )}

        {tab === 'skills' && (
          <Section>
            <SectionTitle>Technologies & Skills</SectionTitle>
            <SkillGrid>
              {SKILLS.map((s) => (
                <SkillTag key={s.name} $color={s.color} $textColor={s.textColor}>
                  {s.name}
                </SkillTag>
              ))}
            </SkillGrid>
          </Section>
        )}

        {tab === 'story' && (
          <>
            <Section>
              <SectionTitle>The Beginning</SectionTitle>
              <p style={{ lineHeight: 1.7, color: '#555' }}>
                it started with a single line of code — a hello world that opened
                up an entire universe of possibilities. from building discord bots
                to crafting blockchain tools, every project taught something new.
              </p>
            </Section>
            <Section>
              <SectionTitle>The Journey</SectionTitle>
              <p style={{ lineHeight: 1.7, color: '#555' }}>
                along the way, there were late nights debugging smart contracts,
                early mornings deploying web apps, and countless hours perfecting
                the craft. the terminal became a canvas, and code became art.
              </p>
            </Section>
            <Section>
              <SectionTitle>Today</SectionTitle>
              <p style={{ lineHeight: 1.7, color: '#555' }}>
                now, this website stands as a digital museum — a collection of
                projects, memories, and passions. from anime to gaming, from
                coding to creation, it's all here.
              </p>
            </Section>
          </>
        )}
      </Content>
    </Container>
  );
}
