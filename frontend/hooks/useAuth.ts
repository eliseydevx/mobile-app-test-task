import { api } from "@/api/axios";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((s) => s.setToken);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const register = async (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Заполните все поля" });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: "error", text1: "Некорректный email" });
      return;
    }
    setLoading(true);
    try {
      await api.post("/register", { email, password });
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: "Регистрация прошла успешно!",
      });
      router.replace("/");
    } catch (e) {
      const err = e as any;
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: err?.response?.data?.message || "Ошибка регистрации",
      });
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Заполните все поля" });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({ type: "error", text1: "Некорректный email" });
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      setToken(res.data.access_token);
      Toast.show({
        type: "success",
        text1: "Вход выполнен",
      });
      router.replace("/users");
    } catch (e) {
      const err = e as any;
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: err?.response?.data?.message || "Ошибка входа",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace("/");
    Toast.show({ type: "success", text1: "Вы вышли" });
  };

  return { register, login, loading, handleLogout };
}
