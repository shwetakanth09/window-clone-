import { useState } from 'react';
import styled from 'styled-components';
import { datingProfiles } from '../data/datingData';

const Container = styled.div`
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const Title = styled.div`
  background: linear-gradient(90deg, #800040, #c00060);
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
`;

const SplitPane = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

const LeftPanel = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  border-right: 2px groove #808080;
  flex-shrink: 0;
`;

const ListHeader = styled.div`
  padding: 3px 6px;
  font-size: 11px;
  font-weight: bold;
  color: #000;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
`;

const ProfileList = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
  margin: 2px;
  border-top: 2px inset #808080;
  border-left: 2px inset #808080;
  border-bottom: 2px inset #fff;
  border-right: 2px inset #fff;
`;

const ProfileItem = styled.div`
  padding: 4px 8px;
  font-size: 11px;
  color: #000;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${p => p.$selected ? '#000080' : 'transparent'};
  color: ${p => p.$selected ? '#fff' : '#000'};
  font-weight: ${p => p.$selected ? 'bold' : 'normal'};

  &:hover {
    background: ${p => p.$selected ? '#000080' : '#e0e0e0'};
  }
`;

const DateRange = styled.span`
  font-size: 9px;
  color: ${p => p.$selected ? '#ccc' : '#808080'};
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  padding: 8px 12px;
  background: #e8e0f0;
  border-bottom: 1px solid #808080;
`;

const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #800040;
`;

const ProfileDates = styled.div`
  font-size: 10px;
  color: #555;
  margin-top: 2px;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 6px;
  background: #fff;
  margin: 2px;
  border-top: 2px inset #808080;
  border-left: 2px inset #808080;
  border-bottom: 2px inset #fff;
  border-right: 2px inset #fff;
`;

const Section = styled.div`
  margin-bottom: 8px;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: #800040;
  padding: 2px 0;
  border-bottom: 1px solid #c0c0c0;
  margin-bottom: 4px;
`;

const ListItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 2px 4px;
  font-size: 11px;
  color: #000;
`;

const ItemDate = styled.span`
  min-width: 80px;
  color: #555;
  font-size: 10px;
`;

const ItemDesc = styled.span`
  color: #000;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #808080;
  font-size: 12px;
`;

function DatingApp({ onClose }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = datingProfiles[selectedIdx];

  return (
    <Container>
      <Title>Dating History Viewer</Title>
      <SplitPane>
        <LeftPanel>
          <ListHeader>Profiles</ListHeader>
          <ProfileList>
            {datingProfiles.map((p, i) => (
              <ProfileItem
                key={p.name}
                $selected={i === selectedIdx}
                onClick={() => setSelectedIdx(i)}
              >
                <span>{p.name}</span>
                <DateRange $selected={i === selectedIdx}>
                  {p.startDate}
                </DateRange>
              </ProfileItem>
            ))}
          </ProfileList>
        </LeftPanel>
        <RightPanel>
          {selected ? (
            <>
              <ProfileHeader>
                <ProfileName>{selected.name}</ProfileName>
                <ProfileDates>
                  {selected.startDate} — {selected.endDate}
                </ProfileDates>
              </ProfileHeader>
              <ContentArea>
                {selected.subcategories.map(cat => (
                  <Section key={cat.name}>
                    <SectionTitle>{cat.name}</SectionTitle>
                    {cat.items.map((item, j) => (
                      <ListItem key={j}>
                        <ItemDate>{item.date}</ItemDate>
                        <ItemDesc>{item.description}</ItemDesc>
                      </ListItem>
                    ))}
                  </Section>
                ))}
              </ContentArea>
            </>
          ) : (
            <EmptyState>Select a profile</EmptyState>
          )}
        </RightPanel>
      </SplitPane>
    </Container>
  );
}

export default DatingApp;
