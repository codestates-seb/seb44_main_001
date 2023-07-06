import Router from './Router';
import Header from './common/components/Header';
import { GlobalStyle } from './common/style';
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
}
