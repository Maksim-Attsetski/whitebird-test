import { supabase } from "@/constants";
import { EPostPriority, type IPost } from "../types";

export interface IPostFilters {
  sortBy: keyof IPost;
  sortMethod: "asc" | "desc";
  search: string;
}

const priorityList = {
  [EPostPriority.HIGH]: 1,
  [EPostPriority.NORMAL]: 0,
  [EPostPriority.LOW]: -1,
};

class PostsApi {
  private url: string = "posts";

  async get() {
    const res = await supabase.from("posts").select("*");
    return res.data ?? [];
  }

  async getWithFilters({ search, sortBy, sortMethod }: IPostFilters) {
    const res = await supabase.from("posts").select("*");

    let posts = (res.data ?? []) as IPost[];
    if (search.length > 0) {
      posts = posts?.filter((p) => p?.title.toLowerCase().includes(search.toLowerCase()));
    }

    return (posts ?? ([] as IPost[])).sort((a, b) => {
      if (sortBy === "priority") {
        if (sortMethod === "asc") {
          return priorityList[a[sortBy] as EPostPriority] - priorityList[b[sortBy] as EPostPriority];
        } else {
          return priorityList[b[sortBy] as EPostPriority] - priorityList[a[sortBy] as EPostPriority];
        }
      }
      if (sortBy === "created_at") {
        if (sortMethod === "asc") {
          return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
        } else {
          return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
        }
      }
      return 0;
    });
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
