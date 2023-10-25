import Router from './Router';
import { useLocation } from 'react-router-dom';
import { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';

import { GlobalStyle } from './common/style';
import Header from './common/components/Header';
import Footer from './common/components/Footer';
import ChatModal from './common/components/Chat/views/ChatModal';

import { AUTHORIZATION } from './common/util/constantValue';
import { useEffect } from 'react';

Quill.register('modules/imageResize', ImageResize);

export default function App() {
  const location = useLocation();
  const token: string | null = localStorage.getItem(AUTHORIZATION);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/lists") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
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
