import { useState } from "react";
import styled from "styled-components";
import {
  Container as container,
  AuthorSignature,
} from "../../components/index";
import Post from "../../db/post";
import Markdown from "react-markdown";
import Gist from "super-react-gist";
import CodeReviews from "./CodeReviews";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
  const [comment, setComment] = useState<string>("");

  return (
    <Container>
      <Title>{title}</Title>
      <Date>{createdAt.toDateString()}</Date>
      <Body>
        <MarkdownWrapper>
          <Markdown>{content}</Markdown>
        </MarkdownWrapper>
        {gist && <Gist url={gist} />}
        <p>likes: {likes}; </p>
      </Body>
      <SignatureWrapper>
        {author && (
          <>
            <SignatureLabel>Written by</SignatureLabel>
            <AuthorSignature user={author} />
          </>
        )}
      </SignatureWrapper>
      <AddCommentLabel>Add Code Review</AddCommentLabel>
      <MDEditor
        style={{
          fontFamily:
            "Fira Code, Consolas, Menlo, Droid Sans Mono, Dejavu Sans",
        }}
        height={150}
        minHeight={150}
        preview="edit"
        value={comment}
        onChange={(e?: string) => setComment(e ? e : "")}
      />
      <CodeReviews />
    </Container>
  );
};

export default PostPage;

const Container = styled(container)`
  margin-bottom: 100px;
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 10px;
`;

const MarkdownWrapper = styled.div`
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 1.5;
`;

const Date = styled.span`
  color: gray;
  font-size: 14px;
  font-weight: 600;
`;

const SignatureWrapper = styled.div`
  padding-left: 50px;
  position: relative;
  border-top: solid 1px rgb(0, 0, 0, 0.1);
  padding-top: 30px;
`;

const SignatureLabel = styled.div`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 13px;
  color: gray;
  position: absolute;
  top: 20px;
  left: 130px;
  text-transform: uppercase;
`;

const AddCommentLabel = styled.p`
  margin-top: 80px;
  font-family: Montserrat;
  font-weight: 700;
`;

const Body = styled.div`
  margin-bottom: 50px;
`;
