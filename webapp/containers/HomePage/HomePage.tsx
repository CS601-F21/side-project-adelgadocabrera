import { Container, Hero } from "../../components";
import Post from "../../db/post";
import Posts from "./Posts";

interface Props {
  posts: Post[];
}

const HomePage: React.FC<Props> = ({ posts }) => {
  return (
    <Container>
      <Hero />
      <Posts posts={posts} />
    </Container>
  );
};

export default HomePage;
