import { styled } from 'styled-components';
import SearchBar from '../../../common/components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../../../common/components/Cards';
import ListHeader from '../../../common/components/ListHeader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../../../common/store/keywordStore';

export default function Lists() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(setKeyword(''))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <SearchBar />
      <CategoryIcons />
      <ListHeader />
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
