import type { User } from "@supabase/supabase-js";

export interface IRole<U = string> {
  user_id: U;
  name: string;
  id: number;
  created_at: string;
}

export type TUser = User | null;
