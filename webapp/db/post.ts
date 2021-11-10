import User from './user';
import Badge from './badge';
import CodeReview from './codeReview';

export default interface Post {
    id: number;
    title: string;
    content: string;
    gist: string;
    author: User;
    authorId: number;
    isOpen: boolean;
    likes: number;
    views: number
    badges: Badge[];
    codereviews: CodeReview[];
}