import { useEffect, useRef } from 'react';
import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';

import { getMyLikes } from '../api/getMyLikes';
import { BASE_URL } from '../../../common/util/constantValue';
import { CardData } from '../../../common/type';

import cryingMomo from '../../../common/assets/images/cryingMomo1.svg';
import roundingMomo from '../../../common/assets/images/roundingMomo.svg';
import SemiHeader from '../../../common/components/SemiHeader';
import Card from '../../../common/components/Card';
import TopButton from '../../../common/components/TopButton';

export default function UserLikes() {
  const userInfo = useSelector((state: RootState) => state.member);
  const memberId = userInfo.memberId;

  const {
    data: userPosts,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  }: UseInfiniteQueryResult<CardData[], unknown> = useInfiniteQuery(
    ['userPosts'],
    ({ pageParam = 1 }) => {
      console.log(`${BASE_URL}/posts/like/member/${memberId}`);
      return getMyLikes(`${BASE_URL}/posts/like/member/${memberId}`, pageParam);
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

  const flattenedData = userPosts?.pages.flatMap((page) => page);

  return (
    <main>
      <SemiHeader title={'좋아요한 글'} content="" />
      <Wrapper>
        {flattenedData && flattenedData.length ? (
          <>
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
                  postLikeCount={post.postLikeCount}
                  commentCount={null}
                />
              ))}
            </Lists>
            {isLoading ? (
              <Loading>
                <img src={roundingMomo} alt="loading" />
                <div className="message">로딩중...</div>
              </Loading>
            ) : null}
          </>
        ) : (
          <Message>좋아요한 글이 없어요</Message>
        )}
        <TopButton />
      </Wrapper>
      <div ref={scrollTargetRef}></div>
    </main>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .momoImg {
    height: 3rem;
  }
`;

const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 3rem;

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
    width: 10rem;
    height: 10rem;
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
