import { useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Layout } from '../../../common/style';
import SemiHeader from '../../../common/components/SemiHeader';
import { Background, Text, TextInput } from '../../Signup/views/Signup';
import { RootState } from '../../../common/store/RootStore';
import { LoginData, TokenType } from '../../../common/type';
import loginData from '../api/postLogin';
import { AxiosError } from 'axios';
import { setLoginUser } from '../store/LoginUser';
import { setTokenData } from '../store/userTokenStore';

import kakao from '../../../common/assets/logo/kakao-logo.png';
import google from '../../../common/assets/logo/google-logo.png';
import Button from '../../../common/components/Button';

import { BASE_URL } from '../../../common/util/constantValue';
import MyData from '../api/getMyData';
import { setMyData } from '../store/MyUserData';
import { GoogleBtn, KakaoBtn } from '../../../common/components/Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const kakaoLink = `${BASE_URL}/oauth2/authorization/kakao`;
  const googleLink = `${BASE_URL}/oauth2/authorization/google`;

  const data: LoginData = useSelector((state: RootState) => state.login);

  const loginMutation = useMutation<TokenType, AxiosError, LoginData>(
    () => {
      return loginData(`${BASE_URL}/auth/login`, data);
    },
    {
      onSuccess: (result: TokenType) => {
        localStorage.setItem('Authorization', result.accessToken);
        localStorage.setItem('RefreshToken', result.refreshToken);
        localStorage.setItem('MemberId', result.memberId);

        const storedToken = localStorage.getItem('Authorization');
        const storedMemberId = Number(result.memberId);

        if (!!storedToken && !!storedMemberId) {
          const memberId = storedMemberId;
          dispatch(
            setTokenData({
              token: storedToken,
              memberId: memberId,
            }),
          );
          console.log('dddd', memberId);
          fetchUser.mutate(memberId, {
            // 이 부분을 추가하세요.
            onError: () => {
              console.log('An error occurred while fetching UserData');
            },
          });

          navigation('/lists');
        } else {
          // 토큰과 memberId 가져오기 실패
          dispatch(setTokenData({ token: '', memberId: 0 }));
        }
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          alert('아이디 또는 비밀번호를 확인해주세요');
        } else {
          alert('서버연결중 에러가 발생했습니다.');
        }
      },
    },
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    dispatch(setLoginUser({ ...data, username: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(setLoginUser({ ...data, password: e.target.value }));
  };

  const fetchUser = useMutation<void, unknown, number>(
    async (memberId: number) => {
      // 요청 url /members/userInfo 로 바뀔예정
      const userData = await MyData(`${BASE_URL}/members/${memberId}`);
      console.log(userData);
      dispatch(setMyData(userData));
    },
  );

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginMutation.mutate(data);
  };

  return (
    <main>
      <SemiHeader title="로그인" content="모모에 오신것을 환영합니다!" />
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <a href={kakaoLink} style={{ display: 'block', width: '30rem' }}>
            <KakaoBtn>
              <img src={kakao} style={{ height: '20px', marginRight: '5px' }} />
              카카오톡&nbsp;로그인
            </KakaoBtn>
          </a>
          <a href={googleLink} style={{ display: 'block', width: '30rem' }}>
            <GoogleBtn>
              <img
                src={google}
                style={{ height: '20px', marginRight: '5px' }}
              />
              구글&nbsp;로그인
            </GoogleBtn>
          </a>
          <Background style={{ marginTop: '20px', width: '30rem' }}>
            <ContentWrapper onSubmit={handleLogin}>
              <InputBox>
                <Text>이메일</Text>
                <TextInput
                  value={username}
                  style={{ width: '300px' }}
                  onChange={handleUsernameChange}
                  $isValidate={true}
                  type="text"
                />
              </InputBox>
              <InputBox>
                <Text>비밀번호</Text>
                <TextInput
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  $isValidate={true}
                  autoComplete="current-password"
                />
              </InputBox>
              <div style={{ padding: '10px' }}></div>
              <Button children={'로그인'} type="submit" />
              <div
                style={{
                  display: 'flex',
                  marginTop: '40px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontSize: 'small' }}>
                  아직 모모의 회원이 아니신가요?
                </div>
                <Link to="/signup">
                  <BlueLink>지금 가입하기</BlueLink>
                </Link>
              </div>
            </ContentWrapper>
          </Background>
        </div>
      </Layout>
    </main>
  );
}

const ContentWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  margin-left: 50px;
  margin-right: 50px;
`;

// const KakaoBtn = styled.button`
//   background-color: #ffe34e;
//   display: flex;
//   width: 30rem;
//   align-items: center;
//   justify-content: center;
//   margin: 100px;
//   margin-bottom: 0;
//   border: solid 2px var(--color-black);
//   border-radius: 10px;
//   padding: 10px;
//   font-family: 'BR-Regular';
//   font-size: medium;

//   &:hover {
//     background-color: #ffe03d;
//   }
//   &:active {
//     background-color: #f9d724;
//   }
// `;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
`;

const BlueLink = styled.div`
  color: #0075ff;
  font-size: small;
  margin-left: 5px;
`;
