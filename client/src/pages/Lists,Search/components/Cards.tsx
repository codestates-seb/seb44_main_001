import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';
import { RootState } from '../../../common/store/RootStore';
import { getData } from '../api/getData';
import { CardData } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import Card from '../../../common/components/Card';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';
import { resetCreatedPost } from '../../Write,Edit/store/CreatedPost';

export default function Cards() {
  //로그인 전역상태 구현되면 지우기
  const [isLogin, setIslogin] = useState(false);
  const keyword = useSelector((state: RootState) => state.keyword);
  console.log('로그인댓나?', isLogin);
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  // 배포 전 지우기
  console.log(
    '이건 Cards컴포넌트:',
    keyword,
    selectedCategory,
    selectedLocation.locationId,
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  }: UseInfiniteQueryResult<CardData[], unknown> = useInfiniteQuery(
    ['filteredList', keyword, selectedCategory, selectedLocation, isLogin],
    ({ pageParam = 1 }) =>
      getData(
        `${BASE_URL}/posts${
          isLogin
            ? `${keyword && '/search'}/category-location`
            : keyword && '/search/category-location'
        }`,
        keyword && keyword,
        selectedCategory,
        selectedLocation.locationId,
        pageParam,
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length === 0 ? undefined : nextPage;
      },
    },
  );

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

  useEffect(() => {
    return () => {
      dispatch(setCategory({ categoryId: 0, name: '' }));
      dispatch(setLocation({ locationId: 0, city: '', province: '' }));
      dispatch(resetCreatedPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) return <LoadingMsg>로딩중...</LoadingMsg>;
  // if (isError) return <LoadingMsg>서버와의 연결이 끊어졌어요😢</LoadingMsg>;

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setIslogin(!isLogin);
        }}
      >
        {`${isLogin}`}
      </Button>
      {/* 로그인 전역상태 구현되면 지우기 */}
      {data && data?.pages.flatMap((page) => page).length ? (
        <Lists>
          {data?.pages
            .flatMap((page) => page)
            .map((post: CardData, index: number) => (
              <Card
                key={index}
                title={post.title}
                content={post.content.replace(/<[^>]*>/g, '')}
                memberInfo={post.memberInfo}
                postId={post.postId}
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

const Button = styled.button`
  width: 30px;
  height: 3.125rem;
`;
