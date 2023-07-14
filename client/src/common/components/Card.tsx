import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { CardData, MemberInfo } from '../type';
import profile from '../assets/profile.svg';

export default function Card({
  title,
  content,
  postId,
  memberInfo,
  locationInfo,
  categoryInfo,
}: CardData) {
  const { profileImage, nickname }: MemberInfo = memberInfo;
  const { city, province } = locationInfo;
  const category = categoryInfo.name;

  return (
    <Wrapper>
      <UserInfo>
        <img
          className="profileImage"
          src={profileImage ? profileImage : profile}
        />
        {/* profileImage 로 수정해야함 */}
        <span className="nickname">{nickname}</span>
        {/* nickname 로 수정해야함 */}
      </UserInfo>
      <Content>
        <Link to={`/details/${postId}`}>
          <div className="title">{title}</div>
          <div className="content">
            {content.length >= 90 ? `${content?.slice(0, 75)}...` : content}
          </div>
        </Link>
      </Content>
      <SortArea>
        <div className="location">{`${city} ${province}`}</div>
        <div className="category">{category}</div>
      </SortArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 16rem;
  background-color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: 10px;
  padding: 1.5rem;
  * {
    color: var(--color-black);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .profileImage {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  margin-top: 1rem;
  flex-grow: 1;
  .title {
    font-family: 'BR-Bold';
    font-size: var(--font-size-m);
    margin-bottom: 0.5rem;
  }
  .content {
    line-height: 1.5;
  }
`;

const SortArea = styled.div`
  display: flex;
  .location {
    margin-right: 1rem;
  }
  * {
    padding: 0.5rem;
    background-color: var(--color-pink-1);
    border-radius: 10px;
  }
`;
