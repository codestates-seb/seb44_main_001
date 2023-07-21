import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import { RootState } from '../store/RootStore';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { HiMiniXMark } from 'react-icons/hi2';
import Button from './Button';
import { resetStates } from '../../pages/Login/store/MyUserData';
import { BASE_URL } from '../../common/util/constantValue';

import logo from '../assets/logo/MOMO.png';
import profile from '../assets/profile.svg';

import kakao from '../../common/assets/logo/kakao-logo.png';
import google from '../../common/assets/logo/google-logo.png';

import { postLogout } from '../util/customHook/api/postLogout';
import { setChatModal } from '../store/ChatModalStore';
import { useMutation } from 'react-query';
Modal.setAppElement('#root');

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myData = useSelector((state: RootState) => state.myData);

  const token = localStorage.getItem('Authorization');
  const myId = localStorage.getItem('MemberId');

  const kakaoLink = `${BASE_URL}/oauth2/authorization/kakao`;
  const googleLink = `${BASE_URL}/oauth2/authorization/google`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutPostMutaion = useMutation(
    () => {
      return postLogout(`${BASE_URL}/auth/logout`);
    },
    {
      onSuccess: () => {
        dispatch(resetStates());
        navigate('/login');
        localStorage.clear();
        dispatch(setChatModal(false));
      },
      onError: () =>{
        navigate('/login');
        localStorage.clear();
      }
    },
  );

  const handleLogout = () => {
    logoutPostMutaion.mutate();
  };

  const handleMyProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/user/${myId}`, { state: myId });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleWriteButtonClick = () => {
    navigate('/write');
  };

  return (
    <Head>
      <Link to="/">
        <div>
          <img src={logo} alt="로고이미지" style={{ height: '39px' }} />
        </div>
      </Link>
      {token ? (
        <MenuContainer>
          <Link to="/lists" className="margin-small text">
            모모리스트
          </Link>
          <UserContainer onClick={handleMyProfile}>
            <img
              src={myData.profileImage ? `${myData.profileImage}` : profile}
              alt="프로필사진"
              className="margin-left icon user-content"
            />
            <div className="text" style={{ marginLeft: '5px' }}>
              {myData.nickname}
            </div>
          </UserContainer>
          <Button onClick={handleWriteButtonClick} children={'모집 글 작성'} />
          <div className="margin-left">
            <div onClick={handleLogout}>
              <LogOut size={20} />
            </div>
          </div>
        </MenuContainer>
      ) : (
        <div>
          <MenuContainer>
            <Link to="/login" className="text">
              <Button
                children={'로그인'}
                onClick={() => navigate('/login')}
              ></Button>
            </Link>
            <Button
              children={'회원가입'}
              onClick={handleModalOpen}
              style={{ marginLeft: '20px' }}
            />
          </MenuContainer>
          <ModalContainer
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
          >
            <Xmark onClick={handleModalClose}>X</Xmark>
            <ModalButtonContainer>
              <Link
                to="/signup"
                className="text margin-left"
                style={{ display: 'block', width: '100%' }}
              >
                <ModalButton onClick={handleModalClose}>
                  일반 회원으로 가입
                </ModalButton>
              </Link>
              <a href={kakaoLink} style={{ display: 'block', width: '100%' }}>
                <KakaoBtn>
                  <img
                    src={kakao}
                    style={{ height: '20px', marginRight: '5px' }}
                  />
                  카카오톡 회원으로 가입
                </KakaoBtn>
              </a>
              <a href={googleLink} style={{ display: 'block', width: '100%' }}>
                <GoogleBtn>
                  <img
                    src={google}
                    style={{ height: '20px', marginRight: '5px' }}
                  />
                  구글 회원으로 가입
                </GoogleBtn>
              </a>
            </ModalButtonContainer>
          </ModalContainer>
        </div>
      )}
    </Head>
  );
}

const Head = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: white;
  color: var(--color-black);

  .margin-small {
    margin: 10px 0 10px 10px;
  }

  .margin-left {
    margin-left: 20px;
  }

  .icon {
    width: 25px;
    height: 25px;
    align-items: center;
  }

  .text {
    color: var(--color-black);
  }

  .user-content {
    pointer-events: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.5rem;
  img {
    border-radius: 50%;
  }
`;

const LogOut = styled(FaArrowRightFromBracket)`
  color: var(--color-black);
  cursor: pointer;
`;

const ModalContainer = styled(Modal)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 50px;
  width: 500px;
  border: 2px solid var(--color-black);
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  overlay: {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 10px;
  width: 450px;
`;

const Xmark = styled(HiMiniXMark)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: var(--color-black);
  margin-bottom: 30px;
`;

const ModalButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const KakaoBtn = styled(ModalButton)`
  background-color: #ffe34e;

  &:hover {
    background-color: #ffe03d;
  }
  &:active {
    background-color: #f9d724;
  }
`;

const GoogleBtn = styled(ModalButton)`
  background-color: white;

  &:hover {
    background-color: #f2f7ff;
  }
  &:active {
    background-color: #d5e3ff;
  }
`;
