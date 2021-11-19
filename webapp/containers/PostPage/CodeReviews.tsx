import styled from "styled-components";
import CodeReview from "./CodeReview";
import ICodeReview from "../../db/codeReview";
import { Session } from "next-auth";

interface Props {
  codereviews: ICodeReview[];
  session: Session | null;
  loading: boolean;
}

const CodeReviews: React.FC<Props> = ({ codereviews, session, loading }) => {
  if (loading) return <div></div>;
  return (
    <Container>
      {!session?.user?.name ? (
        <Empty>Sign in to submit a code review</Empty>
      ) : codereviews.length == 0 ? (
        <Empty>Be the first one to submit a code review!</Empty>
      ) : (
        <Label>Code Reviews</Label>
      )}
      {codereviews.map((c) => (
        <CodeReview key={"code-review-" + c.createdAt} codereview={c} />
      ))}
    </Container>
  );
};

export default CodeReviews;

const Container = styled.div``;

const Label = styled.h1`
  margin-top: 50px;
  font-size: 22px;
`;

const Empty = styled.div`
  text-align: center;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 18px;
  margin-top: 60px;
`;
