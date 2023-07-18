import { useQuery } from 'react-query';
import Router from './Router';
import Header from './common/components/Header';
import { GlobalStyle } from './common/style';
import MyData from './pages/Login/api/getMyData';
import { BASE_URL } from './common/util/constantValue';
import { useDispatch } from 'react-redux';
import { setMyData } from './pages/Login/store/MyUserData';

export default function App() {
  const dispatch = useDispatch();

  const token: string | null = localStorage.getItem('Authorization');
  const memberId: string | null = localStorage.getItem('MemberId');

  useQuery<void, unknown, number>(
    'userInfo',
    () => MyData(`${BASE_URL}/members/${memberId}`, token as string),
    {
      onSuccess: (data) => {
        dispatch(setMyData(data));
      },
    },
  );

  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
}
