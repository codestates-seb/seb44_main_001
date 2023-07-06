import { styled } from 'styled-components';
import SearchBar from '../../../common/components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../../../common/components/Cards';
import ListHeader from '../../../common/components/ListHeader';

export default function Lists() {
  return (
    <Wrapper>
      <SearchBar />
      <CategoryIcons />
      <ListHeader/>
      <Cards/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

