import { Container, Hero, Code, Button } from "../../components";
import Post from "../../db/post";
import Posts from "./Posts";
import styled from "styled-components";

interface Props {
  posts: Post[];
}

const HomePage: React.FC<Props> = ({ posts }) => {
  return (
    <Container>
      <Hero />
      <HeadlineWrapper>
        <p>
          Get started by <Code>code reviewing</Code>
        </p>

        <Button link to={"/codereview"}>
          Request Code Review
        </Button>
      </HeadlineWrapper>
      <Posts posts={posts} />
    </Container>
  );
};

export default HomePage;

const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;
