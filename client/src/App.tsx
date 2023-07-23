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
import { useLocation, useNavigate } from 'react-router-dom';
import ChatModal from './common/components/Chat/views/ChatModal';
import scrollToTop from './common/util/customHook/useScrollToTop';


export default function App() {
  scrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token: string | null = localStorage.getItem('Authorization');
  const memberId: string | null = localStorage.getItem('MemberId');

  useQuery<void, AxiosError, number>(
    'userInfo',
    () => MyData(`${BASE_URL}/members/${memberId}`),
    {
      enabled: !!token,
      onSuccess: (data) => {
        dispatch(setMyData(data));
      },
      onError: (error) => {
        if (error.response?.status === 401 && token) {
          navigate('/login');
          localStorage.clear();
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          console.error('오류가 발생했습니다.', error.message);
        }
      },
    },
  );

  return (
    <>
      <GlobalStyle />
      {location.pathname !== '/' && <Header />}
      <Router />
      {token && <ChatModal />}
      <Footer />
    </>
  );
}
