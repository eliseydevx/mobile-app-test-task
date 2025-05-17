import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function getInitials(email: string) {
  const [name] = email.split("@");
  if (!name) return "";
  return name.length > 2
    ? name.slice(0, 2).toUpperCase()
    : name[0].toUpperCase();
}

export default function UsersScreen() {
  const { users, loading, refresh } = useUsers();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/");
    Toast.show({ type: "success", text1: "Вы вышли" });
  };

  function handleCopy(email: string) {
    Clipboard.setStringAsync(email);
    Toast.show({
      type: "success",
      text1: "Email скопирован!",
      text2: email,
    });
  }

  return (
    <View className="flex-1 bg-neutral-950 px-4 pt-12">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-extrabold text-white">Пользователи</Text>
        <Button
          onPress={handleLogout}
          className="bg-neutral-800 border border-blue-600 px-4 py-2 rounded-xl"
        >
          Выйти
        </Button>
      </View>
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#1fa2ff" />
      ) : users.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-neutral-400 text-lg">Пользователей нет</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await refresh?.();
            setTimeout(() => setRefreshing(false), 400);
          }}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#4f44c4", "#1fa2ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 16,
                padding: 2,
                marginBottom: 12,
              }}
            >
              <Pressable
                onPress={() => handleCopy(item.email)}
                style={{
                  borderRadius: 14,
                  backgroundColor: "#181924",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#4f44c433",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                  >
                    {getInitials(item.email)}
                  </Text>
                </View>
                <Text className="text-white text-base">{item.email}</Text>
              </Pressable>
            </LinearGradient>
          )}
        />
      )}
    </View>
  );
}
