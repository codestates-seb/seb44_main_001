import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../constantValue';
import { getData } from '../../apis';

export default function useCategorySetter() {
  const queryClient = useQueryClient();

  useQuery(['getCategory'], () => getData(`${BASE_URL}/categories`), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('categories', JSON.stringify(data));
      }
    },
  });

  useEffect(() => {
    const categories = localStorage.getItem('categories');

    if (!categories) {
      queryClient.prefetchQuery(['getCategory']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
