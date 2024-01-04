import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import Button from '../../../common/components/Button';
import LocationSelector from '../../../common/components/LocationSelector';
import { SignupData } from '../../../common/type';
import { RootState } from '../../../common/store/RootStore';
import { setSignupUser } from '../store/SignupUser';
import { AUTHORIZATION, BASE_URL } from '../../../common/util/constantValue';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';
import { resetCreatedPost } from '../../Write,Edit/store/CreatedPost';
import { AxiosError } from 'axios';
import { postData } from '../../../common/apis';

interface TextInputProps {
  type?: string;
  value: string | undefined;
  $isValidate?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  isDuplicateEmail?: boolean;
  isDuplicateNickname?: boolean;
  autocomplete?: string;
}

interface TextAreaProps {
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

interface ErrorResponse {
  message: string;
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [nickname, setNickname] = useState('');
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [isMale, setIsMale] = useState<boolean | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const data: SignupData = useSelector((state: RootState) => state.signup);

  const token = localStorage.getItem(AUTHORIZATION);

  const signupMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    SignupData
  >((data) => postData(`${BASE_URL}/members/register`, data), {
    onSuccess: () => {
      navigation('/login');
    },
    onError: (error) => {
      if (
        error.response?.status === 409 &&
        error.response?.data?.message === 'Member exists'
      ) {
        alert('입력하신 이메일이 이미 존재합니다.');
        setIsDuplicateEmail(true);
      } else if (
        error.response?.status === 409 &&
        error.response?.data?.message === 'Nickname Exist'
      ) {
        alert('입력하신 닉네임이 이미 존재합니다.');
        setIsDuplicateNickname(true);
      }
      window.scrollTo({
        top: 300,
        behavior: 'smooth',
      });
    },
  });

  useEffect(() => {
    if (token) {
      navigation('/lists');
    }
    return () => {
      dispatch(setCategory({ categoryId: 0, name: '' }));
      dispatch(setLocation({ locationId: 0, city: '', province: '' }));
      dispatch(resetCreatedPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeSpace = (value: string) => {
    const removedValue = value.replace(/\s+/g, '');
    return removedValue;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDuplicateEmail(false);
    const value = removeSpace(e.target.value);
    setEmail(value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    setIsValidEmail(regex.test(value));
    dispatch(setSignupUser({ ...data, email: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeSpace(e.target.value);
    setPassword(value);
    dispatch(setSignupUser({ ...data, password: value }));
    setIsValidPassword(value.length >= 8);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDuplicateNickname(false);
    const value = removeSpace(e.target.value);
    setNickname(value);
    dispatch(setSignupUser({ ...data, nickname: value }));
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(parseInt(e.target.value));
    dispatch(setSignupUser({ ...data, age: e.target.value }));
  };

  const handleIsMaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMale = e.target.value === 'male';
    setIsMale(isMale);
    dispatch(setSignupUser({ ...data, isMale: isMale }));
  };

  const onLocationChange = (locationId: number | null) => {
    dispatch(setSignupUser({ ...data, locationId: locationId }));
  };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
    dispatch(setSignupUser({ ...data, welcomeMsg: e.target.value }));
  };

  const handleSignUp = () => {
    if (!isValidEmail || !isValidPassword) {
      alert('이메일 또는 패스워드의 조건을 다시 확인해주세요.');
    }
    if (
      email === '' ||
      password === '' ||
      nickname === '' ||
      age === null ||
      isMale === null
    ) {
      alert('필수 항목을 모두 채워주세요.');
      window.scrollTo({
        top: 300,
        behavior: 'smooth',
      });
    } else {
      signupMutation.mutate(data);
    }
  };

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SemiHeader title="회원가입" content="모모에 오신것을 환영합니다!" />
      <Layout>
        <Background>
          <ContentWrapper>
            <InputBox>
              <div style={{ fontSize: '13px', marginBottom: '10px' }}>
                *가 붙은 항목은 필수 항목입니다.
              </div>
              <Text>이메일 *</Text>
              <TextInput
                value={email}
                style={{ width: '400px' }}
                onChange={handleEmailChange}
                $isValidate={isValidEmail && !isDuplicateEmail}
                placeholder="이메일을 입력하세요. (ex. momo@gmail.com)"
              />
              {!isValidEmail && (
                <ErrorMessage>올바르지 않은 이메일 형식입니다.</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <Text>비밀번호 *</Text>
              <TextInput
                value={password}
                type="password"
                onChange={handlePasswordChange}
                $isValidate={isValidPassword}
                placeholder="비밀번호를 입력하세요."
              />
              {!isValidPassword && (
                <ErrorMessage>비밀번호는 8글자 이상이여야 합니다.</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <Text>닉네임 *</Text>
              <TextInput
                value={nickname}
                onChange={handleNicknameChange}
                $isValidate={!isDuplicateNickname}
                placeholder="닉네임을 입력하세요. (나중에 수정할 수 있어요!)"
              />
            </InputBox>
            <InputBox>
              <Text>출생년도 *</Text>
              <DropdownInput
                value={age === null ? '' : age}
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
              <Text>성별 *</Text>
              <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '10px', marginRight: '30px' }}>
                  <label htmlFor="male" style={{ fontSize: '15px' }}>
                    남
                  </label>
                  &nbsp;
                  <input
                    type="radio"
                    name="isMale"
                    value="male"
                    onChange={handleIsMaleChange}
                    checked={isMale === true}
                  />
                </div>
                <div style={{ margin: '10px' }}>
                  <label htmlFor="female" style={{ fontSize: '15px' }}>
                    여
                  </label>
                  &nbsp;
                  <input
                    type="radio"
                    name="isMale"
                    value="female"
                    onChange={handleIsMaleChange}
                    checked={isMale === false}
                  />
                </div>
              </div>
            </InputBox>
            <InputBox>
              <Text>지역 *</Text>
              <LocationSelector onLocationChange={onLocationChange} />
            </InputBox>
            <InputBox>
              <Text>자기소개</Text>
              <TextAreaInput
                value={welcomeMsg}
                onChange={handleWelcomeMsgChange}
                placeholder="자유롭게 자기소개를 작성해보세요."
              />
            </InputBox>
          </ContentWrapper>
          <Button children={'가입하기'} onClick={handleSignUp} type="submit" />
        </Background>
      </Layout>
    </main>
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
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40rem;
  margin-left: 50px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
`;

export const Text = styled.label`
  font-size: medium;
`;

export const TextInput = styled.input<TextInputProps>`
  width: 300px;
  border: ${(props) =>
    props.$isValidate ? '2px solid var(--color-black)' : '2px solid red'};
  margin-top: 10px;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: small;
  margin-top: 5px;
`;

export const DropdownInput = styled.select`
  width: 300px;
  margin-top: 10px;
  color: var(--color-black);
  &:focus {
    outline: none;
  }
`;

export const TextAreaInput = styled.textarea<TextAreaProps>`
  width: 90%;
  height: 200px;
  padding: 0.5rem;
  border: 2px solid var(--color-black);
  border-radius: 5px;
  margin-top: 10px;
  font-size: small;
  resize: none;
  &:focus {
    outline: none;
  }
`;
