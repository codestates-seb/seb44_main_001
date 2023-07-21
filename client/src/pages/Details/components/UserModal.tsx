import Modal from 'react-modal';
import { articleModalStyle } from '../articleModalStyle';
import { Link } from 'react-router-dom';
import { ArticleToGet } from '../../../common/type';
import { useDispatch } from 'react-redux';
import { setChatModal } from '../../../common/store/ChatModalStore';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import postChatMembers from '../api/postChatMembers';
import {
  BASE_URL,
  INVITE,
  SEND_CHAT,
  VIEW_PROFILE,
} from '../../../common/util/constantValue';
import { setChatRoomInfo } from '../../../common/store/ChatRoomInfoStore';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function UserModal({
  isUserModalOpen,
  handleModalOpen,
  handleModalClose,
  data,
}: {
  isUserModalOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  data?: ArticleToGet;
}) {
  const dispatch = useDispatch();

  const myId: number | null = Number(localStorage.getItem('MemberId'));

  const memberId = data?.memberInfo.memberId;

  const nickname = data?.memberInfo.nickname;

  const client = new StompJs.Client({
    brokerURL:
      'ws://ec2-3-34-45-1.ap-northeast-2.compute.amazonaws.com:8080/stomp/chat',
  });

  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = function () {
      return new SockJS(`${BASE_URL}/stomp/chat`) as StompJs.IStompSocket;
    };
  }

  const postPseronalChatMutation = useMutation(
    'ChatMembers',
    (chatType: string) =>
      postChatMembers(`${BASE_URL}/rooms/register`, {
        memberId: memberId as number,
        roomType: chatType === 'personal' ? 'PERSONAL' : 'GROUP',
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        dispatch(setChatRoomInfo({ roomId: data, roomName: nickname }));
        dispatch(setChatModal(true));
      },
    },
  );

  const handleOpenChat = (chatType: string) => {
    if (myId !== memberId) {
      postPseronalChatMutation.mutate(chatType);
    }
  };

  return (
    <div onMouseOver={handleModalOpen} onMouseOut={handleModalClose}>
      <Modal
        isOpen={isUserModalOpen}
        style={articleModalStyle}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
      >
        <TabSection>
          <Link to={`/user/${data?.memberInfo.memberId}`}>{VIEW_PROFILE}</Link>
          <div onClick={() => handleOpenChat('personal')}>{SEND_CHAT}</div>
          <div onClick={() => handleOpenChat('group')}>{INVITE}</div>
        </TabSection>
      </Modal>
    </div>
  );
}

const TabSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

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
