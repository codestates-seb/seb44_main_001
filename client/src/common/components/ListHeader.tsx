import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';
import LocationSelector from './LocationSelector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/RootStore';
import { useEffect } from 'react';
import { setSelectedLocation } from '../../pages/Lists/store/SelectedLocation';

export default function ListHeader() {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location.district);
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation.selectedLocation,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory.selectedCategory,
  );
  console.log(selectedLocation, selectedCategory);
  
  //유저의 등록된 지역으로 수정하기
  //사용자가 지역을 바꾼다면 그걸로 전체 랜더링되게?
  useEffect(() => {
    dispatch(setSelectedLocation('광진구'));
  }, [dispatch]);

  return (
    <ListsHeader>
      <LocationInfo>
        <div className="listName">
          <span className="location">{selectedLocation}</span>
          <span>지역의 모모리스트</span>
        </div>
        <div className="locationSelector">
          <LocationSelector/>
        </div>
        <Button
          children={'찾기'}
          onClick={() => dispatch(setSelectedLocation(location))}
        />
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
  align-items: center;
  font-size: 1.5rem;
  .listName {
    margin-right: 2rem;
  }
  .location {
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
