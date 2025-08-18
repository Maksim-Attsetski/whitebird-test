export enum EPostPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
}

export interface IPost<C = string> {
  id: number;
  created_at: string;
  title: string;
  description: string;
  priority: EPostPriority;
  creator_id: C;
}

export interface ILikedPost<U = string, P = number> {
  id: number;
  created_at: string;
  user_id: U;
  post_id: P;
}

export interface IFavoritePost<U = string, P = number> {
  id: number;
  created_at: string;
  user_id: U;
  post_id: P;
}
