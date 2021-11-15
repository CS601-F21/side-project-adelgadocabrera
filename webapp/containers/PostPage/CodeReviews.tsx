import styled from "styled-components";
import CodeReview from "./CodeReview";
import Markdown from "react-markdown";

const Container = styled.div``;

const Label = styled.h1`
  margin-top: 50px;
  font-size: 22px;
`;

const CodeReviews: React.FC = () => {
  return (
    <Container>
      <Label>Code Reviews</Label>
      <CodeReview />
    </Container>
  );
};

export default CodeReviews;
