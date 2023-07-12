import { styled } from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';

import SemiHeader from '../../../common/components/SemiHeader';
import Button from '../../../common/components/Button';
import { Layout } from '../../../common/style';
import { Background } from '../../Signup/views/Signup';
import profile from '../../../common/assets/profile.svg';
import { RootState } from '../../../common/store/RootStore';
import { Member } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import { getMember } from '../store/MemberStore';
import ChatButton from '../../../common/components/Chat/views/ChatModal';

export default function User() {
  const [isMine, setIsMine] = useState(true);
  const memberId = 5;

  const data: Member = useSelector((state: RootState) => state.member);

  const userMutation = useMutation<void, unknown, Member>(async () => {
    // getMember(`${BASE_URL}/members/${data.memberId}`);
    getMember(`${BASE_URL}/members/${memberId}`);
  });

  return (
    <div>
      <SemiHeader title={`${data?.nickname} 의 프로필`} content="" />
      <Layout>
        <Background>
          <ProfileBox>
            <ProfileContentBox style={{ display: 'flex' }}>
              <ProfileImg
                src={data?.nickname ? `${data?.nickname}` : profile}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2rem',
                }}
              >
                <div>{data?.nickname}</div>
                <div>{data?.location}</div>
                <div>
                  <div>{data?.isMale ? `남자` : `여자`}</div>
                  <div>{`${data?.age}년생`}</div>
                </div>
              </div>
            </ProfileContentBox>
            {isMine ? <Button children={'프로필 수정'} /> : <>&nbsp;</>}
          </ProfileBox>
          <MsgBox>
            <div>{data?.welcomeMsg}</div>
          </MsgBox>
        </Background>
        <ChatButton />
      </Layout>
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
