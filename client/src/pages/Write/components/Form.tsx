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
    <section>
      <label htmlFor="title">{TITLE}</label>
      <input
        type="text"
        name="title"
        placeholder={TITLE_INPUT_PLACEHOLDER}
        onChange={handleTitleChange}
      />
      <LocationSelector data={data} />
      <CategorySelector data={data} />
      <label htmlFor="content">{CONTENT}</label>
      <Editor data={data} />
      <TagsInput data={data} />
      <div>
        <button onClick={() => handleSubmit()}>{REGISTER}</button>
      </div>
    </section>
  );
}
