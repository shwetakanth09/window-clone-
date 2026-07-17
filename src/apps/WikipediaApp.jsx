import { useState } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Linux Libertine', 'Georgia', 'Times', serif;
  font-size: 14px;
  background: #f6f6f6;
`

const WikiHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #fff;
  border-bottom: 1px solid #a7d7f9;
  gap: 12px;
`

const WikiLogo = styled.div`
  font-family: 'Linux Libertine', 'Georgia', serif;
  font-size: 20px;
  font-weight: normal;
  letter-spacing: -0.5px;
  color: #000;
  user-select: none;
`

const WikiSearch = styled.div`
  margin-left: auto;
  display: flex;
  gap: 4px;
`

const SearchInput = styled.input`
  font-family: inherit;
  font-size: 13px;
  padding: 3px 6px;
  border: 1px solid #a2a9b1;
  width: 200px;
  background: #fff;
`

const SearchBtn = styled.button`
  font-family: inherit;
  font-size: 12px;
  padding: 3px 10px;
  background: #f8f9fa;
  border: 1px solid #a2a9b1;
  cursor: pointer;

  &:hover {
    background: #eaecf0;
  }
`

const WikiBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const Sidebar = styled.div`
  width: 160px;
  min-width: 160px;
  background: #f6f6f6;
  border-right: 1px solid #ddd;
  padding: 8px 0;
  overflow-y: auto;
`

const SidebarSection = styled.div`
  padding: 4px 10px;
  font-size: 12px;
  font-family: sans-serif;
`

const SidebarTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding: 6px 10px 4px;
  color: #54595d;
  font-family: sans-serif;
`

const SidebarLink = styled.a`
  display: block;
  padding: 2px 10px;
  font-size: 12px;
  color: #0645ad;
  text-decoration: none;
  font-family: sans-serif;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const MainContent = styled.div`
  flex: 1;
  background: #fff;
  padding: 16px 24px;
  overflow-y: auto;
  color: #202122;
  line-height: 1.6;
`

const ArticleTitle = styled.h1`
  font-family: 'Linux Libertine', 'Georgia', serif;
  font-size: 28px;
  font-weight: normal;
  border-bottom: 1px solid #a2a9b1;
  padding-bottom: 4px;
  margin-bottom: 12px;
`

const SectionHeading = styled.h2`
  font-family: 'Linux Libertine', 'Georgia', serif;
  font-size: 22px;
  font-weight: normal;
  border-bottom: 1px solid #a2a9b1;
  padding-bottom: 2px;
  margin-top: 20px;
  margin-bottom: 8px;
`

const SubHeading = styled.h3`
  font-family: 'Linux Libertine', 'Georgia', serif;
  font-size: 17px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 6px;
`

const Paragraph = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
`

const WikiLink = styled.a`
  color: #0645ad;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: #0b0080;
  }
`

const Infobox = styled.div`
  float: right;
  width: 260px;
  margin: 0 0 12px 16px;
  border: 1px solid #a2a9b1;
  background: #f8f9fa;
  font-size: 13px;
  font-family: sans-serif;
`

const InfoboxTitle = styled.div`
  background: #cee0f2;
  text-align: center;
  font-weight: bold;
  padding: 6px;
  font-size: 14px;
`

const InfoboxRow = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`

const InfoboxLabel = styled.div`
  width: 90px;
  padding: 4px 6px;
  font-weight: bold;
  background: #f0f0f0;
  font-size: 12px;
`

const InfoboxValue = styled.div`
  flex: 1;
  padding: 4px 6px;
  font-size: 12px;
`

const TabBar = styled.div`
  display: flex;
  background: #f6f6f6;
  border-bottom: 1px solid #a7d7f9;
  font-family: sans-serif;
  font-size: 12px;
`

const Tab = styled.div`
  padding: 6px 14px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#fff' : '#f6f6f6')};
  border: 1px solid ${({ $active }) => ($active ? '#a7d7f9' : 'transparent')};
  border-bottom: ${({ $active }) => ($active ? '1px solid #fff' : '1px solid transparent')};
  margin-bottom: ${({ $active }) => ($active ? '-1px' : '0')};
  color: #0645ad;
`

