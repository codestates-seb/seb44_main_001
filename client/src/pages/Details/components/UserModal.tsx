import Modal from 'react-modal';
import { userModalStyle } from '../userModalStyle';
import { Link } from 'react-router-dom';
import { ArticleToGet, CommentToGet } from '../../../common/type';
import { useDispatch } from 'react-redux';
import { setChatModal } from '../../../common/store/ChatModalStore';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import {
  BASE_URL,
  SEND_CHAT,
  VIEW_PROFILE,
} from '../../../common/util/constantValue';
import { setChatRoomInfo } from '../../../common/store/ChatRoomInfoStore';
import { postData } from '../../../common/apis';
import useMyInfo from '../../../common/util/customHook/useMyInfo';

export default function UserModal({
  isUserModalOpen,
  handleModalClose,
  data,
}: {
  isUserModalOpen: boolean;
  handleModalClose: () => void;
  data?: ArticleToGet | CommentToGet;
}) {
  const dispatch = useDispatch();

  const { myData } = useMyInfo();

  const myId = myData?.memberId;

  const memberId = data?.memberInfo.memberId;

  const nickname = data?.memberInfo.nickname;

  const postPseronalChatMutation = useMutation(
    'ChatMembers',
    () =>
      postData(`${BASE_URL}/rooms/register`, {
        memberId: memberId as number,
        roomName: nickname as string,
        roomType: 'PERSONAL',
      }),
    {
      onSuccess: (data) => {
        dispatch(
          setChatRoomInfo({
            roomId: data,
            roomName: nickname,
            roomType: 'PERSONAL',
          }),
        );
        dispatch(setChatModal(true));
      },
    },
  );

  const handleOpenChat = () => {
    if (myId !== memberId) {
      postPseronalChatMutation.mutate();
    }
  };

  const isArticleToGet = (
    data: ArticleToGet | CommentToGet,
  ): data is ArticleToGet => {
    return (data as ArticleToGet).postId !== undefined;
  };

  return (
    <Modal
      isOpen={isUserModalOpen}
      style={userModalStyle}
      onRequestClose={handleModalClose}
      ariaHideApp={true}
      parentSelector={() => {
        if (data && isArticleToGet(data)) {
          return document.querySelector('#articleModalParent') as HTMLElement;
        }
        return document.querySelector(
          `#commentModalParent${data?.commentId}`,
        ) as HTMLElement;
      }}
    >
      <TabSection>
        <Link to={`/user/${data?.memberInfo.memberId}`}>{VIEW_PROFILE}</Link>
        <div onClick={handleOpenChat}>{SEND_CHAT}</div>
      </TabSection>
    </Modal>
  );
}

const TabSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  :hover {
    color: var(--color-pink-1);
  }

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
    color: var(--color-black);
    cursor: pointer;
    border-bottom: 1px solid var(--color-black);
  }

  > :last-child {
    border-bottom: none;
  }
`;
