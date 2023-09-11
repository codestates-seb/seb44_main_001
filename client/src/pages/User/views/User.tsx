import { styled } from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import SemiHeader from '../../../common/components/SemiHeader';
import Button from '../../../common/components/Button';
import { Layout } from '../../../common/style';
import { Background } from '../../Signup/views/Signup';
import profile from '../../../common/assets/profile.svg';
import { BASE_URL } from '../../../common/util/constantValue';
import { PiMapPinBold } from 'react-icons/pi';
import UserPostsCards from '../components/userPostsCards';
import { ALERTLOGIN } from '../../../common/util/constantValue';
import { getData } from '../../../common/apis';
import { Member } from '../../../common/type';
import useMyInfo from '../../../common/util/customHook/useMyInfo';
import { AUTHORIZATION } from '../../../common/util/constantValue';

export default function User() {
  const navigate = useNavigate();

  const memberId = useParams().memberId || '';

  const token: string | null = localStorage.getItem(AUTHORIZATION);

  const { myData } = useMyInfo();

  const isMine = memberId === String(myData?.memberId);

  const { data: userInfo } = useQuery<void, unknown, Member>(
    ['userInfo', memberId],
    () => {
      return getData(`${BASE_URL}/members/${memberId}`);
    },
    {
      enabled: !isMine,
      onError: () => {
        alert('존재하지 않는 회원입니다!');
        navigate(-1);
      },
    },
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (!token) {
      alert(ALERTLOGIN);
      navigate(-1);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileData = userInfo || myData;

  return (
    <main>
      <div>
        {profileData ? (
          <>
            <SemiHeader title={`${profileData.nickname} 의 프로필`} content="" />
            <Layout>
              <Background>
                <ProfileContainer>
                  <ProfileContentBox style={{ display: 'flex' }}>
                    <ProfileImg
                      src={
                        profileData.profileImage
                          ? `${profileData.profileImage}`
                          : profile
                      }
                    />
                    <ProfileBox>
                      <ProfileItem style={{ fontSize: 'x-large' }}>
                        {profileData.nickname}
                      </ProfileItem>
                      <ProfileItem style={{ display: 'flex' }}>
                        <LocationIcon />
                        &nbsp;
                        <div>{`${profileData.location.city} ${profileData.location.province}`}</div>
                      </ProfileItem>
                      <ProfileItem>
                        {profileData.isMale ? `남자` : `여자`}
                      </ProfileItem>
                      <ProfileItem>{`${profileData.age}년생`}</ProfileItem>
                    </ProfileBox>
                  </ProfileContentBox>
                  {isMine ? (
                    <Button
                      onClick={() => navigate('/user/edit')}
                      children={'프로필 수정'}
                    />
                  ) : (
                    <>&nbsp;</>
                  )}
                </ProfileContainer>
                <MsgBox>
                  {profileData.welcomeMsg ? (
                    <div>{profileData.welcomeMsg}</div>
                  ) : (
                    <div>자기소개가 없습니다.</div>
                  )}
                </MsgBox>
              </Background>
            </Layout>
            <UserPostsCards
              memberId={memberId}
              nickname={profileData.nickname}
              isMine={isMine}
            />
          </>
        ) : (
          <p>로드 중...</p>
        )}
      </div>
    </main>
  );
}

export const ProfileContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-right: 2rem;
  object-fit: cover;
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
