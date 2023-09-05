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
import { setUpdatedUser } from '../store/UpdatedUserData';
import { MemberPatchDto, SignupPatchData } from '../../../common/type';
import { RootState } from '../../../common/store/RootStore';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from 'react-query';
import { BASE_URL } from '../../../common/util/constantValue';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { patchData } from '../../../common/apis';
import useMyInfo from '../../../common/util/customHook/useMyInfo';

export default function OauthSignup() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [isMale, setIsMale] = useState<boolean | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const data: SignupPatchData = useSelector(
    (state: RootState) => state.authSignup,
  );

  const { myData } = useMyInfo();

  const memberId = myData?.memberId;

  const token = localStorage.getItem('Authorization');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const noSpaceValue = value.replace(/\s+/g, '');
    setNickname(noSpaceValue);
    dispatch(setUpdatedUser({ ...data, nickname: noSpaceValue }));
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(parseInt(e.target.value));
    dispatch(setUpdatedUser({ ...data, age: e.target.value }));
  }

    const handleIsMaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isMale = e.target.value === 'male';
      setIsMale(isMale);
      dispatch(setUpdatedUser({ ...data, isMale: isMale }));
    };

    const onLocationChange = (locationId: number | null) => {
      dispatch(setUpdatedUser({ ...data, locationId: locationId }));
    };

    const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWelcomeMsg(e.target.value);
      dispatch(setUpdatedUser({ ...data, welcomeMsg: e.target.value }));
    };

    const patchInfoMutation: UseMutationResult<
      void,
      AxiosError,
      MemberPatchDto | SignupPatchData
    > = useMutation(
      (memberPatchDto) => {
        const url = `${BASE_URL}/members/${memberId}`;
        return patchData(url, memberPatchDto as MemberPatchDto);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userInfo');
          navigation('/lists');
        },
        onError: (error) => {
          if (error.response?.status === 500) {
            console.error('500 error occurred during the OAuth process ');
          } else {
            console.error(error);
          }
        },
      },
    );

    const handleSignup = () => {
      if (nickname === '' || age === null || isMale === null) {
        alert('필수 항목을 모두 채워주세요.');
        window.scrollTo({
          top: 300,
          behavior: 'smooth',
        });
      }
      if (token) {
        patchInfoMutation.mutate(data);
      }
      navigation('/lists');
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SemiHeader
          title="추가 정보 기입"
          content="추가 정보를 입력하시면 모모 가입이 완료돼요!"
        />
        <Layout>
          <Background>
            <ContentWrapper>
              <InputBox>
                <div style={{ fontSize: '13px', marginBottom: '10px' }}>
                  *가 붙은 항목은 필수 항목입니다.
                </div>
                <Text>닉네임 *</Text>
                <TextInput
                  value={nickname}
                  onChange={handleNicknameChange}
                  $isValidate={true}
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
            <Button children={'가입 완료하기'} onClick={handleSignup} />
          </Background>
        </Layout>
      </div>
    );
  }
