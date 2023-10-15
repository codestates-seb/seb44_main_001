import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Loading from './common/components/Loading';

const Home = lazy(() => import('./pages/Home/views/Home'));
const Signup = lazy(() => import('./pages/Signup/views/Signup'));
const OauthSignup = lazy(
  () => import('./pages/Oauth-Signup/views/OauthSignup'),
);
const OauthCallback = lazy(
  () => import('./pages/Oauth-Signup/views/OauthCallback'),
);
const Login = lazy(() => import('./pages/Login/views/Login'));
const User = lazy(() => import('./pages/User/views/User'));
const UserEdit = lazy(() => import('./pages/UserEdit/views/UserEdit'));
const Lists = lazy(() => import('./pages/Lists,Search/views/Lists'));
const Details = lazy(() => import('./pages/Details/views/Details'));
const Write = lazy(() => import('./pages/Write,Edit/views/Write'));
const NotFound404 = lazy(() => import('./pages/NotFound/views/NotFound404'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-signup" element={<OauthSignup />} />
        <Route path="/oauth-callback" element={<OauthCallback />} />
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
    </Suspense>
  );
};

export default Router;
