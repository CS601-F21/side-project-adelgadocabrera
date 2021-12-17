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
}

const TextArea: React.FC<Props> = ({
  text,
  callback,
  fluid,
  mb,
  mt,
  placeholder,
  autoFocus,
}) => {
  return (
    <Textarea
      autoFocus={autoFocus}
      fluid={fluid}
      mb={mb}
      mt={mt}
      value={text}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        callback && callback(e.target.value)
      }
      placeholder={placeholder}
    />
  );
};

export default TextArea;

interface TextAreaProps {
  fluid?: boolean;
  mb?: number;
  mt?: number;
}

const Textarea = styled.textarea`
  ${(props: TextAreaProps) => (props.fluid ? "width: 100%;" : null)}
  ${(props: TextAreaProps) =>
    props.mb ? `margin-bottom: ${props.mb}px;` : null}
  ${(props: TextAreaProps) => (props.mt ? `margin-top: ${props.mt}px;` : null)}

  min-height: 200px;
  resize: vertical;
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
