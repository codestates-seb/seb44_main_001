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
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CommentListToGet,
  CommentToGet,
  CommentToPost,
} from '../../../common/type';
import { setTotalComments } from '../../../common/store/CommentPageStore';
import { useDispatch, useSelector } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';
import Button from '../../../common/components/Button';
import { calculateTimeDifference } from '../../../common/util/timeDifferenceCalculator';
import profile from '../../../common/assets/profile.svg';
import UserModal from './UserModal';
import { RootState } from '../../../common/store/RootStore';
import { deleteData, getData, patchData } from '../../../common/apis';

export default function CommentList() {
  const queryClient = useQueryClient();

  const [commentId, setCommentId] = useState(0);

  const [editingCommentId, setEditingCommentId] = useState(0);

  const [currentModal, setCurrentModal] = useState(0);

  const memberId = useSelector((state: RootState) => state.myData.memberId);

  const token = localStorage.getItem('Authorization');

  const [editedComment, setEditedComment] = useState({
    memberId: memberId,
    content: '',
  });

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { id } = useParams();

  const size = 5;

  const {
    data: response,
    isLoading,
  }: UseQueryResult<CommentListToGet, unknown> = useQuery(
    ['comments', id, page, size],
    () => getData(`${BASE_URL}/comments/${id}?page=${page}&size=${size}`),
    {
      onSuccess: (response) => {
        dispatch(setTotalComments(response.pageInfo.totalElements));
      },
    },
  );

  const patchItemMutation = useMutation<void, unknown, CommentToPost>(
    () => patchData(`${BASE_URL}/comments/${commentId}`, editedComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
        setEditingCommentId(0);
      },
    },
  );

  const deleteItemMutation = useMutation<void, unknown, void>(
    () => deleteData(`${BASE_URL}/comments/${commentId}/${memberId}`),
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
      setPage(1);
    }
  };

  const handleEditButtonClick = (data: CommentToGet) => {
    setEditingCommentId(data.commentId);
    setEditedComment({
      memberId: memberId,
      content: data.content,
    });
    setCommentId(data.commentId);
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment({ ...editedComment, content: event.target.value });
  };

  const handlePatchEdit = () => {
    if (editedComment.content.length) {
      patchItemMutation.mutate(editedComment);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(0);
  };

  const handleModalOpen = (commentId: number) => {
    if (token) {
      setCurrentModal(commentId);
    }
  };

  const handleModalClose = () => {
    setCurrentModal(0);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <div>{COMMENT}</div>
      {data?.length !== 0 ? (
        <>
          {data?.map((data) => {
            const isEditing = editingCommentId === data.commentId;
            return (
              <ListSection key={data.commentId}>
                {memberId === data.memberInfo.memberId && isEditing ? (
                  <CommentEdit>
                    <textarea
                      value={editedComment.content}
                      onChange={handleInputChange}
                    />
                    <div className="editButton">
                      <Button onClick={handlePatchEdit}>저장</Button>
                      <Button onClick={handleCancelEdit}>취소</Button>
                    </div>
                  </CommentEdit>
                ) : (
                  <>
                    <CommentInfo>
                      <div
                        onMouseOver={() => handleModalOpen(data.commentId)}
                        onMouseOut={handleModalClose}
                      >
                        <ModalWrapper
                          onMouseOver={() => handleModalOpen(data.commentId)}
                          onMouseOut={handleModalClose}
                          id={`commentModalParent${data.commentId}`}
                        >
                          <UserModal
                            isUserModalOpen={currentModal === data.commentId}
                            handleModalClose={handleModalClose}
                            data={data}
                          />
                        </ModalWrapper>
                        <div>
                          <img
                            src={
                              data.memberInfo.image
                                ? data.memberInfo.image
                                : profile
                            }
                            alt="userProfile"
                          />
                          <div>
                            {data.isPostWriter
                              ? `${data.memberInfo.nickname} (작성자)`
                              : data.memberInfo.nickname}
                          </div>
                        </div>
                      </div>
                      {data.editedAt === data.createdAt ? (
                        <div>{calculateTimeDifference(data.createdAt)}</div>
                      ) : (
                        <div>{`${calculateTimeDifference(
                          data.editedAt,
                        )} (수정됨)`}</div>
                      )}
                    </CommentInfo>
                    <CommentContent>
                      <div>{data.content}</div>
                      <CommentEditIcons>
                        {memberId === data.memberInfo.memberId && (
                          <MdModeEditOutline
                            onClick={() => handleEditButtonClick(data)}
                          />
                        )}
                        {memberId === data.memberInfo.memberId && (
                          <AiFillDelete
                            onMouseOver={() => handleMouseOver(data.commentId)}
                            onClick={handleDeleteComment}
                          />
                        )}
                      </CommentEditIcons>
                    </CommentContent>
                  </>
                )}
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
  margin-bottom: 5rem;

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
  line-height: 1.5;
  width: 50rem;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  > :first-child {
    display: flex;
    align-items: center;
    > :nth-child(2) {
      display: flex;
      align-items: center;

      > img {
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        margin-right: 0.5rem;
        cursor: pointer;
        object-fit: cover;
      }

      & :hover {
        color: var(--color-pink-1);
      }

      > :nth-child(2) {
        font-family: 'BR-Bold';
        font-size: var(--font-size-xs);
        cursor: pointer;
      }
    }
  }

  > :nth-child(3) {
    font-size: var(--font-size-xs);
  }
`;

const ModalWrapper = styled.div`
  position: relative;
`;

const CommentContent = styled.div`
  display: flex;
  justify-content: space-between;

  > :first-child {
    width: 90%;
    display: flex;
    justify-content: start;
    text-align: start;
  }
`;

const CommentEditIcons = styled.div`
  :hover {
    color: var(--color-pink-1);
  }
  > * {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

const CommentEdit = styled.div`
  > textarea {
    margin-bottom: 1rem;
    font-family: 'BR-regular';
    font-size: var(--font-size-s);
    width: 100%;
    border: 2px solid var(--color-black);
    border-radius: 5px;
    padding: 0.5rem;
    min-height: 5rem;
    resize: vertical;
    outline: none;
    line-height: 1.5;
    color: var(--color-black);
  }

  > .editButton {
    display: flex !important;
    justify-content: end !important;

    > :last-child {
      margin-left: 0.5rem;
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
