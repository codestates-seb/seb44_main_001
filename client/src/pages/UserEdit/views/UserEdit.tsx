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
import { patchMyData } from '../api/patchMyData';
import { setSignupUser } from '../../Signup/store/SignupUser';
import Button from '../../../common/components/Button';
import ChatButton from '../../../common/components/Chat/views/ChatModal';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../../common/util/constantValue';

export default function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user: Member = useSelector((state: RootState) => state.member);
  const myData: Member = useSelector((state: RootState) => state.myData);
  console.log('!!!!', myData);
  const [nickname, setNickname] = useState(myData.nickname);
  const [welcomeMsg, setWelcomeMsg] = useState(myData.welcomeMsg);

  const [isSelected, setIsSelected] = useState(false);

  // 전역 설정을 안한다면? 이거 지워도 되나??
  useEffect(() => {
    return () => {
      dispatch(setCategory({ categoryId: 0, name: '' }));
      dispatch(setLocation({ locationId: 0, city: '', province: '' }));
      dispatch(resetCreatedPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageDataURL = e.target?.result as string;
        return imageDataURL;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // const handleLocationChange = (locationId: number | null) => {
  //   dispatch(setMyData({ ...myData, locationId: locationId }));
  // };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
  };

  const patchMutation = useMutation<void, unknown, Member>(
    (myData) => patchMyData(`${BASE_URL}/members/${myData.memberId}`, myData),
    {
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleEdit = () => {
    console.log('수정~');
    dispatch(
      setMyData({
        ...myData,
        nickname: nickname,
        welcomeMsg: welcomeMsg,
      }),
    );
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
              <ProfileImage src={myData.profileImage || profile} />
              <ImgEditButton>
                <label className="editLabel" htmlFor="file-input">
                  <img src={imgEdit} alt="img-edit-button" />
                </label>
                <ImgEditInput
                  id="file-input"
                  type="file"
                  onChange={handleImgChange}
                />
              </ImgEditButton>
            </ImageContainer>
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
                <LocationSelector
                //  onLocationChange={handleLocationChange}
                />
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
  height: 11.1rem;
  border-radius: 50%;
`;

const ImgEditButton = styled.button`
  position: absolute;
  border: none;
  background: none;
  padding: 0;
  top: 9rem;
  right: 0.5rem;
  .editLabel {
    cursor: pointer;
  }
`;

const ImgEditInput = styled.input`
  display: none;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
