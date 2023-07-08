import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import SearchBar from '../../../common/components/SearchBar';
import SearchListHeader from '../components/SearchListHeader';
import Cards from '../../../common/components/Cards';

export default function Search() {
  const params = useParams();
  console.log(params.keyword);
  return (
    <Wrapper>
      <SearchBar />
      <SearchListHeader keyword={params.keyword} />
      <Cards />
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
