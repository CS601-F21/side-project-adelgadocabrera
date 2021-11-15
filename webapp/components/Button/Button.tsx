import Link from "next/link";
import styled from "styled-components";

const DISABLED = "#cccccc";
const BLUE = "rgb(10, 10, 140, 0.7)";

interface WrapperProps {
  disabled?: boolean;
}

const Wrapper = styled.div`
    background-color: ${(props: WrapperProps) =>
      props.disabled ? DISABLED : BLUE};
    cursor: ${(props: WrapperProps) =>
      props.disabled ? "not-allowed" : "pointer"};

    padding: 15px; 25px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: Montserrat;
    border-radius: 8px;
    transition: filter 0.1s ease-in-out;
    text-align: center;
    box-shadow: 0 5px 10px rgb(0,0,0, 0.1);

    &:hover {
        filter: ${(props: WrapperProps) =>
          props.disabled ? null : "brightness(1.4);"}
    }
`;

interface Props {
  children?: string;
  callback?: Function;
  link?: boolean;
  to?: string;
  style?: {};
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  style,
  callback,
  link,
  to,
  disabled,
}) => {
  disabled = Boolean(disabled);

  if (link && to) {
    return (
      <Link href={to}>
        <Wrapper disabled={disabled} style={style && { ...style }}>
          {children}
        </Wrapper>
      </Link>
    );
  }

  return (
    <Wrapper
      disabled={disabled}
      style={style && { ...style }}
      onClick={(e) => callback && callback(e)}
    >
      {children}
    </Wrapper>
  );
};

export default Button;