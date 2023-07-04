import { useDispatch, useSelector } from 'react-redux';
import { regionData } from '../util/regionData';
import { ChangeEvent } from 'react';
import { RootState } from '../store/RootStore';
import { setLocation } from '../store/LocationFilterStore';

export default function RegionFilter() {
  const dispatch = useDispatch();

  const region = useSelector((state: RootState) => state.locationFilter.region);

  const district = useSelector(
    (state: RootState) => state.locationFilter.district,
  );

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region: event.target.value, district: '' }));
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region, district: event.target.value }));
  };

  return (
    <>
      <label htmlFor="region">지역 선택:</label>
      <select id="region" value={region} onChange={handleRegionChange}>
        <option value="">지역을 선택하세요</option>
        {Object.keys(regionData).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <label htmlFor="district">구/군 선택:</label>
      <select id="district" value={district} onChange={handleDistrictChange}>
        <option value="">구/군을 선택하세요</option>
        {region && regionData[region] ? (
          regionData[region].map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))
        ) : (
          <option disabled>지역을 먼저 선택하세요</option>
        )}
      </select>
    </>
  );
}
