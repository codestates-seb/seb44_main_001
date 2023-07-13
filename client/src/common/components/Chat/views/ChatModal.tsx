import { AiFillWechat } from 'react-icons/ai';
import { keyframes, styled } from 'styled-components';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { modalStyle } from '../ModalStyle';
import ChatMain from '../components/ChatMain';
import ChatRoom from '../components/ChatRoom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import * as StompJs from '@stomp/stompjs';
import { UseQueryResult, useQuery } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import getRoomList from '../api/getRoomList';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const chatPage = useSelector((state: RootState) => state.chatPage);

  const { data: chatRoomList }: UseQueryResult<[]> = useQuery('roomList', () =>
    getRoomList(`${BASE_URL}/chat/roomlist`),
  );

  const client = new StompJs.Client({
    brokerURL: '',
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    debug: function (err) {
      console.log(err);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = function (frame) {
    console.log(frame);
  };

  client.onStompError = function (frame) {
    console.log(frame);
  };

  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen === true) {
      client.activate();
    }
    if (isOpen === false) {
      client.deactivate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Container>
      <button onClick={handleModalChange}>
        <AiFillWechat size={48} color={'var(--color-white)'} />
      </button>
      <Modal
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={handleModalChange}
        ariaHideApp={false}
      >
        {chatPage === 0 && (
          <ChatMain
            handleModalChange={handleModalChange}
            chatRoomList={chatRoomList}
          />
        )}
        <ChatRoom chatPage={chatPage} />
      </Modal>
    </Container>
  );
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.section`
  position: fixed;
  bottom: 3rem;
  right: 3rem;

  > button {
    border: none;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    cursor: pointer;
    background: var(--color-pink-1);

    > svg {
      animation: ${pulseAnimation} 1s ease-in-out infinite;
      border-radius: 50%;
    }
  }
  :active {
    background: var(--color-pink-2);
  }
`;
