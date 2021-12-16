import Post from "../../db/post";
import { PostCard } from "../../components";

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <main>
      {posts.map((post) => (
        <PostCard
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
