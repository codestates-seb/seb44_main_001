import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { RootState } from '../../../common/store/RootStore';
import { setSelectedLocation } from '../store/SelectedLocation';
import LocationSelector from '../../../common/components/LocationSelector';
import Button from '../../../common/components/Button';
import { Locations } from '../../../common/type';
import { setLocation } from '../../../common/store/LocationStore';

export default function ListsHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const isLogin = localStorage.getItem('Authorization') || null;

  const myData =
    useSelector((state: RootState) => state.myData.location) || null;

  const location = useSelector((state: RootState) => state.location);

  //셀렉터 지역 상태
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  const handleLocationSelection = () => {
    if (!location.province) {
      return;
    }
    dispatch(setSelectedLocation(location));
  };

  const handleWriteButtonClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/login');
    } else {
      navigate('/write');
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
  }, [selectedLocation]);

  // 유저의 등록된 지역으로 수정하기
  useEffect(() => {
    const LocalStorageLocaion = localStorage.getItem("selectedLocation");
    if(LocalStorageLocaion){
      dispatch(setSelectedLocation(JSON.parse(LocalStorageLocaion)));
    } else if (isLogin) {
      const userLoctoin = {
        locationId: myData.locationId,
        city: myData.city,
        province: myData.province,
      };
      dispatch(
        setSelectedLocation({
          locationId: myData.locationId,
          city: myData.city,
          province: myData.province,
        }),
      );
      dispatch(setLocation(userLoctoin));
    } else {
      const defaultLocation = {
        locationId: 1,
        city: '서울특별시',
        province: '전체',
      };
      dispatch(setLocation(defaultLocation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listName =
    params.keyword || `${selectedLocation.city} ${selectedLocation.province}`;

  return (
    <Wrapper>
      <LocationInfo>
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
      </LocationInfo>
      <ButtonWarpper>
        <Button onClick={handleWriteButtonClick} children={'모집 글 작성'} />
      </ButtonWarpper>
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

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1264px) {
    flex-direction: column;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1264px) {
    margin-top: 1rem;
  }
`;

const ButtonWarpper = styled.div`
  button {
    @media (max-width: 832px) {
      margin-top: 1rem;
    }
  }
`;
