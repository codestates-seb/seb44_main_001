import { keyframes, styled } from 'styled-components';
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
  tags,
}: CardData) {
  const { profileImage, nickname }: MemberInfo = memberInfo;
  const { city, province } = locationInfo;
  const category = categoryInfo.name;

  return (
    <Wrapper to={`/details/${postId}`}>
      <UserInfo>
        <img
          className="profileImage"
          src={profileImage ? profileImage : profile}
        />
        <span className="nickname">{nickname}</span>
      </UserInfo>
      <Content>
        <div className="title">{title}</div>
        <div className="content">
          {content.length >= 90 ? `${content?.slice(0, 75)}...` : content}
        </div>
      </Content>
      <TagSection>
        {tags.slice(0, 4).map((tag: string) => (
          <div key={tag}>{`#${tag}`}</div>
        ))}
      </TagSection>
      <SortArea>
        <div className="location">{`${city} ${province}`}</div>
        <div className="category">{category}</div>
      </SortArea>
    </Wrapper>
  );
}
const slideDownAnimation = keyframes`
  from {
    transform: translateY(15%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 16rem;
  background-color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: 10px;
  padding: 1.5rem;
  transition: transform 0.2s ease-out;
  animation: ${slideDownAnimation} 0.5s ease-in-out;
  * {
    color: var(--color-black);
  }
  &:hover {
    border-color: var(--color-pink-1);
    transform: translate(-5px, -5px);
    box-shadow: 5px 5px 0px 0px rgba(255, 192, 203, 1);
  }
  &:active {
    box-shadow: none;
    transform: translate(0, 0);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .profileImage {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    object-fit: cover;
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
    border-radius: 5px;
  }
`;

const TagSection = styled.section`
  display: flex;
  margin-bottom: 1rem;

  > div {
    font-size: var(--font-size-xs);
    margin-right: 1rem;
    border-radius: 5px;
    background: var(--color-gray);
    padding: 0.3rem;
  }
`;
