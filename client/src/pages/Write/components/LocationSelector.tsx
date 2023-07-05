import { useDispatch, useSelector } from 'react-redux';
import { regionData } from '../../../common/util/regionData';
import { ChangeEvent } from 'react';
import { RootState } from '../../../common/store/RootStore';
import { setLocation } from '../../../common/store/LocationStore';
import {
  DISTRICT_ALERT_MESSAGE,
  DISTRICT_MESSAGE,
  REGION,
  REGION_MESSAGE,
} from '../../../common/util/constantValue';
import { setCreatedPost } from '../store/CreatedPost';

export default function LocationSelector() {
  const dispatch = useDispatch();

  const region = useSelector((state: RootState) => state.location.region);

  const district = useSelector((state: RootState) => state.location.district);

  const data = useSelector((state: RootState) => state.createdPost);

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region: event.target.value, district: '' }));
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ region, district: event.target.value }));
    dispatch(
      setCreatedPost({ ...data, location: `${region} ${event.target.value}` }),
    );
  };

  return (
    <section>
      <label htmlFor="region">{REGION}</label>
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
    </section>
  );
}
