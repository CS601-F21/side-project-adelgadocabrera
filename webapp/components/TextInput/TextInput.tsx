import { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
  text?: string;
  callback?: Function;
  fluid?: boolean;
  mb?: number;
  mt?: number;
  placeholder?: string;
  autoFocus?: boolean;
  onBlur?: Function;
  style?: Object;
}

const TextInput: React.FC<Props> = ({
  text,
  callback,
  fluid,
  mb,
  mt,
  placeholder,
  autoFocus,
  style,
  onBlur,
}) => {
  return (
    <Input
      style={style}
      autoFocus={autoFocus}
      fluid={fluid}
      mb={mb}
      mt={mt}
      value={text}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        callback && callback(e.target.value)
      }
      onBlur={() => onBlur && onBlur()}
      placeholder={placeholder}
    />
  );
};

export default TextInput;

interface InputProps {
  fluid?: boolean;
  mb?: number;
  mt?: number;
}

const Input = styled.input`
  ${(props: InputProps) => (props.fluid ? "width: 100%;" : null)}
  ${(props: InputProps) => (props.mb ? `margin-bottom: ${props.mb}px;` : null)}
  ${(props: InputProps) => (props.mt ? `margin-top: ${props.mt}px;` : null)}

  font-size: 14px;
  padding: 15px;
  border-radius: 3px;
  border: solid 1px rgb(0, 0, 0, 0);
  outline: none;
  font-family: Fira Code, Consolas, Menlo;

  &:hover {
    border: solid 1px rgb(10, 10, 140, 0.2);
  }

  &:focus {
    border: solid 1px rgb(10, 10, 140, 0.7);
  }
`;

// In case I go back to bordered text inputs
// box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 0 0 rgb(16 22 26 / 0%),
//   0 1px 1px rgb(16 22 26 / 20%);
