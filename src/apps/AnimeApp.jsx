import { useState } from 'react';
import styled from 'styled-components';
import { topAnime, allAnime } from '../data/animeList';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const TabBar = styled.div`
  display: flex;
  padding: 4px 4px 0;
  gap: 0;
`;

const Tab = styled.button`
  padding: 4px 16px;
  background: ${p => p.$active ? '#c0c0c0' : '#b0b0b0'};
  border-top: 2px solid ${p => p.$active ? '#fff' : '#808080'};
  border-left: 2px solid ${p => p.$active ? '#fff' : '#808080'};
  border-right: 2px solid ${p => p.$active ? '#404040' : '#808080'};
  border-bottom: ${p => p.$active ? 'none' : '2px solid #404040'};
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  margin-right: 1px;
  color: #000;
  position: relative;
  top: ${p => p.$active ? '2px' : '0'};

  &:active {
    background: #b0b0b0;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: #c0c0c0;
  border-top: 1px solid #808080;
`;

const SearchLabel = styled.span`
  font-size: 11px;
  color: #000;
  white-space: nowrap;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 2px 4px;
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  font-family: inherit;
  font-size: 11px;
  outline: none;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 2px 4px 4px;
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  padding: 4px;
`;

const TopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 6px;
  font-size: 11px;
  color: #000;
  cursor: pointer;
  background: ${p => p.$hover ? '#000080' : 'transparent'};
  color: ${p => p.$hover ? '#fff' : '#000'};

  &:hover {
    background: #000080;
    color: #fff;
  }
`;

const Rank = styled.span`
  font-weight: bold;
  min-width: 24px;
  color: ${p => p.$hover ? '#ffcc00' : '#000080'};
  text-align: right;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  font-size: 10px;
  color: #808080;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #c0c0c0;
`;

const AnimeItem = styled.div`
  padding: 2px 6px;
  font-size: 11px;
  color: #000;
  cursor: pointer;
  &:hover {
    background: #000080;
    color: #fff;
  }
`;

const CountBar = styled.div`
  padding: 2px 8px;
  background: #c0c0c0;
  border-top: 1px solid #fff;
  font-size: 10px;
  color: #000;
`;

function AnimeApp() {
  const [activeTab, setActiveTab] = useState('top20');
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState(null);

  const filtered = allAnime.filter(a =>
    a.toLowerCase().includes(search.toLowerCase())
  );

  const uniqueFiltered = [...new Set(filtered)];

  return (
    <Container>
      <TabBar>
        <Tab $active={activeTab === 'top20'} onClick={() => setActiveTab('top20')}>
          Top 20
        </Tab>
        <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All Anime
        </Tab>
      </TabBar>

      {activeTab === 'all' && (
        <SearchBar>
          <SearchLabel>Search:</SearchLabel>
          <SearchInput
            placeholder="Filter anime..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
        </SearchBar>
      )}

      <ContentArea>
        {activeTab === 'top20' ? (
          <>
            <Separator>
              <Line />
              <span>Top 20 Favorite Anime</span>
              <Line />
            </Separator>
            {topAnime.map(item => (
              <TopItem
                key={item.rank}
                $hover={hovered === item.rank}
                onMouseEnter={() => setHovered(item.rank)}
                onMouseLeave={() => setHovered(null)}
              >
                <Rank $hover={hovered === item.rank}>#{item.rank}</Rank>
                <span>{item.title}</span>
                {item.aka !== item.title && (
                  <span style={{ color: hovered === item.rank ? '#aaa' : '#808080', fontSize: 10 }}>
                    ({item.aka})
                  </span>
                )}
              </TopItem>
            ))}
          </>
        ) : (
          <>
            <Separator>
              <Line />
              <span>All Anime ({uniqueFiltered.length} titles)</span>
              <Line />
            </Separator>
            {uniqueFiltered.map((anime, i) => (
              <AnimeItem key={`${anime}-${i}`}>{anime}</AnimeItem>
            ))}
            {uniqueFiltered.length === 0 && (
              <AnimeItem style={{ color: '#808080' }}>No results found</AnimeItem>
            )}
          </>
        )}
      </ContentArea>

      <CountBar>
        {activeTab === 'top20'
          ? `Showing: Top 20`
          : `Showing: ${uniqueFiltered.length} of ${allAnime.length} titles`
        }
      </CountBar>
    </Container>
  );
}

export default AnimeApp;
