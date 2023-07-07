import { styled } from 'styled-components';
import { COMMENT, NEXT, PREV } from '../../../common/util/constantValue';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComment } from '../api/getComment';

export default function CommentList() {
  const userInfo = { memberId: 1 };

  const [page, setPage] = useState(1);

  const { id } = useParams();

  const size = 1;
  //! 나중에 5로 수정해야함

  const response = {
    pageInfo: {
      page: 1,
      size: 1,
      totalElements: 4,
      totalPages: 5,
    },
    data: [
      {
        commentId: 1,
        content: '나는 내용',
        isPostWriter: true,
        createdAt: '나는 날짜',
        editedAt: '나는 수정 날짜',
        memberInfo: {
          memberId: 1,
          nickname: '무갑',
          image: '',
        },
      },
      {
        commentId: 2,
        content: '나는 내용',
        isPostWriter: true,
        createdAt: '나는 날짜',
        editedAt: '',
        memberInfo: {
          memberId: 2,
          nickname: '나는 무갑',
          image: '',
        },
      },
    ],
  };

  // const response = useQuery(['comments', id, page, size], () => getComment(`${BASE_URL}/comments/${id}?page=${page}&size=${size}`))

  const { pageInfo, data } = response;

  const pageNumbers = Array.from(
    { length: pageInfo.totalPages },
    (_, index) => index + 1,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <div>{COMMENT}</div>
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
          disabled={page === pageInfo.totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          {NEXT}
        </button>
      </Pagination>
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
