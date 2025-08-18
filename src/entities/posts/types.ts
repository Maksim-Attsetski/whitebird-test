import type { User } from "@supabase/supabase-js";

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

export interface ILikedPost<U = string, P = IPost["id"]> {
  id: number;
  created_at: string;
  user_id: U;
  post_id: P;
}

export interface IFavoritePost<U = string, P = IPost["id"]> {
  id: number;
  created_at: string;
  user_id: U;
  post_id: P;
}

export interface IComment {
  id: number;
  post_id: IPost["id"];
  creator_id: User["id"];
  created_at: string;
  title: string;
  description: string;
}
