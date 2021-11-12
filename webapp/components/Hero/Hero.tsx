import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 70px 20px;

  @media (min-width: 768px) {
    padding: 100px 150px;
  }
`;

const Title = styled.h1`
  font-family: Montserrat;
  font-size: 48px;

  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

const Slogan = styled.div`
  font-size: 24px;
  color: gray;
`;

const Fat = styled.span`
  font-weight: bolder;
  color: rgb(10, 10, 140, 0.7);
`;

const Hero: React.FC = () => {
  return (
    <Container>
      <Title>
        Code<Fat>Review</Fat>
        <Slogan>Make the world a cleaner place. Write clean code.</Slogan>
      </Title>
    </Container>
  );
};

export default Hero;
