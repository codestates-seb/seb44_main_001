import { useDispatch, useSelector } from 'react-redux';
import {
  CONTENT,
  REGISTER,
  TITLE,
  TITLE_INPUT_PLACEHOLDER,
  URL,
} from '../../../common/util/constantValue';
import { RootState } from '../../../common/store/RootStore';
import { ChangeEvent } from 'react';
import { setCreatedPost } from '../store/CreatedPost';
import TagsInput from './TagsInput';
import LocationSelector from './LocationSelector';
import CategorySelector from './CategorySelector';
import { useMutation } from 'react-query';
import postData from '../api/postData';
import { PostData } from '../../../common/type';
import Editor from './Editor';
import { styled } from 'styled-components';

export default function Form() {
  const data: PostData = useSelector((state: RootState) => state.createdPost);

  const dispatch = useDispatch();

  const postMutation = useMutation<void, unknown, PostData>(() =>
    postData(URL, data),
  );

  const handleSubmit = () => {
    postMutation.mutate(data);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedPost({ ...data, title: event.target.value }));
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
        />
      </TitleSection>
      <LocationSelector data={data} />
      <CategorySelector data={data} />
      <ContentSection>
        <label htmlFor="content">{CONTENT}</label>
        <Editor data={data} />
      </ContentSection>
      <TagsInput data={data} />
      <ButtonSection>
        <button onClick={() => handleSubmit()}>{REGISTER}</button>
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
      border: 1px solid var(--color-black);
      padding: 0 0.5rem 0 0.5rem;
      border-radius: 5px 5px 0 0;
    }

    > :nth-child(2) {
      border: 1px solid var(--color-black);
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

  & button {
    border: 2px solid var(--color-black);
    padding: 0.5rem;
    border-radius: 5px;

    font-family: 'BR-Regular';
    font-size: var(--font-size-s);
    background: var(--color-pink-1);
    color: var(--color-black);
    width: 10rem;
    cursor: pointer;

    &:hover {
      background: var(--color-pink-2);
    }

    &:active {
      background: var(--color-pink-3);
    }
  }
`;
