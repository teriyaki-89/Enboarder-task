import React from "react";
import styled from "styled-components";
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 1px;
  font-size: 1em;
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;
`;

function StyledInputText(props) {
  return (
    <Input
      value={props.value}
      type="text"      
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}

export default StyledInputText;
