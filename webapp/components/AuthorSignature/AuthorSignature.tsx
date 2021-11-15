import React from "react";
import styled from "styled-components";
import User from "../../db/user";

interface Props {
  user: User;
}

const AuthorSignature: React.FC<Props> = ({ user }) => {
  const { image, name, quote } = user;
  return (
    <Container>
      <Img src={image} />
      <Body>
        <Name>@{name}</Name>
        {quote && <Quote>{quote}</Quote>}
      </Body>
    </Container>
  );
};

export default AuthorSignature;

const Container = styled.div`
  postion: relative;
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 60px;
  margin-right: 20px;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.1);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const Quote = styled.p`
  color: gray;
  font-weight: 500;
  font-size: 14px;
  margin-top: 0;
`;
