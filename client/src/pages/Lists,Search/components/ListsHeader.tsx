import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { RootState } from '../../../common/store/RootStore';
import { setSelectedLocation } from '../store/SelectedLocation';
import { setLocation } from '../../../common/store/LocationStore';

import LocationSelector from '../../../common/components/LocationSelector';
import Button from '../../../common/components/Button';

export default function ListsHeader() {
  const dispatch = useDispatch();

  const params = useParams();

  const isLogin = localStorage.getItem('Authorization') || null;

  const myData =
    useSelector((state: RootState) => state.myData.location) || null;

  //셀렉터 지역 상태
  const location = useSelector((state: RootState) => state.location);

  //사용자가 셀렉터에서 선택한 지역상태
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  //소분류까지 선택 안하면 동작 안됨
  const handleLocationSelection = () => {
    if (!location.province) {
      return;
    }
    dispatch(setSelectedLocation(location));
    localStorage.setItem('selectedLocation', JSON.stringify(location));
  };

  //로그인 했으면 유저의 지역으로 아니면 기본값인 서울로 랜더링
  useEffect(() => {
    const LocalStorageLocaion = localStorage.getItem('selectedLocation');
    if (LocalStorageLocaion) {
      dispatch(setSelectedLocation(JSON.parse(LocalStorageLocaion)));
    } else if (isLogin && myData) {
      dispatch(
        setSelectedLocation({
          locationId: myData.locationId,
          city: myData.city,
          province: myData.province,
        }),
      );
    } else {
      dispatch(setLocation(selectedLocation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);

  const listName =
    params.keyword || `${selectedLocation.city} ${selectedLocation.province}`;

  return (
    <Wrapper>
        <div className="listName">
          <span className="location">{listName}</span>
          <span>{params.keyword ? '검색결과' : '모모리스트'}</span>
        </div>
        {params.keyword ? null : (
          <SelectorWrapper>
            <LocationSelector />
            <Button children={'지역 선택'} onClick={handleLocationSelection} />
          </SelectorWrapper>
        )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1264px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 3rem;

  select {
    width: 12rem;
    margin-right: 1rem;
  }
  .listName {
    margin-right: 2rem;
    display: flex;
  }
  .location {
    color: var(--color-pink-1);
  }

  //카드1개
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

  //카드2개
  @media (min-width: 832px) and (max-width: 1264px) {
    width: 832px;
    .listName {
      margin-right: 0;
    }
  }

  //카드3개
  @media (min-width: 1265px) {
    width: 1264px;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1264px) {
    margin-top: 1rem;
  }
`;
