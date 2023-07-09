import { styled } from 'styled-components';
import SearchBar from '../../../common/components/SearchBar';
import SearchListHeader from '../components/SearchListHeader';
import Cards from '../../../common/components/Cards';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../../../common/store/keywordStore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';

export default function Search() {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.keyword);
  console.log("이거는 사라졌을까?",keyword)
  // useEffect(() => {
  //   return () => {
  //     console.log("why 안돼")
  //     dispatch(setKeyword(''));
  //   };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Wrapper>
      <SearchBar />
      <SearchListHeader />
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
