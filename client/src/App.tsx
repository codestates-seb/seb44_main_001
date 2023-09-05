import Router from './Router';
import { useLocation } from 'react-router-dom';
import { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';

import { GlobalStyle } from './common/style';
import Header from './common/components/Header';
import Footer from './common/components/Footer';
import ChatModal from './common/components/Chat/views/ChatModal';

Quill.register('modules/imageResize', ImageResize);

export default function App() {
  const location = useLocation();
  const token: string | null = localStorage.getItem('Authorization');

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
