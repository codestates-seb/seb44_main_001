import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from './Card';

interface Content {
  userImg: string;
  userName: string;
  title: string;
  content: string;
}

export default function Cards({ lists }: { lists: Content[] }) {
  return (
    <div>
      <ListsHeader>
        <div>
          <span className="region">{'광진구'}</span>
          <span>지역의 모모리스트</span>
          <span>지역필터가 들어올꺼야잉</span>
        </div>
        <button>
          <Link to="/write">글 작성하기 버튼</Link>
        </button>
      </ListsHeader>
      {lists.length ? (
        <Lists>
          {lists.map((el, index) => (
            <Card
              key={index}
              title={el.title}
              content={el.content}
              userImg={el.userImg}
              userName={el.userName}
            />
          ))}
        </Lists>
      ) : (
        <div>모임 만들어줘잉</div>
      )}
    </div>
  );
}

const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;
const ListsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  .region {
    color: var(--color-pink-1);
  }
`;
