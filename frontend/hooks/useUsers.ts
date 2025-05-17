import { api } from "@/api/axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState, useCallback } from "react";

export function useUsers() {
  const token = useAuthStore((s) => s.token);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = fetchUsers;

  return { users, loading, refresh };
}
