import { styled } from 'styled-components';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { getUserPosts } from '../api/getUserPosts';
import { CardData } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import Card from '../../../common/components/Card';
import TopButton from '../../../common/components/TopButton';
import { useState } from 'react';
import roundingMomo from '../../../common/assets/images/roundingMomo.svg';
import cryingMomo from '../../../common/assets/images/cryingMomo1.svg';
import cryingMomo2 from '../../../common/assets/images/cryingMomo2.svg';
import Button from '../../../common/components/Button';
import coupleMomo from '../../../common/assets/logo/coupleMomo.svg';

export default function UserPostsCards({
  memberId,
  nickname,
  isMine,
}: {
  memberId: string;
  nickname: string;
  isMine: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(3);
  const [sort, setSort] = useState('');
  const [pageParamState, setPageParamState] = useState(1);

  const {
    data: userPosts,
    fetchNextPage,
    hasNextPage,
    isError,
  }: UseInfiniteQueryResult<CardData[], unknown> = useInfiniteQuery(
    ['userPosts', sort, memberId],
    ({ pageParam = `${pageParamState}` }) => {
      const urlPath = `${BASE_URL}/posts${sort}/member${
        sort && `/${memberId}`
      }`;
      const isMemberId = sort ? null : memberId;
      return getUserPosts(urlPath, isMemberId, pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length === 0 ? undefined : nextPage;
      },
    },
  );

  const handleClickMore = () => {
    setIsLoading(true);
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    setTimeout(() => {
      window.scrollTo({
        top: height,
        behavior: 'smooth',
      });
      setPage((prev) => prev + 3);
      setIsLoading(false);
    }, 300);
    if (hasNextPage) {
      fetchNextPage();
    } else {
      return;
    }
  };

  if (isError)
    return (
      <Error>
        <img src={cryingMomo} alt="error" />
        <div>서버와의 연결이 끊어졌어요</div>
      </Error>
    );

  const flattenedData = userPosts?.pages.flatMap((page) => page).slice(0, page);

  return (
    <Wrapper>
      <img className="momoImg" src={coupleMomo} alt="couple-momo" />
      <FeedSection>
        <span className="username">{`${nickname}`}</span>
        <span>님의 피드</span>
      </FeedSection>
      {isMine && (
        <ButtonSection>
          <Button
            children={'내가 쓴 글 보기'}
            onClick={() => {
              setSort('');
              setPageParamState(1);
            }}
          />
          <Button
            children={'내가 좋아요 한 글 보기'}
            onClick={() => {
              setSort('/like');
              setPageParamState(0);
            }}
          />
        </ButtonSection>
      )}

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
                commentCount={post.commentCount}
              />
            ))}
          </Lists>
          {isLoading ? (
            <Loading>
              <img src={roundingMomo} alt="loading" />
              <div className="message">로딩중...</div>
            </Loading>
          ) : null}
          <ButtonWrapper>
            <Button onClick={handleClickMore}>더보기</Button>
          </ButtonWrapper>
        </>
      ) : (
        <Message>
          <img src={cryingMomo2} alt="no-data" />
          {sort ? '좋아요 누른 글이 없어요' : '작성한 모임글이 없어요'}
        </Message>
      )}
      <TopButton />
    </Wrapper>
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
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
`;

const FeedSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  .username {
    font-size: var(--font-size-m);
    font-family: 'BR-Bold';
  }
`;

const ButtonSection = styled.div`
  margin-top: 1rem;
  & :first-child {
    margin-right: 1rem;
  }
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
const ButtonWrapper = styled.div`
  margin-top: 3rem;
`;
const Error = styled.div`
  margin-top: 3rem;
  font-size: var(--font-size-l);
`;
