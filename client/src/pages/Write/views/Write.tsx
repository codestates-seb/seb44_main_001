import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import Form from '../components/Form';
import { styled } from 'styled-components';

export default function Write() {
  return (
    <>
      <SemiHeader title="모모 친구 구하기" content="" />
      <Layout>
        <Container>
          <Form />
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  border: 2px solid var(--color-black);
  width: 50rem;
  padding: 2rem;
  margin: 2rem 0 2rem 0;
  border-radius: 10px;
  background: var(--color-white);
  font-size: var(--font-size-m);

  & input {
    border: 1px solid var(--color-black);
    padding: 0.5rem;
    border-radius: 5px;
    margin: 1rem 0 2rem 0;
    font-family: 'BR-Regular';
    font-size: var(--font-size-s);
    color: var(--color-black);
  }

  & select {
    width: 15rem;
    border: 1px solid var(--color-black);
    padding: 0.5rem;
    border-radius: 5px;
    margin: 1rem 2rem 2rem 0;
    font-family: 'BR-Regular';
    font-size: var(--font-size-s);
    color: var(--color-black);
  }

  & select option[value=''][disabled] {
    display: none;
  }
`;
