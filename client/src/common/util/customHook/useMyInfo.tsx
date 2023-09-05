import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getData } from '../../apis';
import { BASE_URL } from '../constantValue';
import { Member } from '../../type';

export default function useMyInfo() {
  const token = localStorage.getItem('Authorization');
  const {
    data: myData,
    isLoading,
    error,
  } = useQuery<void, AxiosError, Member>(
    ['myInfo'],
    () => getData(`${BASE_URL}/members/userInfo`),
    {
      enabled: !!token,
      staleTime: 30 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );
  return { myData, isLoading, error };
}
