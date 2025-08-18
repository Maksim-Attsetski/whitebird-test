import { createContext, useContext, useState, useEffect } from "react";
import { routes, supabase } from "@/constants";
import type { User } from "@supabase/supabase-js";
import { Outlet, useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate(routes.home);
      } else {
        navigate(routes.auth);
      }

      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  );
};
