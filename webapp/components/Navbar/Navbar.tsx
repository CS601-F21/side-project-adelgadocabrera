import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [session, loading] = useSession();
  const username = session?.user?.name;
  const avatar = session?.user?.image;
  const router = useRouter();
  const userOptions = [
    {
      label: "Profile",
      value: "profile",
    },
    {
      label: "Sign out",
      value: "signOut",
    },
  ];

  const handleDropdown = (e: Option) => {
    if (e.value == "profile") router.push("/profile");
    if (e.value == "signOut") signOut();
  };

  return (
    <Nav>
      <Content>
        <Link href={"/"}>
          <Logo>
            <Braces>{"<"}</Braces>
            <Braces>{"/> "}</Braces>
            <Fat>CR</Fat>
          </Logo>
        </Link>
        {loading && <span></span>}
        {!loading && username && (
          <UserWrapper>
            {avatar && <Avatar src={avatar} />}
            <Dropdown
              options={userOptions}
              value={"#" + username}
              onChange={handleDropdown}
            />
          </UserWrapper>
        )}
        {!loading && !session && (
          <Link href="/api/auth/signin">
            <Login>login</Login>
          </Link>
        )}
      </Content>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 100%;
  max-width: 100vw;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #f1f1f1;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Content = styled.div`
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

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.1);
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
  margin-bottom: 10px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
`;
