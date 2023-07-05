import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
interface Content {
  userImg: string;
  userName: string;
  title?: string;
  content?: string;
}
export default function Card({ title, content, userImg, userName }:Content) {
  return (
    <Wrapper>
      <UserInfo userImg={userImg} userName={userName}/>
      <Link to="/detail/postsId">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 16rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-black);
  border-radius: 10px;
  padding: 2rem;
  .title {
    font-family: 'BR-Bold';
    margin-bottom: 1rem;
  }
`;
export function UserInfo({userImg,userName}:Content) {
  return (
    <div>
      <span className="userImage">{userImg}</span>
      <span className="userName">{userName}</span>
    </div>
  );
}