export default function WikipediaApp({ onClose }) {
  const [activeTab, setActiveTab] = useState('article')

  return (
    <AppContainer>
      <WikiHeader>
        <WikiLogo>Wikipedia</WikiLogo>
        <span style={{ fontSize: 11, color: '#54595d', fontFamily: 'sans-serif' }}>
          The Free Encyclopedia
        </span>
        <WikiSearch>
          <SearchInput type="text" placeholder="Search Wikipedia" />
          <SearchBtn>Search</SearchBtn>
        </WikiSearch>
      </WikiHeader>

      <TabBar>
        <Tab $active={activeTab === 'article'} onClick={() => setActiveTab('article')}>
          Article
        </Tab>
        <Tab onClick={() => setActiveTab('talk')}>Talk</Tab>
        <Tab onClick={() => setActiveTab('read')}>Read</Tab>
        <Tab onClick={() => setActiveTab('edit')}>Edit</Tab>
        <Tab onClick={() => setActiveTab('history')}>View history</Tab>
      </TabBar>

      <WikiBody>
        <Sidebar>
          <SidebarTitle>Navigation</SidebarTitle>
          <SidebarLink>Main page</SidebarLink>
          <SidebarLink>Contents</SidebarLink>
          <SidebarLink>Current events</SidebarLink>
          <SidebarLink>Random article</SidebarLink>
          <SidebarLink>About Wikipedia</SidebarLink>
          <SidebarLink>Contact us</SidebarLink>
          <SidebarLink>Donate</SidebarLink>

          <SidebarTitle style={{ marginTop: 12 }}>Contribute</SidebarTitle>
          <SidebarLink>Help</SidebarLink>
          <SidebarLink>Learn to edit</SidebarLink>
          <SidebarLink>Community portal</SidebarLink>
          <SidebarLink>Recent changes</SidebarLink>
          <SidebarLink>Upload file</SidebarLink>

          <SidebarTitle style={{ marginTop: 12 }}>Tools</SidebarTitle>
          <SidebarLink>What links here</SidebarLink>
          <SidebarLink>Related changes</SidebarLink>
          <SidebarLink>Special pages</SidebarLink>
          <SidebarLink>Permanent link</SidebarLink>
          <SidebarLink>Page information</SidebarLink>
          <SidebarLink>Cite this page</SidebarLink>
          <SidebarLink>Wikidata item</SidebarLink>

          <SidebarTitle style={{ marginTop: 12 }}>Languages</SidebarTitle>
          <SidebarLink>Español</SidebarLink>
          <SidebarLink>Français</SidebarLink>
          <SidebarLink>日本語</SidebarLink>
          <SidebarLink>中文</SidebarLink>
          <SidebarLink>한국어</SidebarLink>
        </Sidebar>

        <MainContent>
          <ArticleTitle>Cowboy Bebop</ArticleTitle>

          <Infobox>
            <InfoboxTitle>Cowboy Bebop</InfoboxTitle>
            <InfoboxRow>
              <InfoboxLabel>Genre</InfoboxLabel>
              <InfoboxValue>Science fiction, Neo-noir</InfoboxValue>
            </InfoboxRow>
            <InfoboxRow>
              <InfoboxLabel>Created by</InfoboxLabel>
              <InfoboxValue>Shinichirō Watanabe</InfoboxValue>
            </InfoboxRow>
            <InfoboxRow>
              <InfoboxLabel>Studio</InfoboxLabel>
              <InfoboxValue>Sunset Studio, Sunrise</InfoboxValue>
            </InfoboxRow>
            <InfoboxRow>
              <InfoboxLabel>Original run</InfoboxLabel>
              <InfoboxValue>April 3, 1998 – April 24, 1999</InfoboxValue>
            </InfoboxRow>
            <InfoboxRow>
              <InfoboxLabel>Episodes</InfoboxLabel>
              <InfoboxValue>26</InfoboxValue>
            </InfoboxRow>
            <InfoboxRow>
              <InfoboxLabel>Opening theme</InfoboxLabel>
              <InfoboxValue>"Tank!" by The Seatbelts</InfoboxValue>
            </InfoboxRow>
          </Infobox>

          <Paragraph>
            <WikiLink>Cowboy Bebop</WikiLink> is a Japanese{' '}
            <WikiLink>anime</WikiLink> television series created by{' '}
            <WikiLink>Shinichirō Watanabe</WikiLink> that premiered on{' '}
            <WikiLink>TVA</WikiLink> in Japan from April 3, 1998, to April 24, 1999.
            The series is set in the year 2071 and follows the lives of a group of
            bounty hunters, known as "cowboys," traveling aboard their spaceship, the
            Bebop.
          </Paragraph>

          <SectionHeading>Overview</SectionHeading>
          <Paragraph>
            Cowboy Bebop is a critically acclaimed series that has been praised for
            its style, characters, delivery of philosophical themes, and its
            unprecedented use of music. The series has been called "one of the most
            creative and influential anime series of all time" and is widely regarded
            as one of the best anime ever made. It was the first anime series to be
            broadcast on Adult Swim in the United States.
          </Paragraph>
          <Paragraph>
            The series' name is a reference to{' '}
            <WikiLink>bebop</WikiLink>, a style of{' '}
            <WikiLink>jazz</WikiLink> music. The series is influenced by a large
            number of cinematic and literary genres, including{' '}
            <WikiLink>Westerns</WikiLink>,{' '}
            <WikiLink>film noir</WikiLink>, and{' '}
            <WikiLink>science fiction</WikiLink>. The series explores existential
            themes of the burden of the past, the difficulty of finding a purpose in
            life, and the struggle of forming connections with others.
          </Paragraph>

          <SectionHeading>Plot</SectionHeading>
          <Paragraph>
            The series is set in 2071, fifty years after a catastrophic accident that
            made interplanetary travel possible and easy by creating hyperspace gates.
            Earth has been rendered largely uninhabitable after a meteor shower, and
            humanity has colonized much of the Solar System. The series follows the
            crew of the Bebop, a bounty hunter ship, as they travel the Solar System
            chasing bounty heads and trying to make ends meet.
          </Paragraph>
          <Paragraph>
            The crew consists of <WikiLink>Spike Spiegel</WikiLink>, a former
            member of a crime syndicate; <WikiLink>Faye Valentine</WikiLink>, a
            woman with amnesia who is burdened by debt;{' '}
            <WikiLink>Jet Black</WikiLink>, the owner of the Bebop and a former
            ISSP officer; <WikiLink>Edward Wong</WikiLink>, a eccentric hacker
            prodigy; and <WikiLink>Ein</WikiLink>, a genetically enhanced Corgi
            with human-level intelligence.
          </Paragraph>

          <SectionHeading>Characters</SectionHeading>
          <SubHeading>Spike Spiegel</SubHeading>
          <Paragraph>
            Spike Spiegel is the main protagonist of Cowboy Bebop. He is a bounty
            hunter and former member of the Red Dragon Crime Syndicate. Spike is
            depicted as a lean, laid-back man who is skilled in martial arts,
            particularly Jeet Kune Do. He is haunted by his past, particularly his
            relationship with a woman named Julia.
          </Paragraph>

          <SubHeading>Faye Valentine</SubHeading>
          <Paragraph>
            Faye Valentine is a bounty hunter and member of the Bebop crew. She is
            characterized by her reckless and impulsive behavior. After being
            revived from cryogenic sleep, Faye finds herself with a large debt and
            no memory of her past life.
          </Paragraph>

          <SubHeading>Jet Black</SubHeading>
          <Paragraph>
            Jet Black is the captain of the Bebop and its owner. He is a former
            police officer of the ISSP who became a bounty hunter. Jet is depicted
            as the most mature member of the crew and acts as a father figure.
          </Paragraph>

          <SectionHeading>Production</SectionHeading>
          <Paragraph>
            The series was directed by Shinichirō Watanabe and produced by Sunrise.
            The series' music was composed by Yoko Kanno and performed by her band,
            The Seatbelts. The opening theme, "Tank!", is a jazz piece that has
            become iconic in the anime community. The series was broadcast in Japan
            on TV Tokyo from April 1998 to April 1999.
          </Paragraph>
          <Paragraph>
            Watanabe has cited various influences for Cowboy Bebop, including{' '}
            <WikiLink>John Woo</WikiLink> films,{' '}
            <WikiLink>Sergio Leone</WikiLink> westerns, and{' '}
            <WikiLink>Hong Kong action cinema</WikiLink>. The series' visual style
            was also influenced by <WikiLink>film noir</WikiLink> and various
            American films.
          </Paragraph>

          <SectionHeading>Reception</SectionHeading>
          <Paragraph>
            Cowboy Bebop has been widely acclaimed by critics and audiences. It won
            the <WikiLink>Anime Grand Prix</WikiLink> award in 1998 and 1999, and
            has consistently ranked as one of the best anime series of all time in
            various polls and rankings. The series has a 100% approval rating on{' '}
            <WikiLink>Rotten Tomatoes</WikiLink>.
          </Paragraph>
          <Paragraph>
            The series has also been successful commercially. The DVD releases in
            Japan and the United States sold well, and the series is credited with
            helping to popularize anime in the Western world. A{' '}
            <WikiLink>live-action film adaptation</WikiLink> starring{' '}
            <WikiLink>Keanu Reeves</WikiLink> was released in 2019.
          </Paragraph>
        </MainContent>
      </WikiBody>
    </AppContainer>
  )
}
