import { favoritesApi, likesApi } from "@/entities/posts";
import { setFavorites, setLikes } from "@/entities/posts/slice";
import { rolesApi, setRole } from "@/entities/users";
import { useTypedDispatch, useTypedSelector } from "@/hooks";
import { useEffect, type FC, type PropsWithChildren } from "react";

const GetDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useTypedSelector((s) => s.users);
  const dispatch = useTypedDispatch();

  const fetchData = async () => {
    if (!user) return;
    const role = await rolesApi.get(user?.id);
    const likes = await likesApi.getByUserId(user?.id);
    const favorites = await favoritesApi.getByUserId(user?.id);

    dispatch(setRole(role));
    dispatch(setLikes(likes));
    dispatch(setFavorites(favorites));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return children;
};

export default GetDataProvider;
