import { supabase } from "@/constants";
import type { User } from "@supabase/supabase-js";
import type { IFavoritePost, IPost } from "../types";

class FavoritesApi {
  private url: string = "favorites";

  async getByUserId(id: User["id"]) {
    const res = await supabase.from(this.url).select("*").eq("user_id", id).select("*");
    return res.data ?? [];
  }

  async getOne(id: User["id"], postId: IPost["id"]) {
    const res = await supabase.from(this.url).select("*").eq("user_id", id).eq("post_id", postId).single();
    return res.data ?? null;
  }

  async create(data: Partial<IFavoritePost>) {
    const res = await supabase.from(this.url).upsert(data).select().single();
    return res.data;
  }

  async delete(id: IFavoritePost["id"]) {
    await supabase.from(this.url).delete().eq("id", id);
  }

  async update(data: Partial<IFavoritePost>) {
    const res = await supabase.from(this.url).update(data).eq("id", data?.id).single<IFavoritePost>();
    return res.data;
  }
}

export const favoritesApi = new FavoritesApi();
