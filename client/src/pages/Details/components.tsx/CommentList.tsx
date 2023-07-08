import { styled } from 'styled-components';
import {
  BASE_URL,
  COMMENT,
  NEXT,
  PREV,
} from '../../../common/util/constantValue';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { UseQueryResult, useQuery } from 'react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComment } from '../api/getComment';
import { CommentListToGet } from '../../../common/type';

export default function CommentList() {
  const userInfo = { memberId: 31 };

  const [page, setPage] = useState(1);

  const { id } = useParams();

  const size = 5;

  const { data: response }: UseQueryResult<CommentListToGet, unknown> =
    useQuery(['comments', id, page, size], () =>
      getComment(`${BASE_URL}/comments/${id}?page=${page}&size=${size}`),
    );

  const { pageInfo, data } = response || {};

  const pageNumbers = pageInfo
    ? Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1)
    : [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <div>{COMMENT}</div>
      {data ? (
        <>
          {data.map((data) => {
            return (
              <ListSection key={data.commentId}>
                <div>
                  <div>
                    {data.isPostWriter
                      ? `${data.memberInfo.nickname} (작성자)`
                      : data.memberInfo.nickname}
                  </div>
                  <div>{data.createdAt}</div>
                </div>
                <div>
                  <div>{data.content}</div>
                  <div>
                    {userInfo.memberId === data.memberInfo.memberId && (
                      <AiFillEdit />
                    )}
                    {userInfo.memberId === data.memberInfo.memberId && (
                      <AiFillDelete />
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
              disabled={page === pageInfo?.totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              {NEXT}
            </button>
          </Pagination>
        </>
      ) : (
        <div>Loading...</div>
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
