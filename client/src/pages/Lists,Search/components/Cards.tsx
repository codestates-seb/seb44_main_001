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
import roundingMomo from '../../../common/assets/images/roundingMomo.svg';
import cryingMomo from '../../../common/assets/images/cryingMomo1.svg';
import TopButton from '../../../common/components/TopButton';

export default function Cards() {
  const dispatch = useDispatch();

  const keyword = useParams().keyword || '';

  const selectedLocationId = useSelector(
    (state: RootState) => state.selectedLocation.locationId,
  );
  const selectedCategoryId = useSelector(
    (state: RootState) => state.selectedCategory.categoryId,
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  }: UseInfiniteQueryResult<CardData[], unknown> = useInfiniteQuery(
    ['filteredList', keyword, selectedCategoryId, selectedLocationId],
    ({ pageParam = 1 }) => {
      const urlPath = `${BASE_URL}/posts${`${keyword && '/search'}/${
        selectedCategoryId !== 1 ? 'category-' : ''
      }location`}`;
      const searchData = keyword && keyword;
      const categoryId =
        selectedCategoryId === 1 ? undefined : selectedCategoryId;
      const locationId = selectedLocationId;
      return getData(urlPath, searchData, categoryId, locationId, pageParam);
    },
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
        <img src={roundingMomo} alt="loading" />
        <div className="message">로딩중...</div>
      </Loading>
    );

  if (isError)
    return (
      <Error>
        <img src={cryingMomo} alt="error" />
        <div>서버와의 연결이 끊어졌어요</div>
      </Error>
    );

  const flattenedData = data?.pages.flatMap((page) => page);

  return (
    <Wrapper>
      {flattenedData && flattenedData.length ? (
        <Lists>
          {flattenedData.map((post: CardData, index: number) => (
            <Card
              key={index}
              title={post.title}
              content={post.content.replace(/<[^>]*>/g, '')}
              memberInfo={post.memberInfo}
              locationInfo={post.locationInfo}
              categoryInfo={post.categoryInfo}
              postId={post.postId}
              tags={post.tags}
            />
          ))}
        </Lists>
      ) : (
        <Message>
          <img src={cryingMomo} alt="no-data" />
          <div>조건과 일치하는 모임이 없어요ㅠㅠ</div>
        </Message>
      )}
      <TopButton/>
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

  @media (max-width: 832px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 832px) and (max-width: 1264px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1265px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-l);
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  > img {
    animation: rotateAnimation 2s linear infinite;
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
