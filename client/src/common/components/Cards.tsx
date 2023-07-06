import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/RootStore';
import { useQuery } from 'react-query';
import axios from 'axios';
import Card from './Card';
import { CardData } from '../type';

export default function Cards() {
  const category = useSelector(
    (state: RootState) => state.filteredList.category,
  );
  const region = '광진구';

  const params = {
    region: region,
    category: category,
  };
  const { isLoading, data } = useQuery('filteredData', () =>
    axios('http://localhost:3000/posts', { params }).then((res) => res.data),
  );

  return (
    <Lists>
      {data?.map((el: CardData, index: number) => (
        <Card
          key={index}
          title={el.title}
          content={el.content}
          userImg={el.userImg}
          userName={el.userName}
        />
      ))}
    </Lists>
  );
}

const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;
