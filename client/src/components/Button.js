import React from "react";
import styled from "styled-components";
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 20px;
  min-width: 100%;
  word-break: break-word;
`;

function StyledButton(props) {
  return (
    <Button primary={props.primary} onClick={props.onClick}>
      {props.label}
    </Button>
  );
}

export default StyledButton;
