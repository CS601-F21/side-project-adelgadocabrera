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

        <Button link to={"/create"}>
          Request Code Review
        </Button>
      </HeadlineWrapper>
      {posts.map((p) => (
        <PostCard
          post={{
            id: p.id,
            title: p.title,
            content: p.content,
            gist: p.gist,
            author: p.author,
            authorId: p.authorId,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            isOpen: p.isOpen,
            likes: p.likes,
            views: p.views,
            badges: p.badges,
            codeReviews: p.codeReviews,
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
`;
