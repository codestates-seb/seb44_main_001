import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../common/components/Button';
import LocationSelector from '../../../common/components/LocationSelector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { useEffect } from 'react';
import { setSelectedLocation } from '../store/SelectedLocation';
import { useParams } from 'react-router-dom';

export default function ListsHeader() {
  const dispatch = useDispatch();
  const params = useParams();
  
  const location = useSelector((state: RootState) => state.location.district);
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  // 유저의 등록된 지역으로 수정하기
  // 사용자가 지역을 바꾼다면 그걸로 전체 랜더링되게?

  // useEffect(() => {
  //   dispatch(setSelectedLocation("유저의 지역"));
  // }, [dispatch]);

  return (
    <Wrapper>
      <LocationInfo>
        <div className="listName">
          <span className="location">{params.keyword || '유저의지역'}</span>
          <span>{params.keyword ? ' 검색결과' : ' 지역의 모모리스트'}</span>
        </div>
        {params.keyword ? null : (
          <>
            <LocationSelector />
            <Button
              children={'지역 선택'}
              onClick={() => dispatch(setSelectedLocation(location))}
            />
          </>
        )}
      </LocationInfo>
      <Link to="/write">
        <Button children={'모집 글 작성'} />
      </Link>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 1264px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 3rem;
  .listName {
    margin-right: 2rem;
    display: flex;
  }
  .location {
    color: var(--color-pink-1);
  }
  select {
    margin-right: 1rem;
  }
  @media (max-width: 1024px) {
    width: 832px;
    /* .listName{
      flex-direction: column;
      align-items: center;
    } */
  }
  @media (max-width: 768px) {
    width: 400px;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
`;
