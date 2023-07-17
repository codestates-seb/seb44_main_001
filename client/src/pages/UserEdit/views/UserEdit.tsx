import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import {
  Background,
  Text,
  TextInput,
  InputBox,
  TextAreaInput,
} from '../../Signup/views/Signup';
import profile from '../../../common/assets/profile.svg';
import imgEdit from '../../../common/assets/icons/imgEdit.svg';
import { setMyData } from '../../Login/store/MyUserData';
import { Member } from '../../../common/type';
import { RootState } from '../../../common/store/RootStore';
import LocationSelector from '../../../common/components/LocationSelector';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';
import { resetCreatedPost } from '../../Write,Edit/store/CreatedPost';
import { setSignupUser } from '../../Signup/store/SignupUser';
import Button from '../../../common/components/Button';
import ChatButton from '../../../common/components/Chat/views/ChatModal';

export default function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user: Member = useSelector((state: RootState) => state.member);

  useEffect(() => {
    return () => {
      dispatch(setCategory({ categoryId: 0, name: '' }));
      dispatch(setLocation({ locationId: 0, city: '', province: '' }));
      dispatch(resetCreatedPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [nickname, setNickname] = useState(`${user.nickname}`);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const [isSelected, setIsSelected] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onLocationChange = (locationId: number | null) => {
    dispatch(setMyData({ ...user, location: locationId }));
  };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
  };

  const handleEdit = () => {
    console.log('수정~');
    // dispatch(setMyData({ ...user, nickname: e.target.value }));
    // dispatch(setMyData({ ...user, location: locationId }));
    // dispatch(setMyData({ ...user, welcomeMsg: e.target.value }));
  };

  return (
    <>
      <SemiHeader title={`프로필 편집`} content="" />
      <AllContainer>
        <NevContainer>
          <NevItem>프로필 수정</NevItem>
          <NevItem>내 글 보기</NevItem>
          <NevItem>회원 탈퇴</NevItem>
        </NevContainer>
        <Layout>
          <Background>
            <ImageContainer>
              <ProfileImage src={profile} />
              <ImgEditIcon src={imgEdit} />
            </ImageContainer>
            <ProfileImage />
            <InputContainer>
              <InputBox>
                <Text>닉네임</Text>
                <TextInput
                  value={nickname}
                  isValidate={true}
                  onChange={handleNicknameChange}
                />
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
            </InputContainer>
            <Button children={'수정하기'} onClick={handleEdit} />
          </Background>
          <ChatButton />
        </Layout>
      </AllContainer>
    </>
  );
}

const AllContainer = styled.div`
  display: flex;
`;

const NevContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  background-color: white;
  padding: 3rem;
`;

const NevItem = styled.div`
  margin: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
`;
const ProfileImage = styled.img`
  width: 11.1rem;
`;

const ImgEditIcon = styled.img`
  position: absolute;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
