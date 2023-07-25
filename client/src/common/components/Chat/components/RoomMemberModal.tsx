import Modal from 'react-modal';
import { chatMemberModalStyle } from '../chatMemberModalStyle';
import { RoomMember } from '../../../type';
import profile from '../../../../common/assets/profile.svg';
import { styled } from 'styled-components';

export default function RoomMemberModal({
  roomMember,
  roomMemberMoalIsOpen,
  setRoomMemberModalIsOpen,
}: {
  roomMember: RoomMember[];
  roomMemberMoalIsOpen: boolean;
  setRoomMemberModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleModalClose = () => {
    setRoomMemberModalIsOpen(false);
  };
  return (
    <Modal
      isOpen={roomMemberMoalIsOpen}
      style={chatMemberModalStyle}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <RoomMembers>
        {roomMember &&
          roomMember.map((roomMember) => {
            return (
              <div key={roomMember.memberId}>
                <img
                  src={
                    roomMember.profileImage ? roomMember.profileImage : profile
                  }
                  alt={roomMember.nickname}
                />
                <div>{roomMember.nickname}</div>
              </div>
            );
          })}
      </RoomMembers>
    </Modal>
  );
}

const RoomMembers = styled.div`
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
      margin-right: 0.5rem;
    }
  }
`;
