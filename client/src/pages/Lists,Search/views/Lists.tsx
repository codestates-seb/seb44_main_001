import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import SearchBar from '../components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../components/Cards';
import ListsHeader from '../components/ListsHeader';

export default function Lists() {
  const location = useLocation();

  const isPathLists = location.pathname === '/lists';

  return (
    <Wrapper>
      <SearchBar />
      {isPathLists ? <CategoryIcons /> : null}
      <ListsHeader />
      <Cards />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 5rem;
`;
