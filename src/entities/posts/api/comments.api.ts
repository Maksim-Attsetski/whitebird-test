import { supabase } from "@/constants";
import type { IComment, IPost } from "../types";

class CommentApi {
  private url: string = "comments";

  async getByPostId(id: IPost["id"]): Promise<IComment[]> {
    const res = await supabase.from(this.url).select("*").eq("post_id", id).select("*");
    return res.data ?? [];
  }

  async create(data: Partial<IComment>) {
    const res = await supabase.from(this.url).upsert(data).select().single<IComment>();
    return res.data;
  }

  async delete(id: IComment["id"]) {
    await supabase.from(this.url).delete().eq("id", id);
  }

  async update(data: Partial<IComment>) {
    const res = await supabase.from(this.url).update(data).eq("id", data?.id).select().single<IComment>();
    return res.data;
  }
}

export const commentApi = new CommentApi();
