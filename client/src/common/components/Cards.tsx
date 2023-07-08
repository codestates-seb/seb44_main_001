import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useQuery, useInfiniteQuery } from 'react-query';
import { CardData } from '../type';
import { RootState } from '../store/RootStore';
import { getData } from '../../pages/Lists/api/getData';
import Card from './Card';
import { BASE_URL } from '../util/constantValue';

export default function Cards() {
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation.selectedLocation,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory.selectedCategory,
  );

  // const { data, refetch } = useQuery('filteredLists', () =>
  //   getData(`${URL}/posts`, selectedLocation, selectedCategory),
  // );

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      'filteredLists',
      ({ pageParam = 0 }) =>
        getData(
          `${BASE_URL}/posts`,
          selectedLocation,
          selectedCategory,
          pageParam,
        ),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.page !== pages[0].totalPage
            ? lastPage.page + 1
            : undefined;
        },
      },
    );
  console.log(data);
  // useEffect(() => {
  //   refetch();
  // }, [selectedLocation, selectedCategory, refetch]);
  const scrollTargetRef = useRef(null);
  useEffect(() => {
    const handleScroll = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        console.log('닿았나?');
        fetchNextPage();
      }
    };
    const options = {
      root: null,
      rootMargin: '0px 0px 200px 0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleScroll, options);
    const target = scrollTargetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [selectedLocation, selectedCategory, fetchNextPage, hasNextPage]);

  if (isLoading) return <h3>로딩중</h3>;
  if (isError) return <h3>잘못된 데이터 입니다.</h3>;

  return (
    <Wrapper>
      {data && data.length ? (
        <Lists>
          {data.map((el: CardData, index: number) => (
            <Card
              key={index}
              title={el.title}
              content={el.content}
              userImg={el.userImg}
              userName={el.userName}
            />
          ))}
        </Lists>
      ) : (
        <Message>모임이 없어요🥲</Message>
      )}
      <div ref={scrollTargetRef}></div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-top: 3rem;
`;
const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const Message = styled.div`
  font-size: var(--font-size-l);
`;
