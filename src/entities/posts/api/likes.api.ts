import { supabase } from "@/constants";
import type { User } from "@supabase/supabase-js";
import type { ILikedPost, IPost } from "../types";

class LikesApi {
  private url: string = "likes";

  async getByUserId(id: User["id"]) {
    const res = await supabase.from(this.url).select("*").eq("user_id", id).select("*");
    return res.data ?? [];
  }

  async getOne(id: User["id"], postId: IPost["id"]) {
    const res = await supabase.from(this.url).select("*").eq("user_id", id).eq("post_id", postId).single();
    return res.data ?? null;
  }

  async create(data: Partial<ILikedPost>) {
    const res = await supabase.from(this.url).upsert(data).select().single<ILikedPost>();
    return res.data;
  }

  async delete(id: ILikedPost["id"]) {
    await supabase.from(this.url).delete().eq("id", id);
  }

  async update(data: Partial<ILikedPost>) {
    const res = await supabase.from(this.url).update(data).eq("id", data?.id).single<ILikedPost>();
    return res.data;
  }
}

export const likesApi = new LikesApi();
