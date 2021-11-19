import User from "./user";
import Badge from "./badge";
import CodeReview from "./codeReview";

export default interface Post {
  id: number;
  title: string;
  content: string;
  gist: string;
  authorId: number | null;
  author?: User;
  isOpen: boolean;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  badges?: Badge[];
  codeReviews?: CodeReview[];
  _count?: CodeReviewsCounter;
}

interface CodeReviewsCounter {
  codeReviews: number;
}
