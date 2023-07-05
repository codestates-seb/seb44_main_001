import React, { ButtonHTMLAttributes, Children } from 'react';
import { styled } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({children}: ButtonProps) {
  return (
    <ButtonContainer>
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  color: var(--color-black);
  background-color: var(--color-pink-1);
  border-radius: 6px;
  display: inline-flex;
  padding: 7px;
  padding-left: 15px;
  padding-right: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--color-black);
  font-size: 16px;

  &:hover {
    background-color: var(--color-pink-2);
  }

  &:active {
    background-color: var(--color-pink-3);
  }
`