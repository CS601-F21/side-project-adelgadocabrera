import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  Container as container,
  MDEditor,
  Markdown,
  AuthorSignature,
  Button,
} from "../../components/index";
import Post from "../../db/post";
import Gist from "super-react-gist";
import CodeReviews from "./CodeReviews";
import { useSession } from "next-auth/client";
import { default as IPost } from "../../db/post";
import CodeReview from "../../db/codeReview";
import { Response } from "../../db/response";

interface Props {
  post: Post;
  setPost: Dispatch<SetStateAction<IPost>>;
}

const PostPage: React.FC<Props> = ({ post, setPost }) => {
  const {
    id,
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
  const [session, loading] = useSession();

  const handle = async () => {
    const request = await fetch("/api/codereview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // @ts-ignore
        authorId: session?.user?.id,
        content: comment,
        postId: id,
      }),
    });
    const response: Response<CodeReview> = await request.json();

    if (response.statusCode == 200) {
      const codereview = response.data;
      setComment("");
      post.codeReviews
        ? setPost({ ...post, codeReviews: [codereview, ...post?.codeReviews] })
        : setPost({
            ...post,
            codeReviews: [codereview],
          });
    }
    // TODO: set error message
  };

  // TODO: have to handle better gists in case user
  // submits wrong gist url

  return (
    <Container>
      <Background>
        <SignatureWrapper>
          {author && (
            <>
              <SignatureLabel>Written by</SignatureLabel>
              <AuthorSignature user={author} />
            </>
          )}
        </SignatureWrapper>
        <Title>{title}</Title>
        <Date>{createdAt.toDateString()}</Date>
        <Markdown content={content} />
      </Background>
      {gist && <Gist url={gist} />}
      <AddCommentLabel>Add Code Review</AddCommentLabel>
      <MDEditor
        value={comment}
        callback={setComment}
        height={250}
        minHeight={250}
      />
      <ButtonWrapper>
        <Button
          callback={handle}
          disabled={!comment || loading || !session?.user?.name}
        >
          Submit
        </Button>
      </ButtonWrapper>
      {codeReviews && (
        <CodeReviews
          loading={loading}
          session={session}
          codereviews={codeReviews}
        />
      )}
    </Container>
  );
};

export default PostPage;

const Container = styled(container)`
  margin-bottom: 100px;
`;

const Background = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 10px;

  @media (min-width: 768px) {
    margin-top: 50px;
    padding: 20px 30px 20px 30px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Date = styled.span`
  color: gray;
  font-size: 14px;
  font-weight: 600;
`;

const SignatureWrapper = styled.div`
  position: relative;
  padding-top: 30px;
  padding-bottom: 40px;
`;

const SignatureLabel = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 13px;
  color: gray;
  position: absolute;
  top: 20px;
  left: 80px;
  text-transform: uppercase;
`;

const AddCommentLabel = styled.p`
  margin-top: 80px;
  font-family: Montserrat;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const InvalidGist = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-top: 40px;
`;
