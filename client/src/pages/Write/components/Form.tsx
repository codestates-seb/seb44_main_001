import { useDispatch, useSelector } from 'react-redux';
import {
  CATEGORY,
  CONTENT,
  REGION,
  REGISTER,
  TITLE,
  TITLE_INPUT_PLACEHOLDER,
  URL,
} from '../../../common/util/constantValue';
import { RootState } from '../../../common/store/RootStore';
import { ChangeEvent } from 'react';
import { setCreatedPost } from '../store/CreatedPost';
import TagsInput from './TagsInput';
import LocationSelector from '../../../common/components/LocationSelector';
import CategorySelector from '../../../common/components/CategorySelector';
import { useMutation } from 'react-query';
import postData from '../api/postData';
import { PostData } from '../../../common/type';
import Editor from './Editor';
import { styled } from 'styled-components';
import Button from '../../../common/components/Button';

export default function Form() {
  const data: PostData = useSelector((state: RootState) => state.createdPost);

  const dispatch = useDispatch();

  const postMutation = useMutation<void, unknown, PostData>(() =>
    postData(URL, data),
  );

  const region = useSelector((state: RootState) => state.location.region);

  const handleSubmit = () => {
    if (!data.title) {
      window.alert('제목을 입력해주세요!');
      return;
    }
    if (!data.location) {
      window.alert('지역을 선택해주세요!');
      return;
    }
    if (!data.category) {
      window.alert('카테고리를 선택해주세요!');
      return;
    }
    if (!data.content) {
      window.alert('내용을 입력해주세요!');
      return;
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

  const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCreatedPost({ ...data, category: event.target.value }));
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
        <Button children={REGISTER} onClick={() => handleSubmit()} />
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
