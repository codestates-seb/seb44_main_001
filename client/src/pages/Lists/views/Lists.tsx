import { useState } from 'react';
import { styled } from 'styled-components';
import SearchBar from '../../../common/components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../../../common/components/Cards';

export default function Lists() {
  //나중에 초기상태는 유저의 지역
  const [lists, setLists] = useState([])

  return (
    <Wrapper>
      <SearchBar />
      <CategoryIcons 
      setLists={setLists}
      />
      <Cards lists={lists} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
