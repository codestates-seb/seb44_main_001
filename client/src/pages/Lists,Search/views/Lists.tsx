import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import SearchBar from '../components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../components/Cards';
import ListsHeader from '../components/ListsHeader';
import ChatButton from '../../../common/components/Chat/views/ChatModal';

export default function Lists() {
  const location = useLocation();

  const isPathLists = location.pathname === '/lists';

  return (
    <Wrapper>
      <ListsHeader />
      {isPathLists ? <CategoryIcons /> : null}
      <SearchBar />
      <Cards />
      <ChatButton />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 5rem;
`;
