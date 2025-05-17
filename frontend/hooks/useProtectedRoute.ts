import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "expo-router";

export function useProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token]);
}