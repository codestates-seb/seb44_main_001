import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../constantValue';
import getCategory from './api/getCategory';

export default function useCategorySetter() {
  const queryClient = useQueryClient();

  useQuery(['getCategory'], () => getCategory(`${BASE_URL}/categories`), {
    enabled: false,
    onSuccess: (response) => {
      localStorage.setItem('categories', JSON.stringify(response));
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
