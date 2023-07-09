import { styled } from 'styled-components';
import { categoryData } from '../../../common/util/categoryData';
import { Icons, English } from './Icons';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../store/SelectedCategory';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';

export default function CategoryIcons() {
  
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  return (
    <div>
      <Wrapper>
        {Icons.map((icon, index) => (
          <IconWrapper
            onClick={() => {
              dispatch(setSelectedCategory(`${English[index]}`));
            }}
            key={`Icon ${index}`}
          >
            <Button 
            // isselected={selectedCategory===English[index]?1:0}
            >
              <Img src={icon} alt={`Icon ${index}`} />
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
  margin-bottom: 3rem;
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
  background: none;
  padding: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  border: ${props => props.isselected? '4px solid var(--color-pink-1)': '4px solid transparent'};
  &:hover {
    border: 4px solid var(--color-pink-1);
  }
  &:active{
    border: 4px solid var(--color-pink-2);
  }
`;
const Img = styled.img`
  border-radius: 50%;
`;
