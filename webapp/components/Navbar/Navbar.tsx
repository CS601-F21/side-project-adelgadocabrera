import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  height: 65px;
  width: 100%;
  max-width: 100vw;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 99;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Content = styled.div`
  background-color: #eaeaea;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: solid 1px rgb(10, 10, 140, 0.1);
`;

const Logo = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 23px;
  cursor: pointer;
  padding: 10px 20px;
  transition: filter 0.2s linear;

  &:hover {
    filter: brightness(2);
  }
`;

const Fat = styled.span`
  font-weight: 900;
`;

const Braces = styled.span`
  font-size: 28px;
  color: rgb(10, 10, 140, 0.7);
`;

const Login = styled.div`
  background-color: white;
  padding: 10px 25px;
  margin-right: 15px;
  margin-top: 10px;
  border-radius: 8px;
  font-weight: bold;
`;

const Navbar: React.FC = () => {
  return (
    <Link href={"/"}>
      <Nav>
        <Content>
          <Logo>
            <Braces>{"${"}</Braces>
            <Fat>CR</Fat>
            <Braces>{"}"}</Braces>
          </Logo>
          <Login>login</Login>
        </Content>
      </Nav>
    </Link>
  );
};

export default Navbar;
