import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_MESSAGE } from '../util/constantValue';
import { RootState } from '../store/RootStore';
import { ChangeEvent, useEffect } from 'react';
import { setCategory } from '../store/CategoryStore';
import { styled } from 'styled-components';
import useCategorySetter from '../util/customHook/useCategorySetter';
import { Categories, Category } from '../type';

interface CategorySelectorProps {
  onCategoryChange?: (categoryId: number | null) => void;
}

export default function CategorySelector({
  onCategoryChange,
}: CategorySelectorProps) {
  useCategorySetter();

  const dispatch = useDispatch();

  const categories: Categories | null = JSON.parse(
    localStorage.getItem('categories') || 'null',
  );

  const category = useSelector((state: RootState) => state.category.name);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId: number | null = JSON.parse(
      localStorage.getItem('categories') || 'null',
    )?.find(
      (category: Category) => category.name === event.target.value,
    )?.categoryId;
    dispatch(setCategory({ name: event.target.value, categoryId: categoryId }));
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setCategory({ name: '', categoryId: 0 }));
    };
  });

  return (
    <Container>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option disabled value="">
          {CATEGORY_MESSAGE}
        </option>
        {categories?.map((category) => (
          <option key={category.categoryId} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </Container>
  );
}

const Container = styled.div`
  & select {
    width: 15rem;
    color: var(--color-black);
    outline: none;
  }

  & select option[value=''][disabled] {
    display: none;
  }
`;
