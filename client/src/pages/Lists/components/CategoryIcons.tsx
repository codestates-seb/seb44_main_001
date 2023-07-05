import { styled } from 'styled-components';
import pet from '../../../common/assets/icons/pet.svg';
import food from '../../../common/assets/icons/food.svg';
import culture from '../../../common/assets/icons/culture.svg';
import study from '../../../common/assets/icons/study.svg';
import sports from '../../../common/assets/icons/sports.svg';
import game from '../../../common/assets/icons/game.svg';
import music from '../../../common/assets/icons/music.svg';
import etc from '../../../common/assets/icons/etc.svg';
import {getData} from '../api/getData';

export default function CategoryIcons({ setLists }:any) {
  const icons = [pet, food, culture, study, sports, game, music, etc];
  const english = ["pet","food","culture","study","sports","game","music","etc"]
  const korean = [
    '반려동물',
    '음식',
    '문화생활',
    '스터디',
    '운동',
    '게임',
    '음악',
    '기타',
  ];
  return (
    <Wrapper>
      {icons.map((icon, index) => (
        <IconWrapper 
        onClick={()=>{
          setLists(getData(english[index]))
        }}
        key={`Icon ${index}`}>
          <Button>
            <Img src={icon} alt={`Icon ${index}`} />
          </Button>
          <div className='categoryName'>{korean[index]}</div>
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
  .categoryName{
    margin-top: 0.5rem;
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
const Img = styled.img`
border-radius: 50%;
`