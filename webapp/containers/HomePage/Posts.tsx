import Post from "../../db/post";
import { PostCard } from "../../components";

interface Props {
  posts: Post[];
  editable?: boolean;
}

const Posts: React.FC<Props> = ({ posts, editable }) => {
  return (
    <main style={{ marginBottom: "50px" }}>
      {posts.map((post) => (
        <PostCard
          editable={!!editable}
          key={"post-id-" + post.id}
          post={{
            ...post,
          }}
        />
      ))}
    </main>
  );
};

export default Posts;
