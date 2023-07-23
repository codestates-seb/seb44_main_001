import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import { RootState } from '../store/RootStore';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { HiMiniXMark } from 'react-icons/hi2';
import { FaPersonRunning } from 'react-icons/fa6';
import Button from './Button';
import { resetStates } from '../../pages/Login/store/MyUserData';
import { BASE_URL } from '../../common/util/constantValue';

import logo from '../assets/logo/MOMO.png';
import singMomo from '../assets/logo/singMomo.svg';
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
      onError: () => {
        navigate('/login');
        localStorage.clear();
      },
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
        <Logo>
          <img src={logo} alt="로고이미지" style={{ height: '39px' }} />
          <HoverImage
            src={singMomo}
            alt="노래모모"
            style={{ height: '39px' }}
          />
        </Logo>
      </Link>
      {token ? (
        <MenuContainer>
          <UserContainer className="margin-left" onClick={handleMyProfile}>
            <img
              src={myData.profileImage ? `${myData.profileImage}` : profile}
              alt="프로필사진"
              className="icon user-content"
            />
            <div className="text" style={{ marginLeft: '5px' }}>
              {myData.nickname}
            </div>
          </UserContainer>
          <Button
            className="margin-left"
            children="모모리스트"
            onClick={() => {
              navigate('/lists');
            }}
          />
          <Button
            className="margin-left"
            onClick={handleWriteButtonClick}
            children={'모집 글 작성'}
          />
          <LogoutButton onClick={handleLogout}>
            <FaPersonRunning className="hoverIcon" size={25} />
            <LogOut className="originalIcon" size={25} />
          </LogoutButton>
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
const Logo = styled.div`
  position: relative;
  display: inline-block;
`;

const tadaAnimation = keyframes`
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  10% {
    transform: translateX(10px) translateY(-5px);
  }
  20% {
    transform: translateX(20px) translateY(5px);
  }
  30% {
    transform: translateX(30px) translateY(-5px);
  }
  40% {
    transform: translateX(40px) translateY(5px);
  }
  50% {
    transform: translateX(50px) translateY(-5px);
  }
  60% {
    transform: translateX(40px) translateY(5px);
  }
  70% {
    transform: translateX(30px) translateY(-5px);
  }
  80% {
    transform: translateX(20px) translateY(5px);
  }
  90% {
    transform: translateX(10px) translateY(-5px);
  }
`;

const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 100%;
  opacity: 0;
  ${Logo}:hover & {
    opacity: 1;
    animation: ${tadaAnimation} 1.5s ease-in-out;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
  padding: 0.5rem;
  img {
    object-fit: cover;
    border-radius: 50%;
  }
  &:hover {
    background-color: var(--color-pink-3);
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

export const ModalButtonContainer = styled.div`
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

export const ModalButton = styled(Button)`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  height: 50px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const KakaoBtn = styled(ModalButton)`
  background-color: #fef01b;

  &:hover {
    background-color: #ffdd34;
  }
  &:active {
    background-color: #f3cd12;
  }
`;

export const GoogleBtn = styled(ModalButton)`
  background-color: white;

  &:hover {
    background-color: #f2f7ff;
  }
  &:active {
    background-color: #d5e3ff;
  }
`;

const LogoutButton = styled.button`
  position: relative;
  margin-left: 2rem;
  margin-right: 1rem;
  * {
    position: absolute;
    top: -13px;
    right: -10px;
    transition: opacity 0.5s ease;
  }
  .hoverIcon {
    color: var(--color-pink-1);
    opacity: 0;
  }
  &:hover {
    .hoverIcon {
      opacity: 1;
    }
    .originalIcon {
      opacity: 0;
    }
  }
`;
