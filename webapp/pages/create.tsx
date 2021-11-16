import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { Container, Button, Navbar, TextInput, MDEditor } from "../components";
import { Response } from "../db/response";
import { useRouter } from "next/router";
import Post from "../db/post";
import styled from "styled-components";

const Create: NextPage = () => {
  const [session, loading] = useSession();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [gist, setGist] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const username = session?.user?.name;

  useEffect(() => {
    if (!loading && !username)
      setErrorMsg("Please sign in to request a code review");
    if (!loading && username) setErrorMsg("");
  }, [session, loading]);

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    if (!title) {
      return setErrorMsg("Please, specify a title");
    }

    if (!content) {
      return setErrorMsg("Please, add a description to help other developers");
    }

    if (!gist) {
      return setErrorMsg("Please, share your code by adding your Github Gist");
    }
    setErrorMsg(""); // clear error messages

    try {
      const body = { title, content, gist };
      const req = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const post: Response<Post> = await req.json();
      if (post.statusCode == 200) {
        const postUrl: string = "/post/" + post.data.id;
        router.push(postUrl);
      }

      if (post.statusCode == 400) {
        setErrorMsg(post.errMsg);
      }

      // TODO: send to new post page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>Code Review</Header>
        <Form onSubmit={onSubmit}>
          <Subheader>
            Title <Required>*</Required>
          </Subheader>
          <TextInput autoFocus text={title} callback={setTitle} fluid mt={5} />
          <Subheader>
            Description <Required>*</Required>
          </Subheader>
          <MDEditor
            value={content}
            callback={setContent}
            height={300}
            minHeight={300}
          />
          <Subheader>
            Gist <Required>*</Required>
          </Subheader>
          <TextInput
            text={gist}
            callback={setGist}
            fluid
            mt={5}
            mb={40}
            placeholder="https://gist.github.com/<username>/<id>"
          />
          <Button callback={onSubmit} disabled={loading || !username}>
            Request Code Review
          </Button>
          {errorMsg && <Error>{errorMsg}</Error>}
        </Form>
      </Container>
    </>
  );
};

export default Create;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 24px;
`;

const Subheader = styled.h2`
  font-size: 20px;
`;

const Required = styled.span`
  color: #f44336;
`;

const Error = styled.p`
  font-family: Montserrat;
  font-weight: bold;
  text-align: center;
  color: #cc0000;
  font-size: 18px;
`;
