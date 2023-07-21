import { CSSProperties, SetStateAction, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { RootState } from '../../../common/store/RootStore';
import { MdCancel } from 'react-icons/md';

type SearchInputProps = {
  $isClicked: boolean;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: CSSProperties;
};

export default function SearchBar() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isCliked, setIsClicked] = useState(false);
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    navigate(`/search/${inputValue}`);
    setInputValue('');
  };

  const handleInputDelete = () => {
    setInputValue('');
  };

  const searchInputRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    // return () => {
    //   document.removeEventListener('mousedown', handleDocumentClick);
    // };
  }, []);

  return (
    <Wrapper>
      <form onSubmit={handleInputSubmit} ref={searchInputRef}>
        <SearchInput
          onClick={() => setIsClicked(true)}
          $isClicked={isCliked}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`${selectedLocation.city} ${selectedLocation.province} 지역의 ${selectedCategory.name} 카테고리에서 검색하기`}
        />
        {inputValue && (
          <DeleteButton type="reset" onClick={handleInputDelete}>
            <MdCancel />
          </DeleteButton>
        )}
        <SearchButton type="submit">
          <AiOutlineSearch />
        </SearchButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  position: relative;
  & button {
    position: absolute;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

const SearchInput = styled.input<SearchInputProps>`
  display: flex;
  width: 37.5rem;
  height: 3.125rem;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 20px;
  box-shadow: ${({ $isClicked }) =>
    $isClicked ? 'none' : '5px 5px var(--color-black)'};
  border: ${({ $isClicked }) =>
    $isClicked ? '4px solid var(--color-pink-1)' : 'none'};
  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  top: 0.8rem;
  right: 4rem;
  font-size: var(--font-size-m);

  &:hover {
    color: var(--color-gray);
  }
`;

const SearchButton = styled.button`
  top: 0.6rem;
  right: 1rem;
  font-size: var(--font-size-l);
`;
