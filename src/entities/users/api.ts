import { supabase } from "@/constants";
import type { IRole } from "./types";

class RolesApi {
  private url: string = "roles";

  async get(id: string) {
    const res = await supabase.from("roles").select("*").eq("user_id", id).single();
    return res.data ?? null;
  }

  async create(data: Partial<IRole>) {
    const res = await supabase.from(this.url).insert(data).single<IRole>();
    return res.data;
  }

  async delete(id: IRole["id"]) {
    await supabase.from(this.url).delete().eq("id", id);
  }

  async update(data: Partial<IRole>) {
    const res = await supabase.from(this.url).update(data).eq("id", data?.id).single<IRole>();
    return res.data;
  }
}

export const rolesApi = new RolesApi();
