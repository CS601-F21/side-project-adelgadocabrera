import Post from "./post";
import Badge from "./badge";

export default interface User {
  id: number;
  username: string;
  email: string;
  quote: string;
  createdAt: Date;
  updatedAt: Date;
  isStudent: boolean;
  isWorker: boolean;
  company: string;
  studentYears: number;
  workYears: number;
  posts?: Post[];
  comments?: Comment[];
  badges?: Badge[];
}
