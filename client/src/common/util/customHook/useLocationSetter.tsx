import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../constantValue';
import { getData } from '../../apis';
import { LOCATIONS } from '../constantValue';

export default function useLocationSetter() {
  const queryClient = useQueryClient();

  useQuery(['getLocation'], () => getData(`${BASE_URL}/locations`), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem(LOCATIONS, JSON.stringify(data));
      }
    },
  });

  useEffect(() => {
    const locations = localStorage.getItem(LOCATIONS);

    if (!locations) {
      queryClient.prefetchQuery(['getLocation']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
