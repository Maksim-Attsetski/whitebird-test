import { useEffect, type FC, type PropsWithChildren } from "react";
import { routes, supabase } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "@/hooks";
import { setUser, type TUser } from "@/entities/users";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const updateUser = (user: TUser) => {
    dispatch(setUser(user));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => updateUser(data.session?.user ?? null));

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      updateUser(session?.user ?? null);
      if (session?.user) {
        navigate(routes.home);
      } else {
        navigate(routes.auth);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return children;
};
