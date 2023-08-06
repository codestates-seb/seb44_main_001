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
import { MemberPatchDto, EditMember } from '../../../common/type';
import { RootState } from '../../../common/store/RootStore';
import LocationSelector from '../../../common/components/LocationSelector';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';
import { resetCreatedPost } from '../../Write,Edit/store/CreatedPost';
import { patchMyDataImg, patchData } from '../../../common/apis';
import Button from '../../../common/components/Button';
import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../common/util/constantValue';
import Modal from 'react-modal';
import { ModalStyle } from '../ModalStyle';
import ModalMain from '../components/ModalMain';
import { AxiosError } from 'axios';

export default function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myData = useSelector((state: RootState) => state.myData);
  const location = useSelector((state: RootState) => state.location);

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(myData.nickname);
  const [welcomeMsg, setWelcomeMsg] = useState(myData.welcomeMsg);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null | string>(null);
  const [isValidate, setIsValidate] = useState(true);

  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(setLocation(myData.location));
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
      const file = input.files[0]; // 파일 추출

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataURL = e.target?.result as string;
        setUploadedImage(imageDataURL);
      };
      reader.readAsDataURL(file); // 추출한 파일을 읽어 데이터 URL로 변환

      setUploadedFile(file); // 파일 상태 변수에 저장
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleWelcomeMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWelcomeMsg(e.target.value);
  };

  const patchImgMutation: UseMutationResult<void, unknown, EditMember> =
    useMutation(
      (editedInfo) => {
        const url = `${BASE_URL}/members/${myData.memberId}/image`;
        return patchMyDataImg(url, editedInfo);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userInfo');
          navigate(`/user/${myData.memberId}`);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );

  const patchInfoMutation: UseMutationResult<void, AxiosError, MemberPatchDto> =
    useMutation(
      (memberPatchDto) => {
        const url = `${BASE_URL}/members/${myData.memberId}`;
        return patchData(url, memberPatchDto);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userInfo');
          navigate(`/user/${myData.memberId}`);
        },
        onError: (error) => {
          if (error.response?.status === 500) {
            setIsValidate(false);
          } else {
            console.error(error);
          }
        },
      },
    );

  const handleEdit = () => {
    if (!nickname) {
      window.alert('제목을 입력해주세요!');
      return;
    }
    if (!location.locationId) {
      window.alert('지역을 선택해주세요!');
      return;
    }
    const editedInfo: EditMember = {
      memberPatchDto: {
        ...(myData.nickname === nickname ? {} : { nickname }),
        ...(myData.welcomeMsg === welcomeMsg ? {} : { welcomeMsg }),
        locationId: location.locationId,
      },
      file: uploadedFile,
    };
    if (uploadedFile) {
      patchImgMutation.mutate(editedInfo);
    } else {
      patchInfoMutation.mutate(editedInfo.memberPatchDto);
    }
  };

  return (
    <>
      <SemiHeader title={`프로필 편집`} content="" />
      <Layout>
        <AllContainer>
          <Background>
            <ImageContainer>
              {uploadedImage ? (
                <ProfileImage src={uploadedImage} />
              ) : (
                <ProfileImage src={myData.profileImage || profile} />
              )}
              <ImgEditButton>
                <label className="editLabel" htmlFor="file-input">
                  <img src={imgEdit} alt="img-edit-button" />
                </label>
                <ImgEditInput
                  id="file-input"
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={handleImgChange}
                />
              </ImgEditButton>
            </ImageContainer>
            <InputContainer>
              <InputBox>
                <Text>이메일 주소</Text>
                <TextInput
                  value={myData.email}
                  $isValidate={true}
                  onChange={handleNicknameChange}
                  disabled
                />
              </InputBox>
              <InputBox>
                <Text>닉네임</Text>
                <TextInput
                  value={nickname}
                  $isValidate={isValidate}
                  onChange={handleNicknameChange}
                />
                {isValidate || <Message>중복된 닉네임 입니다.</Message>}
              </InputBox>
              <InputBox>
                <Text>지역</Text>
                <LocationSelector />
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
            <BtnContainer>
              <Button children={'수정하기'} onClick={handleEdit} />
              <Button children={'회원탈퇴'} onClick={handleModalChange} />
            </BtnContainer>
            <Modal
              isOpen={isOpen}
              style={ModalStyle}
              onRequestClose={handleModalChange}
            >
              <ModalMain
                memberId={myData.memberId}
                handleModalChange={handleModalChange}
              />
            </Modal>
          </Background>
        </AllContainer>
      </Layout>
    </>
  );
}

const AllContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 11.1rem;
  height: 11.1rem;
  border-radius: 50%;
  object-fit: cover;
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

const BtnContainer = styled.div`
  & :first-child {
    margin-right: 1rem;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
`;
