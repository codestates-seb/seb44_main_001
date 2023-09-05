import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_MESSAGE } from '../util/constantValue';
import { RootState } from '../store/RootStore';
import { ChangeEvent } from 'react';
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

  const pathName = window.location.pathname;

  const categoriesString = localStorage.getItem('categories');
  const categories: Categories =
    categoriesString && JSON.parse(categoriesString);

  const category = useSelector((state: RootState) => state.category.name);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId: number | undefined = categories?.find(
      (category: Category) => category.name === event.target.value,
    )?.categoryId;
    dispatch(setCategory({ name: event.target.value, categoryId: categoryId }));
    if (onCategoryChange) {
      onCategoryChange(categoryId as number);
    }
  };

  return (
    <Container>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option disabled value="">
          {CATEGORY_MESSAGE}
        </option>
        {categories
          ?.filter(
            (category) => pathName === '/lists' || category.name !== '전체',
          )
          .map((category) => (
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
