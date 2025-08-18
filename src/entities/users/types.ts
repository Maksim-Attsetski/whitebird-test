import type { User } from "@supabase/supabase-js";

export interface IRole {
  user_id: string;
  name: string;
  id: number;
  created_at: string;
}

export type TUser = User | null;
