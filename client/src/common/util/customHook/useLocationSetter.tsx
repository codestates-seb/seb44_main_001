import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../constantValue';
import getLocation from './api/getLocation';

export default function useLocationSetter() {
  const queryClient = useQueryClient();

  useQuery(['getLocation'], () => getLocation(`${BASE_URL}/locations`), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('locations', JSON.stringify(data));
      }
    },
  });

  useEffect(() => {
    const locations = localStorage.getItem('locations');

    if (!locations) {
      queryClient.prefetchQuery(['getLocation']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
