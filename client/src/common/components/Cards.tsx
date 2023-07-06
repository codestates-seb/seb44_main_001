import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { CardData } from '../type';
import { RootState } from '../store/RootStore';
import { getData } from '../../pages/Lists/api/getData';
import Card from './Card';

export default function Cards() {
  const currentCategory = useSelector(
    (state: RootState) => state.currentCategory.currentCategory,
  );

  const currentRegion = '광진구';

  const { data, refetch } = useQuery('currentCategory', () =>
    getData('http://localhost:3000/posts', currentRegion, currentCategory),
  );
  console.log(data);
  useEffect(() => {
    refetch();
  }, [currentCategory, refetch]);

  return (
    <Lists>
      {data ? (
        data?.map((el: CardData, index: number) => (
          <Card
            key={index}
            title={el.title}
            content={el.content}
            userImg={el.userImg}
            userName={el.userName}
          />
        ))
      ) : (
        <div>모임이 없어요!!!</div>
      )}
    </Lists>
  );
}

const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;
