import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import { styled } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, ...attributes }: ButtonProps) {
  return <ButtonContainer {...attributes}>{children}</ButtonContainer>;
}

const ButtonContainer = styled.button`
  color: var(--color-black);
  background-color: var(--color-pink-1);
  border-radius: 6px;
  display: inline-flex;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--color-black);
  font-size: 16px;
  font-family: 'BR-Regular';

  &:hover {
    background-color: var(--color-pink-2);
  }

  &:active {
    background-color: var(--color-pink-3);
  }
`;
