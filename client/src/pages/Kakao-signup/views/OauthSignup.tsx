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
import { UseMutationResult, useMutation, useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../common/util/constantValue';
import { useNavigate } from 'react-router-dom';
import { setMyData } from '../../Login/store/MyUserData';
import { AxiosError } from 'axios';
import { patchMyData } from '../api/patchMyData';
import { setTokenData } from '../../Login/store/userTokenStore';
import MyData from '../../Login/api/getMyData';

export default function OauthSignup() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [isMale, setIsMale] = useState<boolean | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const patchData: SignupPatchData = useSelector(
    (state: RootState) => state.authSignup,
  );

  const memberId = useSelector((state:RootState)=>state.myData.memberId);
  const token = localStorage.getItem('Authorization');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const noSpaceValue = value.replace(/\s+/g, '');
    setNickname(noSpaceValue);
    dispatch(setUpdatedUser({ ...patchData, nickname: noSpaceValue }));
    dispatch(setMyData({ ...patchData, nickname: noSpaceValue }));
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(parseInt(e.target.value));
    dispatch(setUpdatedUser({ ...patchData, age: e.target.value }));
    dispatch(setMyData({ ...patchData, age: e.target.value }));
  };

  const handleIsMaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMale = e.target.value === 'male';
    setIsMale(isMale);
    dispatch(setUpdatedUser({ ...patchData, isMale: isMale }));
    dispatch(setMyData({ ...patchData, isMale: isMale }));
  };

  const onLocationChange = (locationId: number | null) => {
    dispatch(setUpdatedUser({ ...patchData, locationId: locationId }));
    dispatch(setMyData({ ...patchData, locationId: locationId }));
  };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
    dispatch(setUpdatedUser({ ...patchData, welcomeMsg: e.target.value }));
    dispatch(setMyData({ ...patchData, welcomeMsg: e.target.value }));
  };

  useQuery<void, AxiosError, number>(
    'userInfo',
    () => MyData(`${BASE_URL}/members/userInfo`),
    {
      onSuccess: (data) => {
        dispatch(setMyData(data));
      },
      onError: (error) => {
          console.error('오류가 발생했습니다.', error.message);
      },
    },
  );
  
  const patchInfoMutation: UseMutationResult<
    void,
    AxiosError,
    MemberPatchDto | SignupPatchData
  > = useMutation(
    (memberPatchDto) => {
      const url = `${BASE_URL}/members/${memberId}`;
      return patchMyData(url, memberPatchDto as MemberPatchDto);
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
      dispatch(setTokenData({ token:`${token}`}));
      patchInfoMutation.mutate(patchData);
    }
    navigation('/lists');
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
