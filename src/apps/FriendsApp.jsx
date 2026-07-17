import styled from 'styled-components'
import { friendsData } from '../data/friendsData'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
  background: #c0c0c0;
`

const ContentArea = styled.div`
  flex: 1;
  background: #fff;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  margin: 2px;
  overflow-y: auto;
  padding: 8px;
`

const Header = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #808080;
  color: #000;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
`

const FriendCard = styled.div`
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-shadow: inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080;
  padding: 8px;
`

const FriendName = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $online }) => ($online ? '#00c800' : '#808080')};
  border: 1px solid ${({ $online }) => ($online ? '#009600' : '#606060')};
  flex-shrink: 0;
`

const FriendDesc = styled.div`
  font-size: 11px;
  color: #333;
  line-height: 1.3;
`

const FriendStatus = styled.div`
  font-size: 10px;
  color: #666;
  margin-top: 4px;
  font-style: italic;
`

export default function FriendsApp({ onClose }) {
  return (
    <AppContainer>
      <ContentArea>
        <Header>Friends ({friendsData.length})</Header>
        <Grid>
          {friendsData.map((friend) => (
            <FriendCard key={friend.name}>
              <FriendName>
                <StatusDot $online={friend.status === 'active'} />
                {friend.name}
              </FriendName>
              <FriendDesc>{friend.description}</FriendDesc>
              <FriendStatus>
                {friend.status === 'active' ? 'Online' : 'Offline'}
              </FriendStatus>
            </FriendCard>
          ))}
        </Grid>
      </ContentArea>
    </AppContainer>
  )
}
