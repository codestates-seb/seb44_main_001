import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import SemiHeader from '../../../common/components/SemiHeader';
import Button from '../../../common/components/Button';
import { Layout } from '../../../common/style';
import { Background } from '../../Signup/views/Signup';
import profile from '../../../common/assets/profile.svg';
import { RootState } from '../../../common/store/RootStore';
import { BASE_URL } from '../../../common/util/constantValue';
import { getMember } from '../store/MemberStore';
import ChatButton from '../../../common/components/Chat/views/ChatModal';

interface UserInfoProps {
  memberId: number; // 컴포넌트 속성에 userId 추가
}

export default function User({ memberId }: UserInfoProps) {
  const [isMine, setIsMine] = useState(true);

  const dispatch = useDispatch();
  const storedMemberId = localStorage.getItem('MemberId');
  const user = useSelector((state: RootState) => state.member.data);
  const myData = useSelector((state: RootState) => state.myData);

  const { data, isLoading } = useQuery(['member', memberId], () =>
    getMember(`${BASE_URL}/members/${memberId}`),
  );

  const displayedData = user || data;

  return (
    <div>
      {!isLoading && myData ? (
        <>
          <SemiHeader title={`${myData.nickname} 의 프로필`} content="" />
          <Layout>
            <Background>
              <ProfileBox>
                <ProfileContentBox style={{ display: 'flex' }}>
                  <ProfileImg
                    src={
                      myData.profileImage ? `${myData.profileImage}` : profile
                    }
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: '2rem',
                    }}
                  >
                    <div>{myData.nickname}</div>
                    <div>{myData.location}</div>
                    <div>
                      <div>{myData.isMale ? `남자` : `여자`}</div>
                      <div>{`${myData.age}년생`}</div>
                    </div>
                  </div>
                </ProfileContentBox>
                {isMine ? <Button children={'프로필 수정'} /> : <>&nbsp;</>}
              </ProfileBox>
              <MsgBox>
                <div>{myData.welcomeMsg}</div>
              </MsgBox>
            </Background>
            <ChatButton />
          </Layout>
        </>
      ) : (
        <p>로드 중...</p>
      )}
    </div>
  );
}

const ProfileBox = styled.div`
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
