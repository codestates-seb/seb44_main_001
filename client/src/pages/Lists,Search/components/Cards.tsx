import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { RootState } from '../../../common/store/RootStore';
import { getData } from '../api/getData';
import { CardData } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';
import { resetCreatedPost } from '../../Write,Edit/store/CreatedPost';
import Card from '../../../common/components/Card';
import momofriends from '../../../common/assets/logo/momofriends.svg';

export default function Cards() {
  const { keyword } = useParams();
  
  const dispatch = useDispatch();

  const selectedLocationId = useSelector(
    (state: RootState) => state.selectedLocation.locationId,
  );

  const selectedCategoryId = useSelector(
    (state: RootState) => state.selectedCategory.categoryId,
  );

  // 배포 전 지우기
  // console.log(
  //   '이건 Cards컴포넌트:',
  //   keyword,
  //   selectedCategory,
  //   selectedLocation.locationId,
  // );
  console.log("선택한 로케이션 아이디",selectedLocationId);
  console.log("선택한 카테고리 아이디",selectedCategoryId);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  }: UseInfiniteQueryResult<CardData[], unknown> = useInfiniteQuery(
    ['filteredList', keyword, selectedCategoryId, selectedLocationId],
    ({ pageParam = 1 }) =>
      getData(
        `${BASE_URL}/posts${`${keyword && '/search'}/${
          selectedCategoryId !== 1 ? 'category-' : ''
        }location`}`,
        keyword && keyword,
        selectedCategoryId === 1 ? undefined : selectedCategoryId,
        selectedLocationId,
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

  if (isLoading)
    return (
      <Loading>
        <img src={momofriends} alt="loading" />
        <div className="message">로딩중...</div>
      </Loading>
    );

  if (isError) return <Error>서버와의 연결이 끊어졌어요😢</Error>;

  return (
    <Wrapper>
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
                locationInfo={post.locationInfo}
                categoryInfo={post.categoryInfo}
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 769px) and (max-width: 1264px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1265px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Message = styled.div`
  font-size: var(--font-size-l);
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  animation: bounce_frames 0.5s infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  @keyframes bounce_frames {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 50px, 0);
    }
  }
  .message {
    margin-top: 1rem;
    font-size: var(--font-size-l);
  }
`;

const Error = styled.div`
  margin-top: 3rem;
  font-size: var(--font-size-l);
`;
