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
import { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';

Quill.register('modules/imageResize', ImageResize);

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token: string | null = localStorage.getItem('Authorization');

  useQuery<void, AxiosError, number>(
    'userInfo',
    () => MyData(`${BASE_URL}/members/userInfo`),
    {
      enabled: !!token,
      onSuccess: (data) => {
        dispatch(setMyData(data));
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
    },
  );

  return (
    <>
      <GlobalStyle />
      {!(
        location.pathname === '/' ||
        location.pathname === '/oauth-signup' ||
        location.pathname === '/signup'
      ) && <Header />}
      <Router />
      {token && <ChatModal />}
      <Footer />
    </>
  );
}
