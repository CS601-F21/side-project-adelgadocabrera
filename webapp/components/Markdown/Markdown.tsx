import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface Props {
  content: string;
}

export const Markdown: React.FC<Props> = ({ content }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown>{content}</ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default Markdown;

const MarkdownWrapper = styled.div`
  font-size: 18px;
  line-height: 1.5;
`;
