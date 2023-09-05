import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/RootStore';
import { setChatInvitationModal } from '../store/ChatInvitationModal';
import { chatInvitationModalStyle } from '../chatInvitationModalStyle';
import { styled } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../util/constantValue';
import { ChangeEvent, useState } from 'react';
import profile from '../../../../common/assets/profile.svg';
import { Nickname, RoomMember } from '../../../type';
import Button from '../../Button';
import { getData, postData } from '../../../apis';

export default function ChatInvitationModal({
  roomId,
  roomMember,
}: {
  roomId: number;
  roomMember: RoomMember[];
}) {
  const [searchItem, setSearchItem] = useState('');

  const [nicknames, setNicknames] = useState<Nickname[] | []>([]);

  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.chatInvitationModal);

  const queryClient = useQueryClient();

  useQuery(
    ['nickname', searchItem],
    () => getData(`${BASE_URL}/members/search?nickname=${searchItem}`),
    {
      enabled: isOpen && searchItem.length !== 0,
      onSuccess: (data) => {
        setNicknames(data);
        queryClient.invalidateQueries('roomMember');
        console.log(data);
      },
    },
  );

  const inviteMutation = useMutation('invite', (memberId: number) =>
    postData(`${BASE_URL}/rooms/invite`, {
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

  const handleInvite = async (nickname: Nickname) => {
    const isInvited = roomMember.some(
      (member) => member.nickname === nickname.nickname,
    );
    if (!isInvited) {
      const confirmed = confirm(`${nickname.nickname}님을 초대하시겠습니까?`);
      if (confirmed) {
        inviteMutation.mutate(nickname.memberId);
      }
    } else {
      alert('이미 초대된 유저입니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={chatInvitationModalStyle}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <div>
        <NicknameInput
          placeholder="초대하실 분의 닉네임을 입력해주세요!"
          onChange={handleInput}
          maxLength={20}
        />
        <Nicknames>
          <div>
            {nicknames &&
              nicknames.length !== 0 &&
              nicknames.map((nickname) => (
                <div
                  key={nickname.memberId}
                  onClick={() => handleInvite(nickname)}
                >
                  <img
                    src={nickname.image ? nickname.image : profile}
                    alt={nickname.nickname}
                  />
                  <div>{nickname.nickname}</div>
                </div>
              ))}
          </div>
          <div>
            <Button onClick={handleModalClose}>초대 완료</Button>
          </div>
        </Nicknames>
      </div>
    </Modal>
  );
}

const NicknameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

const Nicknames = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    height: 22rem;

    > div {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      color: var(--color-black);
      cursor: pointer;
      width: fit-content;
      overflow: auto;

      :hover {
        color: var(--color-pink-1);
      }

      > img {
        height: 2rem;
        width: 2rem;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
    }
  }

  > :last-child {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;
