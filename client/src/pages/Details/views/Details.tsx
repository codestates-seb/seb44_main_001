import { styled } from 'styled-components';
import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import Article from '../components/Article';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { UseQueryResult, useQuery } from 'react-query';
import { ArticleToGet } from '../../../common/type';
import getArticle from '../api/getArticle';
import { BASE_URL } from '../../../common/util/constantValue';
import { useParams } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();

  const { data }: UseQueryResult<ArticleToGet, unknown> = useQuery(
    ['getData', id],
    () => {
      const memberId = localStorage.getItem('MemberId');
      const url = memberId
        ? `${BASE_URL}/posts/${id}?memberId=${memberId}`
        : `${BASE_URL}/posts/${id}`;
      return getArticle(url);
    },
  );

  return (
    <>
      <SemiHeader
        title={`${data?.locationInfo.city} ${data?.locationInfo.province} > ${data?.categoryInfo.name} > ${data?.title}`}
        content=""
      />
      <Layout>
        <Container>
          <Article data={data && data} />
          <CommentInput />
          <CommentList />
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;
