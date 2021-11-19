import Post from "../../db/post";
import { Code, PostCard, Button } from "../../components";
import styled from "styled-components";

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <main>
      <HeadlineWrapper>
        <p>
          Get started by <Code>code reviewing</Code>
        </p>

        <Button link to={"/codereview"}>
          Request Code Review
        </Button>
      </HeadlineWrapper>
      {posts.map((post) => (
        <PostCard
          key={"post-id-" + post.id}
          post={{
            ...post,
          }}
        />
      ))}
    </main>
  );
};

export default Posts;

const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;
