import Router from './Router';
import { GlobalStyle } from './common/style';
import { Layout } from './common/style';
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}
