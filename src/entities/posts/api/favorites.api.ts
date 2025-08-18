import type { User } from "@supabase/supabase-js";

class FavoritesApi {
  getByUserId(id: User["id"]) {}

  async create() {}

  async delete() {}

  async update() {}
}

export const favoritesApi = new FavoritesApi();
