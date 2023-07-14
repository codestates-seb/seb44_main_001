import { styled } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import SemiHeader from '../../../common/components/SemiHeader';
import Button from '../../../common/components/Button';
import { Layout } from '../../../common/style';
import { Background } from '../../Signup/views/Signup';
import profile from '../../../common/assets/profile.svg';
import { RootState } from '../../../common/store/RootStore';
import { BASE_URL } from '../../../common/util/constantValue';
import getMember from '../api/getMember';
import ChatButton from '../../../common/components/Chat/views/ChatModal';
import { PiMapPinBold } from 'react-icons/pi';
import { setUserData } from '../store/MemberStore';

export default function User() {
  const params = useParams<{ memberId: string }>();
  const { memberId } = params;

  const token: string = useSelector((state: RootState) => state.token.token);
  const data = useSelector((state: RootState) => state.member);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedMemberId = localStorage.getItem('MemberId');

  const isMine = useMemo(() => {
    if (storedMemberId && data) {
      const numberId = parseInt(storedMemberId, 10);
      return numberId === data.memberId;
    }
    return false;
  }, [storedMemberId, data]);

  const fetchUser = useMutation<void, unknown, number>(
    async (memberId: number) => {
      const userData = await getMember(
        `${BASE_URL}/members/${memberId}`,
        token,
      );
      dispatch(setUserData(userData));
      console.log(`fetch User!!! : `, userData);
    },
  );

  useEffect(() => {
    if (memberId) {
      const numberId = parseInt(memberId, 10);
      fetchUser.mutate(numberId, {
        onSuccess: () => {
          console.log('UserProfile fetched successfully');
        },
        onError: () => {
          console.log('An error occurred while fetching UserProfile');
        },
      });
    }
    if (!memberId) {
      console.log('memberId is not found!!');
    }
  }, [memberId]);

  const handelTest = () => {
    console.log('테스트버튼 클릭!');
    navigate(`/user/${1}`, { state: 1 });
  };

  return (
    <div>
      {data ? (
        <>
          <SemiHeader title={`${data.nickname} 의 프로필`} content="" />
          <Layout>
            <Background>
              <ProfileContainer>
                <ProfileContentBox style={{ display: 'flex' }}>
                  <ProfileImg
                    src={data.profileImage ? `${data.profileImage}` : profile}
                  />
                  <ProfileBox>
                    <ProfileItem style={{ fontSize: 'x-large' }}>
                      {data.nickname}
                    </ProfileItem>
                    <ProfileItem style={{ display: 'flex' }}>
                      <LocationIcon />
                      &nbsp;
                      <div>{data.location}</div>
                    </ProfileItem>
                    <ProfileItem>{data.isMale ? `남자` : `여자`}</ProfileItem>
                    <ProfileItem>{`${data.age}년생`}</ProfileItem>
                  </ProfileBox>
                </ProfileContentBox>
                {isMine ? <Button children={'프로필 수정'} /> : <>&nbsp;</>}
              </ProfileContainer>
              <MsgBox>
                <div>{data.welcomeMsg}</div>
              </MsgBox>
            </Background>
            <ChatButton />
            <div>
              <Button
                children={'다른사람페이지로 이동~'}
                onClick={handelTest}
              />
            </div>
          </Layout>
        </>
      ) : (
        <p>로드 중...</p>
      )}
    </div>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 10rem;
  margin-right: 2rem;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const ProfileItem = styled.div`
  margin: 5px;
`;
const ProfileContentBox = styled.div`
  display: flex;
`;

const MsgBox = styled.div`
  background-color: var(--color-pink-3);
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  border: solid 2px var(--color-pink-1);
`;

const LocationIcon = styled(PiMapPinBold)`
  color: var(--color-black);
`;
