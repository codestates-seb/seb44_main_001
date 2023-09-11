import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BASE_URL } from '../constantValue';
import { getData } from '../../apis';
import { CATEGORIES } from '../constantValue';

export default function useCategorySetter() {
  const queryClient = useQueryClient();

  useQuery(['getCategory'], () => getData(`${BASE_URL}/categories`), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem(CATEGORIES, JSON.stringify(data));
      }
    },
  });

  useEffect(() => {
    const categories = localStorage.getItem(CATEGORIES);

    if (!categories) {
      queryClient.prefetchQuery(['getCategory']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
