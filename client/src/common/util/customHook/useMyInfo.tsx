import { useQuery,useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { getData } from '../../apis';
import { BASE_URL } from '../constantValue';
import { Member } from '../../type';

export default function useMyInfo() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Authorization');
  const queryClient = useQueryClient();
  const {
    data: myData,
    isLoading,
    error,
  } = useQuery<void, AxiosError, Member>(
    ['myInfo'],
    () => getData(`${BASE_URL}/members/userInfo`),
    {
      enabled: !!token,
      onError: (error) => {
        if (error.response?.status === 401 && token) {
          navigate('/');
          localStorage.clear();
          queryClient.clear();
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          console.error('오류가 발생했습니다.', error.message);
        }
      },
      staleTime: 30 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );
  return { myData, isLoading, error };
}
