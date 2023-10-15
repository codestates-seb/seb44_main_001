import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../store/SelectedCategory';
import { RootState } from '../../../common/store/RootStore';
import { Categories, Category } from '../../../common/type';
import useCategorySetter from '../../../common/util/customHook/useCategorySetter';
import pet from '../../../common/assets/icons/pet.svg';
import food from '../../../common/assets/icons/food.svg';
import culture from '../../../common/assets/icons/culture.svg';
import study from '../../../common/assets/icons/study.svg';
import sports from '../../../common/assets/icons/sports.svg';
import game from '../../../common/assets/icons/game.svg';
import all from '../../../common/assets/icons/home.svg';
import etc from '../../../common/assets/icons/etc.svg';
import { CATEGORIES } from '../../../common/util/constantValue';

export default function CategoryIcons() {
  useCategorySetter();

  const dispatch = useDispatch();
  const categories: Categories | null = JSON.parse(
    localStorage.getItem(CATEGORIES) || 'null',
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  const Icons = [all, pet, sports, study, game, food, culture, etc];

  const handleIconClick = (category: Category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Wrapper>
      {categories && (
        <>
          {categories.map((category, index) => (
            <IconWrapper
              onClick={() => handleIconClick(category)}
              key={`Icon ${index}`}
            >
              <Button
                $isSelected={
                  selectedCategory.categoryId === category.categoryId
                }
              >
                <img width={40} height={40} src={Icons[index]} alt={`Icon ${index}`} />
              </Button>
              <div className="categoryName">{category.name}</div>
            </IconWrapper>
          ))}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 37.5rem;
  margin-top: 3rem;
  @media (max-width: 832px) {
    width: 100%;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .categoryName {
    margin-top: 0.5rem;
  }
`;
const Button = styled.button<{ $isSelected: boolean }>`
  width: 78px;
  height: 78px;
  background: var(--color-white);
  padding: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  border: ${(props) =>
    props.$isSelected
      ? '4px solid var(--color-pink-1)'
      : '4px solid transparent'};
  &:hover {
    border: 4px solid var(--color-pink-1);
  }
  &:active {
    border: 4px solid var(--color-pink-2);
  }
`;
