import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { RootState } from '../../../common/store/RootStore';
import { setSelectedLocation } from '../store/SelectedLocation';
import { setLocation } from '../../../common/store/LocationStore';

import LocationSelector from '../../../common/components/LocationSelector';
import Button from '../../../common/components/Button';
import {
  AUTHORIZATION,
  SELECTEDLOCATION,
} from '../../../common/util/constantValue';
import { Location, Member } from '../../../common/type';
import Loading from '../../../common/components/Loading';

export default function ListsHeader({
  selectedLocation,
  myData,
  isLoading,
}: {
  selectedLocation: Location;
  myData?: Member;
  isLoading?: boolean;
}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const isLogin = localStorage.getItem(AUTHORIZATION) || null;

  const location = useSelector((state: RootState) => state.location);

  const handleLocationSelection = () => {
    if (!location.province) {
      return;
    }
    dispatch(setSelectedLocation(location));
    localStorage.setItem(SELECTEDLOCATION, JSON.stringify(location));
  };

  useEffect(() => {
    const LastSelectedLocation = localStorage.getItem(SELECTEDLOCATION);

    if (LastSelectedLocation) {
      dispatch(setSelectedLocation(JSON.parse(LastSelectedLocation)));
      dispatch(setLocation(JSON.parse(LastSelectedLocation)));
      return;
    }

    if (isLogin && myData?.location) {
      dispatch(setSelectedLocation(myData.location));
      dispatch(setLocation(myData.location));
      return;
    }

    dispatch(setLocation(selectedLocation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);

  const listName =
    params.keyword || `${selectedLocation.city} ${selectedLocation.province}`;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="listName">
        <span className="location">{listName}</span>
        &nbsp;
        <span>{params.keyword ? '검색결과' : '모모리스트'}</span>
      </div>
      {params.keyword ? (
        <Button
          children={'목록 페이지로 돌아가기'}
          onClick={() => navigate('/lists')}
        />
      ) : (
        <SelectorWrapper>
          <LocationSelector />
          <Button
            className="firstBtn"
            children={'지역 선택'}
            onClick={handleLocationSelection}
          />
        </SelectorWrapper>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 1264px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 3rem;
  background-color: var(--color-white);
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--color-black);
  color: var(--color-black);
  select {
    width: 12rem;
    margin-right: 1rem;
  }
  .listName {
    margin-right: 2rem;
    display: flex;
    align-items: center;
  }
  .location {
    background-color: var(--color-pink-1);
    padding: 3px;
    border-radius: 5px;
  }

  @media (max-width: 832px) {
    width: 400px;
    flex-direction: column;
    .listName {
      display: flex;
      align-items: center;
      margin-right: 0;
    }
    select {
      display: flex;
    }
    #city {
      margin-bottom: 0.5rem;
    }
  }

  @media (min-width: 832px) and (max-width: 1264px) {
    width: 832px;

    .listName {
      margin-right: 0;
    }
    select {
      width: 8rem;
      margin-right: 1rem;
    }
  }

  @media (min-width: 1265px) {
    width: 1264px;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  .firstBtn {
    margin-right: 1rem;
  }
  @media (max-width: 832px) {
    margin-top: 1rem;
    .firstBtn {
      margin-right: 1rem;
    }
  }
`;
