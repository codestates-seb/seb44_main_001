import { styled } from 'styled-components';
import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import Article from '../components.tsx/Article';
import CommentInput from '../components.tsx/CommentInput';
import CommentList from '../components.tsx/CommentList';

export default function Details() {
  const data = { title: '나는 제목', category: '나는 카테고리' };
  return (
    <>
      <SemiHeader
        title={`전체 게시판 > ${data.category} > ${data.title}`}
        content=""
      />
      <Layout>
        <DetailsContainer>
          <Article />
          <CommentInput />
          <CommentList />
        </DetailsContainer>
      </Layout>
    </>
  );
}

const DetailsContainer = styled.main``;
