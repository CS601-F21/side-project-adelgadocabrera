import { Badge, Container } from "../../components";
import styled from "styled-components";
import User from "../../db/user";
import Posts from "../HomePage/Posts";
import IBadge from "../../db/badge";

interface Props {
  profile: User;
}

const UserPage: React.FC<Props> = ({ profile }) => {
  const { name, image, quote, posts } = profile;
  console.log(profile);

  const badges: IBadge[] = [
    { name: "REST", id: 1 },
    { name: "Next.js", id: 2 },
    { name: "OOP", id: 3 },
  ];

  return (
    <Container>
      <TitleWrapper>
        <Img src={image} />
        <Title>{name}</Title>
      </TitleWrapper>
      {true && <Quote>if(me.sad()) me.cheerUp()</Quote>}
      <Title>About</Title>
      <p></p>
      <Title>Skills</Title>
      {badges &&
        badges.map((badge: IBadge) => (
          <Badge key={badge.name}>{badge.name}</Badge>
        ))}
      <Title>Code Review Requests</Title>
      {posts && <Posts posts={posts} />}
    </Container>
  );
};

export default UserPage;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const Title = styled.h1`
  margin-top: 50px;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 80px;
  margin-top: 50px;
  margin-right: 20px;
  box-shadow: 0 5px 5px rgb(0, 0, 0, 0.1);
  border: solid 1px rgb(10, 10, 140, 0.7);
`;

const Quote = styled.p`
  color: gray;
  margin-left: 100px;
  margin-top: -30px;
  font-size: 18px;
  font-weight: bold;
`;
