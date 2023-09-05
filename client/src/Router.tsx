import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/views/Home'));
const Signup = lazy(() => import('./pages/Signup/views/Signup'));
const OauthSignup = lazy(
  () => import('./pages/Kakao-signup/views/OauthSignup'),
);
const OauthCallback = lazy(
  () => import('./pages/Kakao-signup/views/OauthCallback'),
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
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/oauth-signup"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <OauthSignup />
          </Suspense>
        }
      />
      <Route
        path="/oauth-callback"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <OauthCallback />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/user/:memberId"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <User />
          </Suspense>
        }
      />
      <Route
        path="/user/edit"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <UserEdit />
          </Suspense>
        }
      />
      <Route
        path="/lists"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Lists />
          </Suspense>
        }
      />
      <Route
        path="/search/:keyword"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Lists />
          </Suspense>
        }
      />
      <Route
        path="/details/:id/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Details />
          </Suspense>
        }
      />
      <Route
        path="/write"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Write />
          </Suspense>
        }
      />
      <Route
        path="/write/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Write />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound404 />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Router;
