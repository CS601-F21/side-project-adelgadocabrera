import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Navbar, Footer } from "../../components";
import { PostPage } from "../../containers";
import { default as IPost } from "../../db/post";
import { getPostById } from "../api/posts";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context.query.id);
  const post = await getPostById(id);

  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
};

interface Props {
  post: IPost;
}

const Post: NextPage<Props> = (props) => {
  const [post, setPost] = useState<IPost>(props.post);

  return (
    <>
      <Navbar />
      <PostPage post={post} setPost={setPost} />
      <Footer />
    </>
  );
};

export default Post;
