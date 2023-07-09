import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import profile from '../assets/profile.svg';
import { CardData } from '../type';

export default function Card({
  title,
  content,
  userImg,
  userName,
  postId,
}: CardData) {
  return (
    <Wrapper>
      <UserInfo>
        <img className="userImg" src={profile}></img>
        <span className="userName">유저의 닉네임</span>
      </UserInfo>
      <Content>
        <Link to={`/details/${postId}`}>
          <div className="title">{title}</div>
          <div className="content">
            {content.length >= 90 ? `${content?.slice(0, 90)}...` : content}
          </div>
        </Link>
      </Content>
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
  padding: 2rem;
  * {
    color: var(--color-black);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .userImg {
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
    margin-bottom: 1rem;
  }
  .content {
    line-height: 1.3;
  }
`;
