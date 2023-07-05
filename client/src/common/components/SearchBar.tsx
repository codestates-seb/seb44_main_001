import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import search from '../assets/icons/search.svg';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    navigate(`/search/${inputValue}`);
  };

  return (
    <Wrapper>
      <form onSubmit={handleInputSubmit}>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <img src={search} />
        </Button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  position: relative;
`;

const SearchInput = styled.input`
  display: flex;
  width: 37.5rem;
  height: 3.125rem;
  border-radius: 10px;
  padding: 0.5rem;
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
