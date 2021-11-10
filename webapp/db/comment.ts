import User from './user';
import CodeReview from "./codeReview";

export default interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    author: User;
    authorId: number;
    codeReview: CodeReview;
    codeReviewId: number;
}