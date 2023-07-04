import { Route, Routes } from 'react-router-dom';
import Write from './pages/Write/views/Write';
import Home from './pages/Home/views/Home';
import Signup from './pages/Signup/views/Signup';
import KakaoSignup from './pages/Kakao-signup/views/KakaoSignup';
import Login from './pages/Login/views/Login';
import User from './pages/User/views/User';
import UserEdit from './pages/UserEdit/views/UserEdit';
import Lists from './pages/Lists/views/Lists';
import Details from './pages/Details/views/Details';
import NotFound from './pages/NotFound/Views/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/kakao-signup" element={<KakaoSignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/edit" element={<UserEdit />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/details" element={<Details />} />
      <Route path="/write" element={<Write />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default Router;