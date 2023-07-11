import { styled } from 'styled-components';
import { categoryData } from '../../../common/util/categoryData';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../store/SelectedCategory';
import { useSelector } from 'react-redux';
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

export default function CategoryIcons() {
  useCategorySetter();

  const dispatch = useDispatch();

  const Icons = [all, pet, sports, study, game, food, culture, etc];

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  const categories: Categories | null = JSON.parse(
    localStorage.getItem('categories') || 'null',
  );

  return (
    <div>
      <Wrapper>
        {Icons.map((icon, index) => (
          <IconWrapper
            onClick={() => {
              dispatch(
                setSelectedCategory(
                  `${icon === all ? '' : categories[index - 1].categoryId}`,
                ),
              );
            }}
            key={`Icon ${index}`}
          >
            <Button
              isselected={selectedCategory === categoryData[index - 1] ? 1 : 0}
            >
              <img src={icon} alt={`Icon ${index}`} />
            </Button>
            <div className="categoryName">{categoryData[index]}</div>
          </IconWrapper>
        ))}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 37.5rem;
  margin-top: 3rem;
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
const Button = styled.button`
  width: 78px;
  height: 78px;
  background: var(--color-white);
  padding: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  /* border: ${(props) =>
    props.isselected
      ? '4px solid var(--color-pink-1)'
      : '4px solid transparent'}; */
  &:hover {
    border: 4px solid var(--color-pink-1);
  }
  &:active {
    border: 4px solid var(--color-pink-2);
  }
`;
