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
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
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
import { setCreatedPost } from '../store/CreatedPost';
import { setLocation } from '../../../common/store/LocationStore';
import { setCategory } from '../../../common/store/CategoryStore';
import { categoryData } from '../../../common/util/categoryData';

export default function Form() {
  const data: ArticleToPost = useSelector(
    (state: RootState) => state.createdPost,
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  const region = useSelector((state: RootState) => state.location.region);

  const postMutation = useMutation<void, unknown, ArticleToPost>(() =>
    postData(`${BASE_URL}/posts`, data),
  );

  const patchMutation = useMutation<void, unknown, ArticleToPost>(() =>
    patchData(`${BASE_URL}/posts/${id}`, data),
  );

  // const initialData = useQuery(['getData', id], () =>
  //   id ? getData(`${BASE_URL}/get/${id}/${userInfo.memberId}`) : null,
  // );

  const initialData: ArticleToGet = {
    postId: 1,
    title: '나는 바보',
    content: '<p>여자 친구</p>',
    createdAt: '2023-07-06T13:00:28.377963',
    editedAt: '2023-07-06T13:00:28.377963',
    memberId: 0,
    categoryId: 4,
    location: '경상남도 거제시',
    tags: ['나는', '바보'],
  };

  useEffect(() => {
    if (id && initialData) {
      dispatch(
        setCreatedPost({
          title: initialData.title,
          content: initialData.content,
          memberId: initialData.memberId,
          categoryId: initialData.categoryId,
          tags: initialData.tags,
          location: initialData.location,
        }),
      );
      dispatch(
        setLocation({
          region: initialData.location.split(' ')[0],
          district: initialData.location.split(' ')[1],
        }),
      );
      dispatch(setCategory(categoryData[initialData.categoryId]));
    }
    //! api 명세서 수정 후 dispatch 할 부분들 전체적으로 수정해야함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = () => {
    if (!data.title) {
      window.alert('제목을 입력해주세요!');
      return;
    }
    if (!data.location) {
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
      patchMutation.mutate(data);
    }
    postMutation.mutate(data);
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
          defaultValue={data.title}
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
        <Button
          children={id ? UPDATE : REGISTER}
          onClick={() => handleSubmit()}
        />
      </ButtonSection>
    </>
  );
}

const TitleSection = styled.section`
  display: flex;
  flex-direction: column;

  > input {
    width: 30rem;
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
