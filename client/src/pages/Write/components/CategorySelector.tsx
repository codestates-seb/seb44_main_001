import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY, CATEGORY_MESSAGE } from '../../../common/util/constantValue';
import { RootState } from '../../../common/store/RootStore';
import { ChangeEvent } from 'react';
import { setCreatedPost } from '../store/CreatedPost';
import { categoryData } from '../../../common/util/categoryData';
import { PostData } from '../../../common/type';

export default function CategorySelector({ data }: { data: PostData }) {
  const dispatch = useDispatch();

  const category = useSelector(
    (state: RootState) => state.createdPost.category,
  );

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCreatedPost({ ...data, category: event.target.value }));
  };

  return (
    <>
      <label htmlFor="category">{CATEGORY}</label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option disabled value="">
          {CATEGORY_MESSAGE}
        </option>
        {categoryData.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}
