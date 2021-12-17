import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  callback?: Function;
}

const Badge: React.FC<Props> = ({ children, callback }) => {
  return (
    <BadgeWrapper delete={!!callback} onClick={() => callback && callback()}>
      {children}
    </BadgeWrapper>
  );
};

export default Badge;

interface WrapperProps {
  delete: boolean;
}

const BadgeWrapper = styled.span`
  padding: 5px 10px;
  border-radius: 8px;
  background-color: rgb(10, 10, 140, 0.7);
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.5);
    background-color: ${(props: WrapperProps) => (props.delete ? "red" : null)};
  }
`;
