import { useDispatch, useSelector } from 'react-redux';
import {
  BASE_URL,
  CATEGORY,
  CONTENT,
  REGION,
  REGISTER,
  TITLE,
  TITLE_INPUT_PLACEHOLDER,
  UPDATE,
} from '../../../common/util/constantValue';
import { ChangeEvent, useEffect } from 'react';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import postData from '../api/postData';
import patchData from '../api/patchData';
import getData from '../api/getData';
import LocationSelector from '../../../common/components/LocationSelector';
import CategorySelector from '../../../common/components/CategorySelector';
import TagsInput from './TagsInput';
import Editor from './Editor';
import Button from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { ArticleToGet, ArticleToPost } from '../../../common/type';
import { resetCreatedPost, setCreatedPost } from '../store/CreatedPost';
import { categoryData } from '../../../common/util/categoryData';
import { setCategory } from '../../../common/store/CategoryStore';

export default function Form() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: initialData }: UseQueryResult<ArticleToGet, unknown> = useQuery(
    ['getData', id],
    () => getData(`${BASE_URL}/posts/${id}`),
    {
      onSuccess: (data) => {
        if (id && data) {
          dispatch(setCreatedPost(data));
          dispatch(setCategory(categoryData[data.categoryId]));
          //! 나중에 카테고리 번호 수정하면 여기도 수정
        }
      },
    },
  );

  const data: ArticleToPost = useSelector(
    (state: RootState) => state.createdPost,
  );

  const userInfo = {
    memberId: 31,
  };

  const region = useSelector((state: RootState) => state.location.region);

  useEffect(() => {
    dispatch(setCreatedPost({ ...data, memberId: userInfo.memberId }));
    return () => {
      dispatch(resetCreatedPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postMutation = useMutation<void, unknown, ArticleToPost>(() =>
    postData(`${BASE_URL}/posts`, data),
  );

  const patchMutation = useMutation<void, unknown, ArticleToPost>(() =>
    patchData(`${BASE_URL}/posts/${id}/update`, data),
  );

  const handleSubmit = () => {
    if (!data.title) {
      window.alert('제목을 입력해주세요!');
      return;
    }
    if (!data.locationId) {
      window.alert('지역을 선택해주세요!');
      return;
    }
    if (!data.categoryId) {
      window.alert('카테고리를 선택해주세요!');
      return;
    }
    if (!data.content) {
      window.alert('내용을 입력해주세요!');
      return;
    }
    //! 추후 alert 대신 모달이나 토스트로 알림 변경해야함
    if (id) {
      patchMutation.mutate(data, {
        onSuccess: () => {
          navigate(-1);
        },
      });
    } else {
      postMutation.mutate(data, {
        onSuccess: () => {
          navigate(-1);
        },
      });
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedPost({ ...data, title: event.target.value }));
  };

  const onLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setCreatedPost({ ...data, location: `${region} ${event.target.value}` }),
    );
  };

  const onCategoryChange = (categoryId: number) => {
    dispatch(setCreatedPost({ ...data, categoryId: categoryId }));
  };

  return (
    <>
      <TitleSection>
        <label htmlFor="title">{TITLE}</label>
        <input
          type="text"
          name="title"
          placeholder={TITLE_INPUT_PLACEHOLDER}
          onChange={handleTitleChange}
          maxLength={40}
          value={data.title}
        />
      </TitleSection>
      <label htmlFor="region">{REGION}</label>
      <LocationSelector onLocationChange={onLocationChange} />
      <label htmlFor="category">{CATEGORY}</label>
      <CategorySelector onCategoryChange={onCategoryChange} />
      <ContentSection>
        <label htmlFor="content">{CONTENT}</label>
        <Editor data={data} />
      </ContentSection>
      <TagsInput data={data} />
      <ButtonSection>
        <Button children={id ? UPDATE : REGISTER} onClick={handleSubmit} />
      </ButtonSection>
    </>
  );
}

const TitleSection = styled.section`
  display: flex;
  flex-direction: column;

  > input {
    width: 30rem;
    color: var(--color-black);
  }
`;

const ContentSection = styled.section`
  > .quill {
    margin: 1rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-height: 10rem;

    > :first-child {
      border: 2px solid var(--color-black);
      padding: 0 0.5rem 0 0.5rem;
      border-radius: 5px 5px 0 0;
    }

    > :nth-child(2) {
      border: 2px solid var(--color-black);
      border-radius: 0 0 5px 5px;
      font-family: 'BR-Regular';
      font-size: var(--font-size-s);
      color: var(--color-black);
      min-height: 10rem;
    }
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 1rem 0 1rem 0;
`;
