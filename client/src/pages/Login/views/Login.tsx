import { useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Layout } from '../../../common/style';
import SemiHeader from '../../../common/components/SemiHeader';
import { Background, Text, TextInput } from '../../Signup/views/Signup';
import { RootState } from '../../../common/store/RootStore';
import { LoginData } from '../../../common/type';
import loginData from '../api/postLogin';

import { setLoginUser } from '../store/LoginUser';
import { setTokenData } from '../store/userTokenStore';

import kakao from '../../../common/assets/logo/kakao-logo.png';
import Button from '../../../common/components/Button';

import { BASE_URL } from '../../../common/util/constantValue';
import MyData from '../api/getMydata';
import { setMyData } from '../store/MyUserData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const data: LoginData = useSelector((state: RootState) => state.login);
  const token: string = useSelector((state: RootState) => state.token.token);
  // const user: Member = useSelector((state: RootState) => state.member);

  const loginMutation = useMutation<void, unknown, LoginData>(
    async () => {
      const result = await loginData(`${BASE_URL}/auth/login`, data);
      console.log(result);
      localStorage.setItem('Authorization', result.token);
      localStorage.setItem('MemberId', result.memberId);
    },
    {
      onSuccess: async () => {
        const storedToken = localStorage.getItem('Authorization');
        const storedMemberId = localStorage.getItem('MemberId');
        console.log('storedToken: ', storedToken);
        console.log('storedMemberId: ', storedMemberId);

        if (!!storedToken && !!storedMemberId) {
          const memberId = parseInt(storedMemberId, 10);
          // fetchUser.mutate(memberId);
          dispatch(
            setTokenData({
              ...data,
              token: storedToken,
              memberId: memberId,
            }),
          );
        } else {
          // 토큰과 memberId 가져오기 실패
          dispatch(setTokenData({ ...data, token: '', memberId: 0 }));
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
      const userData = await MyData(`${BASE_URL}/members/${memberId}`, token);
      dispatch(setMyData(userData));
      console.log(`fetch User!!! : `, userData);
    },
  );

  const handleLogin = async () => {
    await loginMutation.mutate(data);
    const storedMemberId = localStorage.getItem('MemberId');
    if (storedMemberId) {
      const memberId = parseInt(storedMemberId, 10);
      await fetchUser.mutate(memberId, {
        onSuccess: () => {
          console.log('UserData fetched successfully');
        },
        onError: () => {
          console.log('An error occurred while fetching UserData');
        },
      });

      navigation(`/user/${memberId}`, { state: memberId });
    } else {
      alert(`로그인에 실패하였습니다! 다시 시도해주세요.`);
    }
  };

  return (
    <div>
      <SemiHeader title="로그인" content="모모에 오신것을 환영합니다!" />
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <KakaoBtn>
            <img src={kakao} style={{ height: '20px', marginRight: '5px' }} />
            카카오톡&nbsp;로그인
          </KakaoBtn>
          <Background style={{ marginTop: '20px', width: '30rem' }}>
            <ContentWrapper>
              <InputBox>
                <Text>이메일</Text>
                <TextInput
                  value={username}
                  style={{ width: '300px' }}
                  onChange={handleUsernameChange}
                  isValidate={true}
                />
              </InputBox>
              <InputBox>
                <Text>비밀번호</Text>
                <TextInput
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  isValidate={true}
                />
              </InputBox>
              <div style={{ padding: '10px' }}></div>
              <Button children={'로그인'} onClick={handleLogin} />
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
    </div>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  margin-left: 50px;
  margin-right: 50px;
`;

const KakaoBtn = styled.button`
  background-color: #ffe34e;
  display: flex;
  width: 30rem;
  align-items: center;
  justify-content: center;
  margin: 100px;
  margin-bottom: 0;
  border: solid 2px var(--color-black);
  border-radius: 10px;
  padding: 10px;
  font-family: 'BR-Regular';
  font-size: medium;

  &:hover {
    background-color: #ffe03d;
  }
  &:active {
    background-color: #f9d724;
  }
`;

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
