import { useDispatch, useSelector } from 'react-redux';
import {
  BASE_URL,
  CATEGORY,
  CONTENT,
  LOCATION,
  REGISTER,
  TITLE,
  TITLE_INPUT_PLACEHOLDER,
  UPDATE,
} from '../../../common/util/constantValue';
import { ChangeEvent, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import postData from '../api/postData';
import patchData from '../api/patchData';
import LocationSelector from '../../../common/components/LocationSelector';
import CategorySelector from '../../../common/components/CategorySelector';
import TagsInput from './TagsInput';
import Editor from './Editor';
import Button from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { ArticleToGet, ArticleToPost } from '../../../common/type';
import { resetCreatedPost, setCreatedPost } from '../store/CreatedPost';
import { setCategory } from '../../../common/store/CategoryStore';
import { setLocation } from '../../../common/store/LocationStore';

export default function Form() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const memberId = Number(localStorage.getItem('MemberId'));

  const data: ArticleToPost = useSelector(
    (state: RootState) => state.createdPost,
  );

  const postMutation = useMutation<ArticleToGet, unknown, ArticleToPost>(() =>
    postData(`${BASE_URL}/posts`, data),
  );

  const patchMutation = useMutation<void, unknown, ArticleToPost>(() =>
    patchData(`${BASE_URL}/posts/${id}/update`, data),
  );

  useEffect(() => {
    dispatch(setCreatedPost({ ...data, memberId: memberId }));

    return () => {
      dispatch(resetCreatedPost());
      dispatch(setCategory({ categoryId: 0, name: '' }));
      dispatch(setLocation({ locationId: 0, city: '', province: '' }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          navigate(`/details/${id}`);
        },
      });
      dispatch(resetCreatedPost());
    } else {
      postMutation.mutate(data, {
        onSuccess: (res: ArticleToGet) => {
          const id = res.postId;
          navigate(`/details/${id}`);
        },
      });
      dispatch(resetCreatedPost());
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 21) {
      dispatch(setCreatedPost({ ...data, title: event.target.value }));
    }
  };

  const onLocationChange = (locationId: number | null) => {
    dispatch(setCreatedPost({ ...data, locationId: locationId }));
  };

  const onCategoryChange = (categoryId: number | null) => {
    dispatch(setCreatedPost({ ...data, categoryId: categoryId }));
  };

  const handleCancel = () => {
    navigate(-1);
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
          maxLength={20}
          value={data.title}
        />
      </TitleSection>
      <label htmlFor="location">{LOCATION}</label>
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
        <Button children="취소" onClick={handleCancel} />
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
  justify-content: space-evenly;
  margin: 1rem 0 1rem 0;

  > :nth-child(2) {
    background: var(--color-gray);

    &:hover {
      background: #dddddd;
    }

    &:active {
      background: #eeeeee;
    }
  }
`;
