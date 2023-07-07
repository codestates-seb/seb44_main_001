import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

import { Layout } from "../../../common/style";
import SemiHeader from "../../../common/components/SemiHeader";
import { Background, Text, TextInput,  } from "../../Signup/views/Signup";
import { RootState } from "../../../common/store/RootStore";
import { LoginData } from "../../../common/type";
import loginData from "../api/postLogin";
import { setLoginUser } from "../store/LoginUser";

import kakao from "../../../common/assets/logo/kakao-logo.png"
import Button from "../../../common/components/Button";

import {
  BASE_URL,
} from '../../../common/util/constantValue';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const data: LoginData = useSelector((state: RootState) => state.login);
  const member = useSelector((state: RootState) => state.member);
  

  const loginMutation = useMutation<void, unknown, LoginData>(() =>
    loginData(BASE_URL, data),
  );



  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    dispatch(setLoginUser({ ...data, email: e.target.value }));
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(setLoginUser({ ...data, password: e.target.value }));
  }

  const handleLogin = () => {
    loginMutation.mutate(data);
  }

  return (
    <div>
      <SemiHeader title="로그인" content="모모에 오신것을 환영합니다!"/>
      <Layout>
        <div style={{display:"flex", flexDirection:"column"}}>
          <KakaoBtn>
            <img src={kakao} style={{height:"20px", marginRight:"5px"}}/>
            카카오톡&nbsp;로그인
          </KakaoBtn>
          <Background style={{marginTop:"20px", width:"30rem"}}>
            <ContentWrapper>
              <InputBox>
                <Text>이메일</Text>
                <TextInput
                  value={email}
                  style={{width:"300px"}}
                  onChange={handleEmailChange}
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
              <div style={{padding:"10px"}}></div>
              <Button children={"로그인"} onClick={handleLogin}/>
              <div style={{display:"flex", marginTop:"40px", marginBottom:"20px"}}>
                <div style={{fontSize:"small"}}>아직 모모의 회원이 아니신가요?</div>
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
`

const KakaoBtn = styled.button`
background-color: #FFE34E;
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

&:hover { background-color: #FFE03D; }
&:active { background-color: #F9D724; }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
`

const BlueLink = styled.div`
  color: #0075FF;
  font-size: small;
  margin-left: 5px;
`
