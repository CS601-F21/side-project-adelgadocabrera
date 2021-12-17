import { useState } from "react";
import { BadgesMap } from "../../db/badge";
import { TextInput } from "../../components";
import Post from "../../db/post";
import styled from "styled-components";
// import SelectSearch, { SelectSearchOption } from "react-select-search";

interface Props {
  badges: BadgesMap;
  posts: Post[];
  setPosts: Function;
}

const Search: React.FC<Props> = ({ badges, setPosts, posts }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <Wrapper>
      <Label>Search by badge</Label>
      <TextInput
        placeholder="Search javascript, leetcode, .net.."
        text={search}
        callback={(e: any) => {
          setSearch(e);
          setPosts(
            posts.filter((p: Post) =>
              p.badges?.some((b) => b.name.toLowerCase().indexOf(e) >= 0)
            )
          );
        }}
      />
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-right: 10px;
`;
