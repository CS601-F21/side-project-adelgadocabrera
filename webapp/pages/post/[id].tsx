import {GetServerSideProps, NextPage} from "next";
import {Navbar, PostPage} from '../../components';
import {default as IPost} from "../../db/post";
import {getPostById} from "../api/posts";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: number = Number(context.query.id);
    const post = await getPostById(id);

    return {
        props: {
            post
        }
    }
}

interface Props {
    post: IPost;
}

const Post: NextPage<Props> = (props) => {
    const {post} = props;
    console.log(post);

    return <>
        <Navbar/>
        <PostPage {...post}/>
    </>
}

export default Post