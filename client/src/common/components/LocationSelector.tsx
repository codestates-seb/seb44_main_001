import { useDispatch, useSelector } from 'react-redux';
import { regionData } from '../util/regionData';
import { ChangeEvent } from 'react';
import { RootState } from '../store/RootStore';
import { setLocation } from '../store/LocationStore';
import {
  DISTRICT_ALERT_MESSAGE,
  DISTRICT_MESSAGE,
  REGION_MESSAGE,
} from '../util/constantValue';
import { styled } from 'styled-components';

interface LocationSelectorProps {
  onLocationChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function LocationSelector({
  onLocationChange,
}: LocationSelectorProps) {
  const dispatch = useDispatch();

  const region = useSelector((state: RootState) => state.location.region);

  const district = useSelector((state: RootState) => state.location.district);

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region: event.target.value, district: '' }));
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region, district: event.target.value }));
    // onLocationChange(event);
    //! 지역 ID 나오면 수정 예정
  };

  return (
    <Container>
      <div>
        <select id="region" value={region} onChange={handleRegionChange}>
          <option disabled value="">
            {REGION_MESSAGE}
          </option>
          {Object.keys(regionData).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select id="district" value={district} onChange={handleDistrictChange}>
          <option disabled value="">
            {DISTRICT_MESSAGE}
          </option>
          {region && regionData[region] ? (
            regionData[region].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))
          ) : (
            <option disabled>{DISTRICT_ALERT_MESSAGE}</option>
          )}
        </select>
      </div>
    </Container>
  );
}

const Container = styled.div`
  & select {
    width: 15rem;
    color: var(--color-black);
  }

  & select option[value=''][disabled] {
    display: none;
  }
`;
