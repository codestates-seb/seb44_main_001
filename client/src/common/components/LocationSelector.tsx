import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { RootState } from '../store/RootStore';
import { setLocation } from '../store/LocationStore';
import {
  CITY_MESSAGE,
  PROVINCE_ALERT_MESSAGE,
  PROVINCE_MESSAGE,
} from '../util/constantValue';
import { styled } from 'styled-components';
import useLocationSetter from '../util/customHook/useLocationSetter';
import { Locations } from '../type';
import { Location } from '../type';

interface LocationSelectorProps {
  onLocationChange?: (locationId: number | null) => void;
}

export default function LocationSelector({
  onLocationChange,
}: LocationSelectorProps) {
  useLocationSetter();

  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  const locations: Locations | null = JSON.parse(
    localStorage.getItem('locations') || 'null',
  );

  const city = useSelector((state: RootState) => state.location.city);

  const province = useSelector((state: RootState) => state.location.province);

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation({ city: event.target.value, province: '' }));
  };

  const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationId: number | null = JSON.parse(
      localStorage.getItem('locations') || 'null',
    )?.find(
      (location: Location) =>
        location.city === city && location.province === event.target.value,
    )?.locationId;

    dispatch(setLocation({ city, province: event.target.value, locationId }));
    if (onLocationChange) {
      onLocationChange(locationId);
    }
  };

  return (
    <Container>
      <div>
        <select id="city" value={city} onChange={handleCityChange}>
          <option disabled value="">
            {CITY_MESSAGE}
          </option>
          {locations
            ?.filter(
              (location, index, self) =>
                self.findIndex((l) => l.city === location.city) === index,
            )
            .map((location) => (
              <option key={location.locationId} value={location.city}>
                {location.city}
              </option>
            ))}
        </select>
        <select id="province" value={province} onChange={handleProvinceChange}>
          <option disabled value="">
            {PROVINCE_MESSAGE}
          </option>
          {city ? (
            locations
              ?.filter(
                (location) =>
                  location.city === city &&
                  (pathname !== '/lists' ? location.province !== '전체' : true),
              )
              .map((location) => (
                <option key={location.locationId} value={location.province}>
                  {location.province}
                </option>
              ))
          ) : (
            <option disabled>{PROVINCE_ALERT_MESSAGE}</option>
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
    outline: none;
  }

  & select option[value=''][disabled] {
    display: none;
  }
`;
