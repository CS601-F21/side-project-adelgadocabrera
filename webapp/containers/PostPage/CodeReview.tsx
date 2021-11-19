import styled from "styled-components";
import ICodeReview from "../../db/codeReview";
import { fromNow } from "../../utils/dates";
import { Markdown, AuthorSignature } from "../../components";

interface Props {
  codereview: ICodeReview;
}

const CodeReview: React.FC<Props> = ({ codereview }) => {
  const { author, content, updatedAt, comments, likes } = codereview;
  return (
    <Container>
      <AuthorSignature user={author} />
      <Markdown content={content} />
      <Date>{fromNow(updatedAt)}</Date>
    </Container>
  );
};

export default CodeReview;

const Date = styled.div`
  font-size: 14px;
`;

const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 3px;
  border: solid 1px rgb(0, 0, 0, 0);
  transition: border 0.1s linear;
  display: flex;
  flex-direction: column;

  &:hover {
    border: solid 1px rgb(10, 10, 140, 0.7);

    img {
      border: solid 1px rgb(10, 10, 140, 0.7);
    }

    ${Date} {
      color: rgb(10, 10, 140, 0.7);
    }
  }
`;

const Author = styled.div``;

const Content = styled.div`
  margin-top: -15px;
  margin-left: 80px;
  font-size: 18px;
`;
