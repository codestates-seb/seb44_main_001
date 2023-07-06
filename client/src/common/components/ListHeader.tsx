import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function ListHeader() {
  return (
    <ListsHeader>
      <div>
        <span className="region">{'광진구'}</span>
        <span>지역의 모모리스트</span>
        <span>지역필터가 들어올꺼야잉</span>
      </div>
      <Link to="/write">
        <Button children={'모집 글 작성'} />
      </Link>
    </ListsHeader>
  );
}
const ListsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  .region {
    color: var(--color-pink-1);
  }
`;
