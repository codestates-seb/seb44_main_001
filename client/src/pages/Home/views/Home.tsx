import { Link } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';

import logo from '../../../common/assets/logo/grayLogo.png';
import couple from '../../../common/assets/logo/coupleMomo.svg';
import recruit from '../../../common/assets/logo/recruitMomo.svg';
import sing from '../../../common/assets/logo/singMomo.svg';
import bingle from '../../../common/assets/logo/bingleMomo.svg';
import pinkWave from '../../../common/assets/images/pinkWave.svg';
import pinkWave2 from '../../../common/assets/images/pinkWave2.svg';
import category from '../../../common/assets/images/categoryImg.png';
export default function Home() {
  return (
    <Wrapper>
      <Page1>
        <TextContainer>
          <TextBox>
            <h1 style={{ margin: '10px' }}>🔊&nbsp;모모할 친구 구해요~!</h1>
            <h3 style={{ marginBottom: '20px' }}>
              모모 커뮤니티에서 원하는 사람을 모집해보아요.
            </h3>
            <LinkContainer>
              <TextStyle>아직 가입하지 않으셨다면?&nbsp;👉</TextStyle>
              <Link to="/signup">
                <LinkStyle>가입하기</LinkStyle>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <TextStyle>이미 모모의 회원이세요?&nbsp;👉</TextStyle>
              <Link to="/login">
                <LinkStyle>로그인하기</LinkStyle>
              </Link>
            </LinkContainer>
          </TextBox>
          <Tail />
        </TextContainer>
        <div style={{ minWidth: '500px' }}>
          <LogoContainer>
            <img src={logo} style={{ height: '130px' }} />
            <h3>모두를 위한 모임, 모모</h3>
            <div style={{ height: '100px' }}></div>
            <ImgContainer>
              <Couple src={couple} />
              <Recruit src={recruit} />
              <Sing src={sing} />
              <Bingle src={bingle} />
            </ImgContainer>
          </LogoContainer>
        </div>
      </Page1>
      <img src={pinkWave} style={{ width: '100%' }} />
      <Page2>
        <Page2TextBox>
          <h1 style={{ margin: '10px' }}>당신이 원하는 모든 활동,</h1>
          <h1>모모에서 만나 함께해봐요!</h1>
          <h3 style={{ marginBottom: '20px', marginTop: '10px' }}>
            다양한 카테고리를 통해 내가 원하는 사람들을 모집할 수 있어요.
          </h3>
        </Page2TextBox>
        <img src={category} style={{ width: '600px', borderRadius: '30px' }} />
      </Page2>
      <img src={pinkWave2} style={{ width: '100%' }} />
      <Page3>
        <img
          src={category}
          style={{ width: '600px', borderRadius: '30px', marginRight: '30px' }}
        />
        <Page2TextBox>
          <h1 style={{ margin: '10px' }}>함께할 사람을 찾아 친분을 다져요.</h1>
          <h3 style={{ marginBottom: '20px', marginTop: '10px' }}>
            1:1 채팅 기능을 통해 원하는 사람에게 쉽게 연락할 수 있어요.
          </h3>
        </Page2TextBox>
      </Page3>
    </Wrapper>
  );
}

const floatAnimation1 = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
`;

const floatAnimation2 = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
`;

const Page1 = styled(Wrapper)`
  margin-top: 50px;
  flex-direction: row;
  padding: 50px;
`;

const Page2 = styled(Wrapper)`
  flex-direction: row;
  background-color: #ffdce1;
  width: 100%;
`;

const Page3 = styled(Wrapper)`
  width: 100%;
  margin-bottom: 200px;
  flex-direction: row;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  animation: ${floatAnimation2} 2s ease-in-out infinite alternate;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  color: var(--color-black);
  font-family: 'BR-Bold';
  min-width: 500px;
  height: 300px;
  padding: 50px;
`;

const Tail = styled.div`
  width: 0;
  height: 0;
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  border-left: 20px solid white;
  border-right: 20px solid transparent;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const LinkStyle = styled.a`
  font-size: large;
  color: #0075ff;
  margin-left: 20px;
  text-decoration-line: underline;

  &:link {
    color: #0075ff;
  }

  &:hover {
    color: #3492ff;
  }
`;

const TextStyle = styled.div`
  font-size: large;
  font-weight: 800;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${floatAnimation1} 2s ease-in-out infinite alternate;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const Momo = styled.img`
  height: 90px;
  position: absolute;
`;

const Couple = styled(Momo)`
  height: 80px;
  top: 0;
  left: -180px;
  animation: ${floatAnimation2} 1s ease-in-out infinite alternate;
`;

const Recruit = styled(Momo)`
  height: 100px;
  top: -50px;
  left: 150px;
  animation: ${floatAnimation2} 1s ease-in-out infinite alternate;
`;

const Sing = styled(Momo)`
  top: -90px;
  left: -250px;
  animation: ${floatAnimation1} 1s ease-in-out infinite alternate;
`;

const Bingle = styled(Momo)`
  top: -90px;
  left: 0px;
  animation: ${floatAnimation1} 1s ease-in-out infinite alternate;
`;

const Page2TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-right: 50px;
`;
