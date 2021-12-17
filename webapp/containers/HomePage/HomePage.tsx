import { useState } from "react";
import { Container, Hero, Code, Button } from "../../components";
import Post from "../../db/post";
import Badge, { BadgesMap } from "../../db/badge";
import Posts from "./Posts";
import Search from "./Search";
import styled from "styled-components";

interface Props {
  posts: Post[];
  badges: BadgesMap;
}

const HomePage: React.FC<Props> = (props, { badges }) => {
  const [posts, setPosts] = useState<Post[]>(props.posts ?? []);

  return (
    <Container>
      <Hero />
      <HeadlineWrapper>
        <p style={{ marginBottom: "40px", marginTop: "40px" }}>
          Get started by <Code>code reviewing</Code>
        </p>
        <Button link to={"/codereview"}>
          Request Code Review
        </Button>
      </HeadlineWrapper>
      <Search badges={badges} posts={props.posts} setPosts={setPosts} />
      <Posts posts={posts} />
    </Container>
  );
};

export default HomePage;

const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 60px;
`;
