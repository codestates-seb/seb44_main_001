import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setSelectedLocation } from '../store/SelectedLocation';
import LocationSelector from '../../../common/components/LocationSelector';
import Button from '../../../common/components/Button';

export default function ListsHeader() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const params = useParams();

  //로그인 전역상태 구현시 삭제
  const [islogin, setIsLogin] = useState(true);

  const location = useSelector((state: RootState) => state.location);

  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  // 유저의 등록된 지역으로 수정하기

  // useEffect(() => {
  //   dispatch(setSelectedLocation("유저의 지역"));
  // }, []);

  // console.log(selectedLocation, selectedCategory);
  return (
    <Wrapper>
      <LocationInfo>
        <div className="listName">
          <span className="location">
            {params.keyword || selectedLocation.province}
          </span>
          <span>{params.keyword ? '검색결과' : '모모리스트'}</span>
        </div>
        {params.keyword ? null : (
          <>
            <LocationSelector />
            <Button
              children={'지역 선택'}
              onClick={() => {
                if (!location.province) {
                  return;
                }
                dispatch(setSelectedLocation(location));
              }}
            />
          </>
        )}
      </LocationInfo>
      <Button
        onClick={() => {
          if (!islogin) {
            alert('로그인이 필요한 서비스 입니다.');
            navigate('/login');
          } else {
            navigate('/write');
          }
        }}
        children={'모집 글 작성'}
      />
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
  @media (max-width: 768px) {
    width: 400px;
    .listName {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
  }
  }

  @media (min-width: 769px) and (max-width: 1264px) {
    width: 832px;
    justify-content: space-evenly;
  }

  @media (min-width: 1265px) {
    width: 1264px;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
`;
