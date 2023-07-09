import { styled } from 'styled-components';
import {
  BASE_URL,
  COMMENT,
  NEXT,
  PREV,
} from '../../../common/util/constantValue';
import { AiFillDelete } from 'react-icons/ai';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComment } from '../api/getComment';
import { CommentListToGet } from '../../../common/type';
import { setTotalComments } from '../../../common/store/CommentPageStore';
import { useDispatch } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';
import deleteComment from '../api/deleteComment';

export default function CommentList() {
  const queryClient = useQueryClient();

  const [commentId, setCommentId] = useState(0);

  const dispatch = useDispatch();

  const userInfo = { memberId: 1 };

  const [page, setPage] = useState(1);

  const { id } = useParams();

  const size = 5;

  const {
    data: response,
    isLoading,
  }: UseQueryResult<CommentListToGet, unknown> = useQuery(
    ['comments', id, page, size],
    () => getComment(`${BASE_URL}/comments/${id}?page=${page}&size=${size}`),
    {
      onSuccess: (response) => {
        dispatch(setTotalComments(response.pageInfo.totalElements));
      },
    },
  );

  const deleteItemMutation = useMutation<void, unknown, void>(
    () =>
      deleteComment(`${BASE_URL}/comments/${commentId}/${userInfo.memberId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
    },
  );

  const { pageInfo, data } = response || {};

  const pageNumbers = pageInfo
    ? Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1)
    : [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleMouseOver = (commentId: number) => {
    setCommentId(commentId);
  };

  const handleDeleteComment = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteItemMutation.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <div>{COMMENT}</div>
      {data?.length !== 0 ? (
        <>
          {data?.map((data) => {
            return (
              <ListSection key={data.commentId}>
                <div>
                  <div>
                    {data.isPostWriter
                      ? `${data.memberInfo.nickname} (작성자)`
                      : data.memberInfo.nickname}
                  </div>
                  <div>{data.createdAt.slice(0, 10)}</div>
                </div>
                <div>
                  <div>{data.content}</div>
                  <div>
                    {userInfo.memberId === data.memberInfo.memberId && (
                      <MdModeEditOutline />
                    )}
                    {userInfo.memberId === data.memberInfo.memberId && (
                      <AiFillDelete
                        onMouseOver={() => handleMouseOver(data.commentId)}
                        onClick={handleDeleteComment}
                      />
                    )}
                  </div>
                </div>
              </ListSection>
            );
          })}
          <Pagination>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              {PREV}
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                disabled={page === pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              disabled={
                page === pageInfo?.totalPages || pageInfo?.totalPages === 0
              }
              onClick={() => handlePageChange(page + 1)}
            >
              {NEXT}
            </button>
          </Pagination>
        </>
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </Container>
  );
}

const Container = styled.section`
  color: var(--color-black);
  margin-bottom: 2rem;

  > :first-child {
    margin-bottom: 1rem;
    font-family: 'BR-Bold';
  }

  > :nth-child(2) {
    text-align: center;
  }
`;

const ListSection = styled.section`
  border: 2px solid var(--color-black);
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  background: var(--color-white);

  > :first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    > :nth-child(2) {
      font-size: var(--font-size-xs);
    }
  }

  > :nth-child(2) {
    display: flex;
    justify-content: space-between;

    > :nth-child(2) {
      > * {
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
  }
`;

const Pagination = styled.section`
  display: flex;
  justify-content: center;

  & button {
    cursor: pointer;
    margin: 0 0.3rem 0 0.3rem;
    padding: 0.3rem;
    border-radius: 5px;
    border: 2px solid var(--color-black);
    background: var(--color-pink-1);
    color: var(--color-black);

    &:disabled {
      cursor: default;
      color: var(--color-gray);
      background: var(--color-pink-2) !important;
      border: 2px solid var(--color-gray);
    }

    &:hover {
      background-color: var(--color-pink-2);
    }

    &:active {
      background-color: var(--color-pink-3);
    }
  }
`;
