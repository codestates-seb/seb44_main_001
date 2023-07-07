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
import { RootState } from '../../../common/store/RootStore';
import { ChangeEvent, useEffect } from 'react';
import { setCreatedPost } from '../store/CreatedPost';
import TagsInput from './TagsInput';
import LocationSelector from '../../../common/components/LocationSelector';
import CategorySelector from '../../../common/components/CategorySelector';
import { useMutation, useQuery } from 'react-query';
import postData from '../api/postData';
import { PostData } from '../../../common/type';
import Editor from './Editor';
import { styled } from 'styled-components';
import Button from '../../../common/components/Button';
import { useParams } from 'react-router-dom';
import { getData } from '../api/getData';
import { setLocation } from '../../../common/store/LocationStore';
import { setCategory } from '../../../common/store/CategoryStore';
import { patchData } from '../api/patchData';

export default function Form() {
  const data: PostData = useSelector((state: RootState) => state.createdPost);

  const { id } = useParams();

  const dispatch = useDispatch();

  const region = useSelector((state: RootState) => state.location.region);

  const postMutation = useMutation<void, unknown, PostData>(() =>
    postData(`${BASE_URL}/post`, data),
  );

  const patchMutation = useMutation<void, unknown, PostData>(() =>
    patchData(`${BASE_URL}/patch${id}`, data),
  );

  // const { data: initialData } = useQuery(['getData', id], () =>
  //   id ? getData(`${BASE_URL}/get/${id}`) : null,
  // );

  const initialData = {
    categoryId: 4,
    content: '<p>여자 친구</p>',
    locationId: 1,
    region: '경상남도',
    district: '거제시',
    category: '반려동물',
    memberId: 0,
    tags: ['나는', '바보'],
    title: '나는 바보',
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
          locationId: initialData.locationId,
        }),
      );
      dispatch(
        setLocation({
          region: initialData.region,
          district: initialData.district,
        }),
      );
      dispatch(setCategory(initialData.category));
    }
    //! api 명세서 수정 후 dispatch 할 부분들 전체적으로 수정해야함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = () => {
    if (!data.title) {
      window.alert('제목을 입력해주세요!');
      return;
    }
    if (!data.locationId) {
      window.alert('지역을 선택해주세요!');
      return;
    }
    // 지역ID 부여 후에는 조건식 변경해야함
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
