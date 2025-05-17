import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GradientBorderButton } from "@/components/GradientBorderButton";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/hooks/useAuth";
import { BlurView } from "expo-blur";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { register, loading } = useAuth();

  const handleRegister = () => {
    setSubmitted(true);
    register(email, password);
  };
  return (
    <LinearGradient
      colors={["#181924", "#4f44c4", "#1fa2ff"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 justify-center items-center px-4">
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              width: "100%",
              maxWidth: 380,
              alignSelf: "center",
            }}
          >
            <View className="px-6 py-10">
              <Text className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight">
                Регистрация
              </Text>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                error={submitted && !email}
              />
              <Input
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={submitted && !password}
              />
              <Button onPress={handleRegister} gradient loading={loading}>
                Зарегистрироваться
              </Button>
              <GradientBorderButton
                onPress={() => {
                  setSubmitted(false);
                  router.replace("/");
                }}
              >
                Уже есть аккаунт
              </GradientBorderButton>
            </View>
          </BlurView>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
