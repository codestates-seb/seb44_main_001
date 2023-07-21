import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { setChatInvitationModal } from '../store/ChatInvitationModal';
import { chatInvitationModalStyle } from '../chatInvitationModalStyle';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import getUserNickname from '../api/getUserNickname';
import { BASE_URL } from '../../../util/constantValue';
import { ChangeEvent, useState } from 'react';

export default function ChatInvitationModal() {
  const [searchItem, setSearchItem] = useState('');

  const [nicknames, setNicknames] = useState([]);

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.chatInvitationModal);

  useQuery(
    ['nickname', searchItem],
    () => getUserNickname(`${BASE_URL}/???/${searchItem}`),
    {
      enabled: isOpen,
      onSuccess: (data) => setNicknames(data),
    },
  );

  const handleModalClose = () => {
    dispatch(setChatInvitationModal(false));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const handleInvite = (nickname: string) => {
    console.log(nickname);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={chatInvitationModalStyle}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <NicknameInput
        placeholder="초대하실 분의 닉네임을 입력해주세요!"
        onChange={handleInput}
      />
      <Nicknames>
        {nicknames &&
          nicknames.length !== 0 &&
          nicknames.map((nickname) => (
            <div onClick={() => handleInvite(nickname)}>{nickname}</div>
          ))}
      </Nicknames>
    </Modal>
  );
}

const NicknameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

const Nicknames = styled.div`
  > div {
    margin-bottom: 1rem;
    color: var(--color-black);
    cursor: pointer;
    width: fit-content;
  }
`;
