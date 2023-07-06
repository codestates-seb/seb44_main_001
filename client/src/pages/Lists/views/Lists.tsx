import { styled } from 'styled-components';
import SearchBar from '../../../common/components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import ListsHeader from '../../../common/components/ListHeader';
import Cards from '../../../common/components/Cards';

export default function Lists() {
  return (
    <Wrapper>
      <SearchBar />
      <CategoryIcons />
      <ListsHeader />
      <Cards />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

