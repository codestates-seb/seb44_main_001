import { styled } from 'styled-components';
import { categoryData } from '../../../common/util/categoryData';
import { Icons, English } from './Icons';
import { useDispatch } from 'react-redux';
import { setFilteredList } from '../store/filteredList';

export default function CategoryIcons() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {Icons.map((icon, index) => (
        <IconWrapper
          onClick={() => dispatch(setFilteredList(`${English[index]}`))}
          key={`Icon ${index}`}
        >
          <Button>
            <Img src={icon} alt={`Icon ${index}`} />
          </Button>
          <div className="categoryName">{categoryData[index]}</div>
        </IconWrapper>
      ))}
    </Wrapper>
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
  &:hover {
    //호버시 움직이는거 수정해야함
    border: 5px solid var(--color-pink-1);
  }
`;
const Img = styled.img`
  border-radius: 50%;
`;
