import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { getData } from '../../apis';
import { BASE_URL } from '../constantValue';
import { Member } from '../../type';

export default function useMyInfo() {
  const navigate = useNavigate();
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
      onSuccess:(myData)=>{
        console.log(myData);
      },
      onError: (error) => {
        if (error.response?.status === 401 && token) {
          navigate('/');
          localStorage.clear();
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          console.error('오류가 발생했습니다.', error.message);
        }
      },
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  return { myData, isLoading, error };
}
