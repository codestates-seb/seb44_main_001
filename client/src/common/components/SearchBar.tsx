import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

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
          <AiOutlineSearch/>
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
  font-family: 'BR-Regular';
  border-radius: 5px;
  padding: 0.5rem;
  border: 2px solid var(--color-black);
  font-size: small;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0;
  font-size:2rem;
  cursor: pointer;
`;
