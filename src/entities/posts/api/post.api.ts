import { supabase } from "@/constants";
import type { IPost } from "../types";

class PostsApi {
  private url: string = "posts";

  async get() {
    const res = await supabase.from("posts").select("*");
    return res.data ?? [];
  }

  async getOne(id: IPost["id"]) {
    const res = await supabase.from(this.url).select("*").eq("id", id).single();
    return res.data ?? null;
  }

  async create(data: Partial<IPost>) {
    const res = await supabase.from(this.url).upsert(data).select().single<IPost>();
    return res.data;
  }

  async delete(id: IPost["id"]) {
    await supabase.from(this.url).delete().eq("id", id);
  }

  async update(data: Partial<IPost>) {
    const res = await supabase.from(this.url).update(data).eq("id", data?.id).select().single<IPost>();
    return res.data;
  }
}

export const postsApi = new PostsApi();
