import type { User } from "@supabase/supabase-js";

class LikesApi {
  getByUserId(id: User["id"]) {}

  async create() {}

  async delete() {}

  async update() {}
}

export const likesApi = new LikesApi();
