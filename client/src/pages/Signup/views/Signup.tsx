import { useState } from "react";
import { styled } from "styled-components";
import { useMutation } from "react-query";
import axios from "axios";

import SemiHeader from "../../../common/components/SemiHeader";
import { Layout } from "../../../common/style";
import Button from "../../../common/components/Button";

interface User {
  email: string;
  password: string;
  nickName: string;
  birthYear: number | null;
  gender: boolean | null;
  location: string;
  welcome_msg: string;
}

interface TextInputProps {
  type?: string;
  value: string;
  isValidate: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [nickName, setNickName] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<boolean | null>(null);
  const [myMsg, setMyMsg] = useState("");

  const regexEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const regexPassword = /^[a-zA-Z0-9]{7,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    return regexEmail.test(e.target.value)
      ? setIsValidEmail(true) : setIsValidEmail(false)
    // setIsValidEmail(e.target.value.includes(`@` && `.`) && e.target.value.includes(`com`));
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    return regexPassword.test(e.target.value)
      ? setIsValidPassword(true) : setIsValidPassword(false)
    // setIsValidPassword(e.target.value.length >= 8);
  }

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  }

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(parseInt(e.target.value));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMale = e.target.value === 'male';
    setGender(isMale);
  };

  const handleMyMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyMsg(e.target.value);
  }

  const signUpMutation = useMutation(async (user: User) => {
    await axios.post("http://localhost:8080/members/register", user);
  });

  const handleSignUp =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      alert("이메일또는 패스워드의 조건을 다시 확인해주세요.");
    }
    if (email === "" ||
      password === "" ||
      nickName === "" ||
      birthYear === null ||
      gender === null) { alert("빈칸을 모두 채워주세요.")}
    
      try {
        const user: User = {
          email: email,
          password: password,
          nickName: nickName,
          birthYear: birthYear,
          gender: gender,
          location: "Seoul",
          welcome_msg: myMsg,
        };
        await signUpMutation.mutateAsync(user);
        alert("회원가입이 완료되었습니다. 로그인 후 서비스를 이용하실 수 있습니다.");
      } catch (error) {
        console.error("Error during sign up:", error);
        alert("회원가입 도중 오류가 발생했습니다. 다시 시도해주세요.");
      }
  }

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <form onSubmit={handleSignUp}>
        <SemiHeader title="회원가입" content="모모에 오신것을 환영합니다!"/>
        <Layout>
          <Background>
            <ContentWrapper>
              <InputBox>
                <Text>이메일</Text>
                <TextInput
                  value={email}
                  style={{width:"400px"}}
                  onChange={handleEmailChange}
                  isValidate={isValidEmail}
                  placeholder="이메일을 입력하세요. (ex. momo@gmail.com)"
                />
                {!isValidEmail && <ErrorMessage>올바르지 않은 이메일 형식입니다.</ErrorMessage>}
              </InputBox>
              <InputBox>
                <Text>비밀번호</Text>
                <TextInput
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  isValidate={isValidPassword}
                  placeholder="비밀번호를 입력하세요."
                />
                {!isValidPassword && <ErrorMessage>비밀번호는 8글자 이상이여야 합니다.</ErrorMessage>}
              </InputBox>
              <InputBox>
                <Text>닉네임</Text>
                <TextInput
                  value={nickName}
                  onChange={handleNickNameChange}
                  isValidate={true}
                  placeholder="닉네임을 입력하세요. (나중에 수정할 수 있어요!)"
                />
              </InputBox>
              <InputBox>
                <Text>출생년도</Text>
                <DropdownInput
                  value={birthYear === null ? "" : birthYear}
                  onChange={handleBirthYearChange}
                >
                  <option value="">출생년도를 선택하세요</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </DropdownInput>
              </InputBox>
              <InputBox>
                <Text>성별</Text>
                <div style={{display:"flex"}}>
                  <div style={{marginTop:"10px", marginRight:"30px"}}>
                    <label htmlFor="male" style={{fontSize:"15px"}}>남</label>
                    &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleGenderChange}
                      checked={gender === true}
                    />
                  </div>
                  <div style={{margin:"10px"}}>
                    <label htmlFor="female" style={{fontSize:"15px"}}>여</label>
                    &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleGenderChange}
                      checked={gender === false}
                    />
                  </div>
                </div>
              </InputBox>
              <InputBox>
                <Text>지역</Text>
                <input />
              </InputBox>
              <InputBox>
                <Text>자기소개</Text>
                <TextAreaInput
                  value={myMsg}
                  onChange={handleMyMsgChange}
                  placeholder="자유롭게 자기소개를 작성해보세요."
                />
              </InputBox>
            </ContentWrapper>
            <Button children={"가입하기"} type="submit"/>
          </Background>
        </Layout>
      </form>
    </div>
  );
}

export const Background = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
border: solid 2px var(--color-black);
border-radius: 10px;
background-color: white;
width: 40rem;
margin: 100px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40rem;
  margin-left: 50px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
`

export const Text = styled.span`
  font-size: medium;
`

export const TextInput = styled.input<TextInputProps>`
  width: 300px;
  border: ${(props) => (props.isValidate ? '2px solid var(--color-black)' : '2px solid red')};
  margin-top: 10px;
`
const ErrorMessage = styled.div`
  color: red;
  font-size: small;
  margin-top: 5px;
`

const DropdownInput = styled.select`
  width: 300px;
  border: 2px solid var(--color-black);
  border-radius: 5px;
  margin-top: 10px;
  padding: 0.5rem;
  font-size: small;
  font-family: 'BR-Regular';
  &:focus { outline:none; }
`

const TextAreaInput = styled.textarea<TextAreaProps>`
width: 90%;
height: 200px;
padding: 0.5rem;
border: 2px solid var(--color-black);
border-radius: 5px;
margin-top: 10px;
font-size: small;
font-family: 'BR-Regular';
resize: none;
&:focus { outline:none; }
`