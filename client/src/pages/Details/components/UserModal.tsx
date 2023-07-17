import Modal from 'react-modal';
import { modalStyle } from '../modalStyle';
import { Link } from 'react-router-dom';
import { ArticleToGet } from '../../../common/type';
import { useDispatch } from 'react-redux';
import { setChatModal } from '../../../common/store/ChatModalStore';
import { styled } from 'styled-components';

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

  const handleOpenChat = () => {
    dispatch(setChatModal(true));
    //TODO 새로운 채팅방 생성하면서 이동하는 로직 추가해야함 room/id
  };

  return (
    <div onMouseOver={handleModalOpen} onMouseOut={handleModalClose}>
      <Modal
        isOpen={isUserModalOpen}
        style={modalStyle}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
      >
        <TabSection>
          <Link to={`/user/${data?.memberInfo.memberId}`}>프로필 보기</Link>
          <div onClick={handleOpenChat}>채팅 보내기</div>
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
  }

  > :first-child {
    border-bottom: 1px solid var(--color-black);
  }
`;
