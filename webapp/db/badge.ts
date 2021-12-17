export default interface Badge {
  id: number;
  name: string;
  years?: number | null;
  userId?: number | null;
  postId?: number | null;
}

export interface BadgesMap {
  [key: string]: number;
}
