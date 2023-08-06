import { styled } from 'styled-components';
import SemiHeader from '../../../common/components/SemiHeader';
import { Layout } from '../../../common/style';
import Article from '../components/Article';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { UseQueryResult, useQuery } from 'react-query';
import { ArticleToGet } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../../Lists,Search/store/SelectedCategory';
import { RootState } from '../../../common/store/RootStore';
import { getData } from '../../../common/apis';

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const memberId = useSelector((state: RootState) => state.myData.memberId);

  const { data }: UseQueryResult<ArticleToGet, unknown> = useQuery(
    ['getData', id],
    () => {
      const url = memberId
        ? `${BASE_URL}/posts/${id}?memberId=${memberId}`
        : `${BASE_URL}/posts/${id}`;
      return getData(url);
    },
  );

  const locationData = {
    locationId: data?.locationInfo.locationId,
    city: data?.locationInfo.city,
    province: data?.locationInfo.province,
  };

  const handleLocationClick = () => {
    localStorage.setItem('selectedLocation', JSON.stringify(locationData));

    dispatch(
      setSelectedCategory({
        categoryId: 1,
        name: '전체',
      }),
    );

    navigate('/lists');
  };

  const handleCategoryClick = () => {
    localStorage.setItem('selectedLocation', JSON.stringify(locationData));

    dispatch(
      setSelectedCategory({
        categoryId: data?.categoryInfo.categoryId,
        name: data?.categoryInfo.name,
      }),
    );

    navigate('/lists');
  };

  return (
    <>
      <SemiHeader title="" content="">
        <TitleWrapper>
          <div
            onClick={handleLocationClick}
            className="link"
          >{`${data?.locationInfo.city} ${data?.locationInfo.province}`}</div>
          <div>&nbsp;{'>'}&nbsp;</div>
          <div onClick={handleCategoryClick} className="link">
            {data?.categoryInfo.name}
          </div>
          <div>&nbsp;{`> ${data?.title}`}</div>
        </TitleWrapper>
      </SemiHeader>
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  background-color: var(--color-pink-1);
  width: 100%;

  min-width: 700px;

  > .link {
    cursor: pointer;
  }

  & h1 {
    color: var(--color-black);
    white-space: nowrap;
    padding-bottom: 20px;
    padding-left: calc((100vw - 50rem) / 2);

    > div {
      display: flex;
      justify-content: start;
    }
  }
`;
