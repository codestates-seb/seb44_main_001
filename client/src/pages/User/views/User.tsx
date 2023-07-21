import { styled } from 'styled-components';
import { useEffect, useMemo } from 'react';
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
import UserPostsCards from '../components/UserPostsCards';

export default function User() {
  const navigate = useNavigate();

  const memberId = useParams().memberId || '';

  const token: string | null = localStorage.getItem('Authorization');

  const data = useSelector((state: RootState) => state.member);

  const dispatch = useDispatch();

  const storedMemberId = localStorage.getItem('MemberId');

  const isMine = useMemo(() => {
    if (storedMemberId && data) {
      const numberId = parseInt(storedMemberId, 10);
      return numberId === data.memberId;
    }
    return false;
  }, [storedMemberId, data]);

  const fetchUser = useMutation<void, unknown, number>(
    (memberId: number) => {
      return getMember(`${BASE_URL}/members/${memberId}`, token as string);
    },
    {
      onSuccess: (data) => {
        dispatch(setUserData(data));
        console.log(`fetch User!!! : `, data);
      },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  return (
    <main>
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
                        <div>{`${data.location.city} ${data.location.province}`}</div>
                      </ProfileItem>
                      <ProfileItem>{data.isMale ? `남자` : `여자`}</ProfileItem>
                      <ProfileItem>{`${data.age}년생`}</ProfileItem>
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
                  <div>{data.welcomeMsg}</div>
                </MsgBox>
              </Background>
              <ChatButton />
            </Layout>
          </>
        ) : (
          <p>로드 중...</p>
        )}
      </div>
      <UserPostsCards memberId={memberId} nickname={data.nickname} />
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
