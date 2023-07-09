import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../common/components/Button';
import { useParams } from 'react-router-dom';

export default function SearchListHeader() {
 const param = useParams();

  return (
    <ListsHeader>
      <LocationInfo>
        <div className="listName">
          <span className="keyword">{param.keyword}</span>
          <span> 검색결과</span>
        </div>
        <div className="locationSelector"></div>
      </LocationInfo>
      <Link to="/write">
        <Button children={'모집 글 작성'} />
      </Link>
    </ListsHeader>
  );
}

const ListsHeader = styled.div`
  min-width: 1264px;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  align-items: center;
  font-size: 1.5rem;
  .listName {
    margin-right: 2rem;
  }
  .keyword {
    color: var(--color-pink-1);
  }
  select {
    margin-right: 1rem;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
`;
