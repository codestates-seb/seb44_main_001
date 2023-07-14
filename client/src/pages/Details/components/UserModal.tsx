import Modal from 'react-modal';
import { modalStyle } from '../modalStyle';
import { Link } from 'react-router-dom';
import { ArticleToGet } from '../../../common/type';
import { useDispatch } from 'react-redux';
import { setChatModal } from '../../../common/store/ChatModalStore';

export default function UserModal({
  isUserModalOpen,
  handleModalChange,
  data,
}: {
  isUserModalOpen: boolean;
  handleModalChange: () => void;
  data?: ArticleToGet;
}) {
  const dispatch = useDispatch();

  const handleOpenChat = () => {
    dispatch(setChatModal(true));
    //TODO 새로운 채팅방 생성하면서 이동하는 로직 추가해야함 room/id
  };

  return (
    <Modal
      isOpen={isUserModalOpen}
      style={modalStyle}
      onRequestClose={handleModalChange}
      ariaHideApp={false}
    >
      <Link to={`/user/${data?.memberInfo.memberId}`}>프로필 보기</Link>
      <div onClick={handleOpenChat}>채팅 보내기</div>
    </Modal>
  );
}
