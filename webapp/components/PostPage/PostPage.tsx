import styled from "styled-components";
import { Container } from "../index";
import Post from "../../db/post";

const Title = styled.h1``;

const Body = styled.p``;

const PostPage: React.FC<Post> = (post) => {
  const {
    title,
    content,
    gist,
    author,
    badges,
    likes,
    codeReviews,
    createdAt,
    isOpen,
    views,
  } = post;
  return (
    <Container>
      <Title>{title}</Title>
      <Body>{content}</Body>
      <p>gist</p>
      <p>likes: {likes}; </p>
    </Container>
  );
};

export default PostPage;
