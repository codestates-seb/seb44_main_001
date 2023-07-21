import { useState } from 'react';
import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import {
  Background,
  ContentWrapper,
  DropdownInput,
  InputBox,
  Text,
  TextAreaInput,
  TextInput,
} from '../../Signup/views/Signup';
import LocationSelector from '../../../common/components/LocationSelector';
import Button from '../../../common/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import patchMyData from '../api/patchMyData';
import { setUpdatedUser } from '../store/UpdatedUserData';
import { SignupPatchData } from '../../../common/type';
import { RootState } from '../../../common/store/RootStore';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../../common/util/constantValue';

// interface KakaoData {
//   email: string;
// }

export default function KakaoSignup() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [isMale, setIsMale] = useState<boolean | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const dispatch = useDispatch();

  const patchData: SignupPatchData = useSelector(
    (state: RootState) => state.authSignup,
  );

  const memberId = 1;

  const kakaoMutation = useMutation<void, unknown, SignupPatchData>(
    async () => {
      const storedToken = localStorage.getItem('Authorization');
      if (storedToken) {
        const result = await patchMyData(
          `${BASE_URL}/members/${memberId}`,
          storedToken,
          patchData,
        );
        console.log(result);
      }
    },
  );

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    dispatch(setUpdatedUser({ ...patchData, nickname: e.target.value }));
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(parseInt(e.target.value));
    dispatch(setUpdatedUser({ ...patchData, age: e.target.value }));
  };

  const handleIsMaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMale = e.target.value === 'male';
    setIsMale(isMale);
    dispatch(setUpdatedUser({ ...patchData, isMale: isMale }));
  };

  const onLocationChange = (locationId: number | null) => {
    dispatch(setUpdatedUser({ ...patchData, location: locationId }));
  };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
    dispatch(setUpdatedUser({ ...patchData, welcomeMsg: e.target.value }));
  };

  const handleSignup = async () => {
    await kakaoMutation.mutate(patchData);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SemiHeader
        title="추가 정보 기입"
        content="추가 정보를 입력하시면 모모 가입이 완료돼요!"
      />
      <Layout>
        <Background>
          <ContentWrapper>
            <InputBox>
              <Text>닉네임</Text>
              <TextInput
                value={nickname}
                onChange={handleNicknameChange}
                isValidate={true}
                placeholder="닉네임을 입력하세요. (나중에 수정할 수 있어요!)"
              />
            </InputBox>
            <InputBox>
              <Text>출생년도</Text>
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
              <Text>성별</Text>
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
              <Text>지역</Text>
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
          <Button children={'가입 완료하기'} onClick={handleSignup} />
        </Background>
      </Layout>
    </div>
  );
}
