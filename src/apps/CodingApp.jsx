import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { projects } from '../data/projects';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(8px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  background: #fff;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 12px;
  color: #333;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 220px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  background: #f8f8f8;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  padding: 10px 12px;
  font-weight: 600;
  font-size: 13px;
  color: #0078d4;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-family: inherit;
  font-size: 11px;
  outline: none;
  border-bottom: 1px solid #e0e0e0;

  &:focus {
    border-color: #0078d4;
    box-shadow: inset 0 0 0 1px #0078d420;
  }
`;

const CategoryGroup = styled.div`
  border-bottom: 1px solid #eee;
`;

const CategoryHeader = styled.div`
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  background: #f0f0f0;
`;

const ProjectItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-left: 3px solid ${({ $active }) => ($active ? '#0078d4' : 'transparent')};
  background: ${({ $active }) => ($active ? '#e8f4fd' : 'transparent')};
  transition: all 0.1s;

  &:hover {
    background: #f0f6ff;
  }
`;

const ProjectName = styled.div`
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? '#0078d4' : '#333')};
  margin-bottom: 2px;
`;

const ProjectCategory = styled.div`
  font-size: 10px;
  color: #999;
`;

const Detail = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  animation: ${fadeIn} 0.2s ease;
`;

const DetailTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0078d4;
  margin: 0 0 4px 0;
`;

const DetailCategory = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #e8f4fd;
  color: #0078d4;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const DetailDesc = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 20px;
`;

const GitHubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #24292e;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s;

  &:hover {
    background: #444;
  }
`;

const ProjectCounter = styled.div`
  padding: 8px 12px;
  font-size: 11px;
  color: #888;
  border-top: 1px solid #e0e0e0;
  background: #fff;
  position: sticky;
  bottom: 0;
`;

const CATEGORY_COLORS = {
  Web: '#0078d4',
  'Console App': '#68217a',
  Console: '#68217a',
  Discord: '#5865f2',
  'Windows Forms': '#512bd4',
  WPF: '#512bd4',
  Crypto: '#f7931a',
  Utility: '#666',
  CLI: '#e44d26',
  Gaming: '#4caf50',
  Data: '#ff9800',
  Blockchain: '#f7931a',
  'Visual Novel': '#e91e63',
};

export default function CodingApp() {
  const [selected, setSelected] = useState(projects[0]);
  const [filter, setFilter] = useState('');

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase())
  );

  const grouped = {};
  filtered.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>📁 Projects ({filtered.length})</SidebarHeader>
        <SearchInput
          placeholder="Search projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {Object.entries(grouped).map(([cat, projs]) => (
          <CategoryGroup key={cat}>
            <CategoryHeader>{cat}</CategoryHeader>
            {projs.map((p) => (
              <ProjectItem
                key={p.name}
                $active={selected?.name === p.name}
                onClick={() => setSelected(p)}
              >
                <ProjectName $active={selected?.name === p.name}>{p.name}</ProjectName>
                <ProjectCategory>{p.category}</ProjectCategory>
              </ProjectItem>
            ))}
          </CategoryGroup>
        ))}
        <ProjectCounter>{filtered.length} projects</ProjectCounter>
      </Sidebar>

      <Detail>
        {selected ? (
          <>
            <DetailTitle>{selected.name}</DetailTitle>
            <DetailCategory
              style={{
                borderColor: CATEGORY_COLORS[selected.category] || '#0078d4',
                color: CATEGORY_COLORS[selected.category] || '#0078d4',
              }}
            >
              {selected.category}
            </DetailCategory>
            <DetailDesc>{selected.description}</DetailDesc>
            {selected.github && (
              <GitHubLink href={selected.github} target="_blank" rel="noreferrer">
                ⭐ View on GitHub
              </GitHubLink>
            )}
          </>
        ) : (
          <div style={{ color: '#999', textAlign: 'center', marginTop: 60 }}>
            Select a project to view details
          </div>
        )}
      </Detail>
    </Container>
  );
}
