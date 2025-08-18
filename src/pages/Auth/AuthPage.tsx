import { useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";

import { supabase } from "@/constants";
import { useTypedDispatch } from "@/hooks";
import { rolesApi, setUser } from "@/entities/users";

import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test12345");
  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const validateAndSendAuth = (): string | null => {
    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Некорректный email";
    }

    // Валидация пароля (например, минимум 6 символов)
    if (password.length < 6) {
      return "Пароль должен быть не меньше 6 символов";
    }

    return null;
  };

  const onLogin = async () => {
    try {
      const msg = validateAndSendAuth();
      if (msg) {
        setErrorMsg(msg);
        return;
      }
      setIsLoading(true);
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const role = await rolesApi.get(res?.data?.user?.id ?? "");
      dispatch(setUser(res?.data?.user));
    } catch (error: any) {
      setErrorMsg(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async () => {
    try {
      const msg = validateAndSendAuth();
      if (msg) {
        setErrorMsg(msg);
        return;
      }
      setIsLoading(true);
      const res = await supabase.auth.signUp({
        email,
        password,
      });
      const role = await rolesApi.get(res?.data?.user?.id ?? "");
      dispatch(setUser(res?.data?.user));
    } catch (error: any) {
      setErrorMsg(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography.Title className={styles.title}>AuthPage</Typography.Title>
      <Form className={styles.form}>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input.Password
          minLength={8}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <Typography color="red">{errorMsg}</Typography>}
        <Flex align="center" gap={12} justify="space-evenly">
          <Button loading={isLoading} onClick={onLogin} type="primary">
            Войти
          </Button>
          <Button loading={isLoading} onClick={onSignup}>
            Зарегистрироваться
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default AuthPage;
