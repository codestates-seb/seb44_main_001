import { useQuery } from 'react-query';
import Router from './Router';
import Header from './common/components/Header';
import { GlobalStyle } from './common/style';
import MyData from './pages/Login/api/getMyData';
import { BASE_URL } from './common/util/constantValue';
import { useDispatch } from 'react-redux';
import { setMyData } from './pages/Login/store/MyUserData';
import Footer from './common/components/Footer';
import { AxiosError } from 'axios';

export default function App() {
  const dispatch = useDispatch();

  const token: string | null = localStorage.getItem('Authorization');
  const memberId: string | null = localStorage.getItem('MemberId');

  useQuery<void, AxiosError, number>(
    'userInfo',
    () => MyData(`${BASE_URL}/members/${memberId}`, token as string),
    {
      enabled: token !== null,
      onSuccess: (data) => {
        dispatch(setMyData(data));
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          //리프레시토큰요청
          console.error('토큰이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          // 다른 오류 처리
          console.error('오류가 발생했습니다.', error.message);
        }
      },
    },
  );

  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
      <Footer />
    </>
  );
}
