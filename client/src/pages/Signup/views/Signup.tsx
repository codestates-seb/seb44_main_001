import { useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import SemiHeader from "../../../common/components/SemiHeader";
import { Layout } from "../../../common/style";
import Button from "../../../common/components/Button";
import LocationSelector from "../../../common/components/LocationSelector";
import signupData from '../api/postSignup';
import { SignupData } from '../../../common/type';
import { RootState } from "../../../common/store/RootStore";
import { setSignupUser } from "../store/SignupUser";
import { BASE_URL } from '../../../common/util/constantValue';

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
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [nickName, setNickName] = useState('');
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<boolean | null>(null);
  const [myMsg, setMyMsg] = useState('');

  const dispatch = useDispatch();

  const data: SignupData = useSelector((state: RootState) => state.signup);
  const region = useSelector((state: RootState) => state.location.region);

  const signupMutation = useMutation<void, unknown, SignupData>(() =>
    signupData(BASE_URL, data),
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    dispatch(setSignupUser({ ...data, email: e.target.value }));
    setIsValidEmail(
      e.target.value.includes(`@` && `.`) && e.target.value.includes(`com`),
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(setSignupUser({ ...data, password: e.target.value }));
    setIsValidPassword(e.target.value.length >= 8);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    dispatch(setSignupUser({ ...data, nickName: e.target.value }));
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(parseInt(e.target.value));
    dispatch(setSignupUser({ ...data, birthYear: e.target.value }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMale = e.target.value === 'male';
    setGender(isMale);
    dispatch(setSignupUser({ ...data, gender: isMale }));
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSignupUser({ ...data, location: `${region} ${e.target.value}` }),
    );
  };

  const handleMyMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyMsg(e.target.value);
    dispatch(setSignupUser({ ...data, welcome_msg: e.target.value }));
  };

  const handleSignUp = () => {
    if (!isValidEmail || !isValidPassword) {
      alert('이메일또는 패스워드의 조건을 다시 확인해주세요.');
    }
    if (
      email === '' ||
      password === '' ||
      nickName === '' ||
      birthYear === null ||
      gender === null
    ) {
      alert('빈칸을 모두 채워주세요.');
    }

    signupMutation.mutate(data);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SemiHeader title="회원가입" content="모모에 오신것을 환영합니다!" />
      <Layout>
        <Background>
          <ContentWrapper>
            <InputBox>
              <Text>이메일</Text>
              <TextInput
                value={email}
                style={{ width: '400px' }}
                onChange={handleEmailChange}
                isValidate={isValidEmail}
                placeholder="이메일을 입력하세요. (ex. momo@gmail.com)"
              />
              {!isValidEmail && (
                <ErrorMessage>올바르지 않은 이메일 형식입니다.</ErrorMessage>
              )}
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
              {!isValidPassword && (
                <ErrorMessage>비밀번호는 8글자 이상이여야 합니다.</ErrorMessage>
              )}
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
                value={birthYear === null ? '' : birthYear}
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
              <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '10px', marginRight: '30px' }}>
                  <label htmlFor="male" style={{ fontSize: '15px' }}>
                    남
                  </label>
                  &nbsp;
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleGenderChange}
                    checked={gender === true}
                  />
                </div>
                <div style={{ margin: '10px' }}>
                  <label htmlFor="female" style={{ fontSize: '15px' }}>
                    여
                  </label>
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
              <LocationSelector onLocationChange={onLocationChange}/>
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
          <Button children={'가입하기'} onClick={handleSignUp} />
        </Background>
      </Layout>
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
& select {
  margin: 1rem 2rem 1rem 0;
}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40rem;
  margin-left: 50px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
`;

export const Text = styled.span`
  font-size: medium;
`;

export const TextInput = styled.input<TextInputProps>`
  width: 300px;
  border: ${(props) =>
    props.isValidate ? '2px solid var(--color-black)' : '2px solid red'};
  margin-top: 10px;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: small;
  margin-top: 5px;
`;

const DropdownInput = styled.select`
  width: 300px;
  margin-top: 10px;
  color: var(--color-black);
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
  &:focus {
    outline: none;
  }
`;
