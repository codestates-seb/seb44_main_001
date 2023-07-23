import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { setChatInvitationModal } from '../store/ChatInvitationModal';
import { chatInvitationModalStyle } from '../chatInvitationModalStyle';
import { styled } from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import getUserNickname from '../api/getUserNickname';
import { BASE_URL } from '../../../util/constantValue';
import { ChangeEvent, useState } from 'react';
import profile from '../../../../common/assets/profile.svg';
import { Nickname } from '../../../type';
import postInvitation from '../api/postInvitation';

export default function ChatInvitationModal({ roomId }: { roomId: number }) {
  const [searchItem, setSearchItem] = useState('');

  const [nicknames, setNicknames] = useState<Nickname[] | []>([]);

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.chatInvitationModal);

  useQuery(
    ['nickname', searchItem],
    () => getUserNickname(`${BASE_URL}/members/search?nickname=${searchItem}`),
    {
      enabled: isOpen && searchItem.length !== 0,
      onSuccess: (data) => setNicknames(data),
    },
  );

  const inviteMutation = useMutation('invite', (memberId: number) =>
    postInvitation(`${BASE_URL}/rooms/invite`, {
      memberId: memberId,
      roomId: roomId,
    }),
  );

  const handleModalClose = () => {
    dispatch(setChatInvitationModal(false));
    setSearchItem('');
    setNicknames([]);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);

    if (event.target.value === '') {
      setNicknames([]);
    }
  };

  const handleInvite = (memberId: number) => {
    inviteMutation.mutate(memberId);
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
        maxLength={20}
      />
      <Nicknames>
        {nicknames &&
          nicknames.length !== 0 &&
          nicknames.map((nickname) => (
            <div
              key={nickname.memberId}
              onClick={() => handleInvite(nickname.memberId)}
            >
              <img
                src={nickname.profileImage ? nickname.profileImage : profile}
                alt={nickname.nickname}
              />
              <div>{nickname.nickname}</div>
            </div>
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
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: var(--color-black);
    cursor: pointer;
    width: fit-content;

    :hover {
      color: var(--color-pink-1);
    }

    > img {
      height: 2rem;
      margin-right: 0.5rem;
    }
  }
`;
