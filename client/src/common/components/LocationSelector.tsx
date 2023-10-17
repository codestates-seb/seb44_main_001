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
import { LOCATIONS } from '../util/constantValue';
interface LocationSelectorProps {
  onLocationChange?: (locationId: number | null) => void;
}

export default function LocationSelector({
  onLocationChange,
}: LocationSelectorProps) {
  useLocationSetter();

  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  const locationsString = localStorage.getItem(LOCATIONS);
  const locations: Locations = locationsString && JSON.parse(locationsString);

  const city = useSelector((state: RootState) => state.location.city);

  const province = useSelector((state: RootState) => state.location.province);

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;

    const cityToLocationIdMap: {
      [key: string]: number;
    } = {
      서울특별시: 1,
      인천광역시: 2,
      부산광역시: 3,
      대전광역시: 4,
      대구광역시: 5,
      울산광역시: 6,
      광주광역시: 7,
      제주특별자치도: 8,
      세종특별자치시: 9,
      경기도: 10,
      강원도: 11,
      충청북도: 12,
      충청남도: 13,
      경상북도: 14,
      경상남도: 15,
      전라북도: 16,
      전라남도: 17,
    };

    const selectedLocationId = cityToLocationIdMap[selectedCity];

    if (pathname === '/lists') {
      dispatch(
        setLocation({
          city: selectedCity,
          province: '전체',
          locationId: selectedLocationId,
        }),
      );
    } else {
      dispatch(setLocation({ city: selectedCity, province: '' }));
    }
  };

  const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationId: number | undefined = locations?.find(
      (location: Location) =>
        location.city === city && location.province === event.target.value,
    )?.locationId;

    dispatch(setLocation({ city, province: event.target.value, locationId }));
    if (onLocationChange) {
      onLocationChange(locationId as number);
    }
  };

  return (
    <Container>
      <div>
        <select aria-label="city" id="city" value={city} onChange={handleCityChange}>
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
        <select aria-label="province" id="province" value={province} onChange={handleProvinceChange}>
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
