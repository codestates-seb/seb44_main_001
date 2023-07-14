import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FaArrowRightFromBracket } from 'react-icons/fa6';
import AlramModal from './Alram/views/AlramModal';
import Button from './Button';

import logo from '../assets/logo/MOMO.png';
import profile from '../assets/profile.svg';

export default function Header(){
  const [isLogged, setIsLogged] = useState<boolean>(true);
  
  return (
    <Head>
      <Link to="/">
        <div>
          <img src={logo} alt="로고이미지" style={{height:"39px"}}/>
        </div>
      </Link>
      {isLogged ? (
                <MenuContainer>
                    <Link to="/lists" className="margin-small text">모모리스트</Link>
                    <Link to="/user">
                      <UserContainer>
                        <img 
                          src={profile} 
                          alt="프로필사진" 
                          className="margin-left icon"/>
                        <div className="text" style={{marginLeft:"5px"}}>유저닉네임</div>
                      </UserContainer>
                    </Link>
                    <div className="margin-left" style={{marginTop:"2px"}}>
                      <AlramModal/>
                    </div>
                    <div className="margin-left">
                      <Link
                        to="/" 
                        onClick={() => setIsLogged(false)}>
                        <LogOut size={20}/>
                      </Link>
                    </div>
                </MenuContainer>
            ) : (
                <MenuContainer>
                    <Link to="/login" className="text">
                      <Button children={"로그인"}></Button>
                    </Link>
                    <Link to="/signup" className="text margin-left">
                      <Button children={"회원가입"}></Button>
                    </Link>
                </MenuContainer>
            )}
    </Head>
  )
}

const Head = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: white;
  color: var(--color-black);

  .margin-small {
    margin: 10px;
  }

  .margin-left {
    margin-left: 10px;
  }

  .icon {
    width:25px;
    height:25px;
    align-items: center;
  }
  
  .text {
    color: var(--color-black);
  }
`

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogOut = styled(FaArrowRightFromBracket)`
  color: var(--color-black);
`

