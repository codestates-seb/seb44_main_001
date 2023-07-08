import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { RootState } from '../store/RootStore';
import { getData } from '../../pages/Lists/api/getData';
import { CardData } from '../type';
import { BASE_URL } from '../util/constantValue';
import Card from './Card';


export default function Cards() {
  // const selectedLocation = useSelector(
  //   (state: RootState) => state.selectedLocation.selectedLocation,
  // );

  // const selectedCategory = useSelector(
  //   (state: RootState) => state.selectedCategory.selectedCategory,
  // );
  const selectedLocation = 4;
  const selectedCategory = 4;

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      'filteredList',
      ({ pageParam = 1 }) => getData(`${BASE_URL}/posts/category-location`,selectedLocation, selectedCategory, pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.length === 0 ? undefined : nextPage;
        }
      },
    );
  // 무한 스크롤 이벤트 핸들러
  console.log(data?.pageParams); //undefined로 뜸
  console.log(data?.pages.flatMap((page) => page)); // 찐 데이터

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

  if (isLoading) return <LoadingMsg>로딩중...</LoadingMsg>;
  if (isError) return <LoadingMsg>잘못된 데이터 입니다.</LoadingMsg>;

  return (
    <Wrapper>
      {data && data?.pages.flatMap((page) => page).length ? (
        <Lists>
          {data?.pages.flatMap((page) => page).map((el: CardData, index: number) => (
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
        <Message>조건과 일치하는 모임이 없어요🥲</Message>
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

const LoadingMsg = styled.div`
  margin-top: 3rem;
  font-size: var(--font-size-l);
`;
