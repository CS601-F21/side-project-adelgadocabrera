import User from './user';
import Post from './post';
import Comment from './comment'

export default interface CodeReview {
    id: number;
    author: User;
    authorId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    likes: number;
    post: Post;
    postId: number;
}