import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_MESSAGE } from '../util/constantValue';
import { RootState } from '../store/RootStore';
import { ChangeEvent } from 'react';
import { categoryData } from '../util/categoryData';
import { setCategory } from '../store/CategoryStore';
import { styled } from 'styled-components';

interface CategorySelectorProps {
  onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategorySelector({
  onCategoryChange,
}: CategorySelectorProps) {
  const dispatch = useDispatch();

  const category = useSelector((state: RootState) => state.category);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(event.target.value));
    onCategoryChange(event);
  };

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
  & select {
    width: 15rem;
    border: 1px solid var(--color-black);
    padding: 0.5rem;
    border-radius: 5px;
    margin: 1rem 2rem 2rem 0;
    font-family: 'BR-Regular';
    font-size: var(--font-size-s);
    color: var(--color-black);
  }

  & select option[value=''][disabled] {
    display: none;
  }
`;