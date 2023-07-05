import { useDispatch, useSelector } from 'react-redux';
import {
  CONTENT,
  CONTENT_INPUT_PLACEHOLDER,
  POST,
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

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCreatedPost({ ...data, content: event.target.value }));
  };

  return (
    <section>
      <label htmlFor="title">{TITLE}</label>
      <input
        type="text"
        name="title"
        placeholder={TITLE_INPUT_PLACEHOLDER}
        onChange={handleTitleChange}
      />
      <LocationSelector />
      <CategorySelector />
      <label htmlFor="content">{CONTENT}</label>
      <textarea
        name="content"
        placeholder={CONTENT_INPUT_PLACEHOLDER}
        onChange={handleContentChange}
      />
      <TagsInput data={data} />
      <div>
        <button onClick={() => handleSubmit()}>{POST}</button>
      </div>
    </section>
  );
}
