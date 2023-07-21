import { Route, Routes } from 'react-router-dom';
import Write from './pages/Write,Edit/views/Write';
import Home from './pages/Home/views/Home';
import Signup from './pages/Signup/views/Signup';
import KakaoSignup from './pages/Kakao-signup/views/KakaoSignup';
import Login from './pages/Login/views/Login';
import User from './pages/User/views/User';
import UserEdit from './pages/UserEdit/views/UserEdit';
import Lists from './pages/Lists,Search/views/Lists';
import Details from './pages/Details/views/Details';
import KakaoCallback from './pages/Kakao-signup/views/KakaoCallback';
import NotFound404 from './pages/NotFound/views/NotFound404';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/kakao-signup" element={<KakaoSignup />} />
      <Route path="/kakao-callback" element={<KakaoCallback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:memberId" element={<User />} />
      <Route path="/user/edit" element={<UserEdit />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/search/:keyword" element={<Lists />} />
      <Route path="/details/:id/" element={<Details />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:id" element={<Write />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default Router;
