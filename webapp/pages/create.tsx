import { useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { Button, Container, Navbar, TextInput } from "../components";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import styled from "styled-components";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Create: NextPage = () => {
  const [session, loading] = useSession();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [gist, setGist] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    if (!title) {
      return setErrorMsg("Please, specify a title");
    }

    if (!content) {
      return setErrorMsg("Please, add a description to help other develoeprs");
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
      const result = await req.json();

      console.log(result);
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
        <form onSubmit={onSubmit}>
          <Subheader>
            Title <Required>*</Required>
          </Subheader>
          <TextInput autoFocus text={title} callback={setTitle} fluid mt={5} />
          <Subheader>
            Description <Required>*</Required>
          </Subheader>
          <MDEditor
            style={{
              fontFamily:
                "Fira Code, Consolas, Menlo, Droid Sans Mono, Dejavu Sans",
            }}
            height={250}
            minHeight={200}
            preview="edit"
            value={content}
            onChange={(e?: string) => setContent(e ? e : "")}
          />
          <Subheader>
            Gist <Required>*</Required>
          </Subheader>
          <TextInput
            text={gist}
            callback={setGist}
            fluid
            mt={5}
            mb={20}
            placeholder="https://gist.github.com/<username>/<id>"
          />
          <Button
            callback={onSubmit}
            disabled={loading || !session?.user?.name}
          >
            Submit!
          </Button>
          {errorMsg && <Error>{errorMsg}</Error>}
        </form>
      </Container>
    </>
  );
};

export default Create;

const Header = styled.h1`
  font-size: 22px;
`;

const Subheader = styled.h2`
  font-size: 19px;
`;

const Required = styled.span`
  color: #f44336;
`;

const Error = styled.p`
  font-family: Montserrat;
  font-weight: bold;
  text-align: center;
  color: #f44336;
  font-size: 18px;
`;
