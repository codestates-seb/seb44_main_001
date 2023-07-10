import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import { RootState } from '../../../common/store/RootStore';
import { getData } from '../api/getData';
import { CardData } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import Card from '../../../common/components/Card';

export default function Cards() {
  const keyword = useSelector((state: RootState) => state.keyword);

  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  console.log(
    '이건 Cards컴포넌트:',
    keyword,
    selectedCategory,
    selectedLocation,
  );

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['filteredList', keyword, selectedCategory, selectedLocation],
      ({ pageParam = 1 }) =>
        getData(
          `${BASE_URL}/posts${keyword && '/search'}/category-location`,
          keyword && keyword,
          selectedCategory,
          selectedLocation,
          pageParam,
        ),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.length === 0 ? undefined : nextPage;
        },
      },
    );

  // console.log(data?.pageParams); //undefined로 뜸
  // console.log(data?.pages.flatMap((page) => page)); // 찐 데이터

  const scrollTargetRef = useRef(null);

  useEffect(() => {
    const handleScroll: IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
    const target = scrollTargetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingMsg>로딩중...</LoadingMsg>;
  if (isError) return <LoadingMsg>서버와의 연결이 끊어졌어요😢</LoadingMsg>;

  return (
    <Wrapper>
      {data && data?.pages.flatMap((page) => page).length ? (
        <Lists>
          {data?.pages
            .flatMap((page) => page)
            .map((el: CardData, index: number) => (
              <Card
                key={index}
                title={el.title}
                content={el.content.replace(/<[^>]*>/g, '')}
                userImg={el.userImg}
                userName={el.userName}
                postId={el.postId}
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
  @media (max-width: 1264px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 464px) {
    grid-template-columns: repeat(1);
  }
`;

const Message = styled.div`
  font-size: var(--font-size-l);
`;

const LoadingMsg = styled.div`
  margin-top: 3rem;
  font-size: var(--font-size-l);
`;
