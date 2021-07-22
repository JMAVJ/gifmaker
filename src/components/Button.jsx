import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  color: white;
  display: block;
  margin: auto;
  border: 0.05rem solid white;
  border-radius: 0.2rem;
  padding: 0.5rem;
  margin-top: 1rem;
  transition: 500ms;
  cursor: pointer;

  :hover {
    background-color: #383b42;
  }
`;

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
