import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GradientBorderButton } from "@/components/GradientBorderButton";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { login, loading } = useAuth();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <LinearGradient
      colors={["#181924", "#4f44c4", "#1fa2ff"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          emailRef.current?.blur();
          passwordRef.current?.blur();
          Keyboard.dismiss();
        }}
        accessible={false}
      >
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
                Вход
              </Text>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                ref={emailRef}
                error={submitted && !email}
              />
              <Input
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordRef}
                error={submitted && !password}
              />
              <Button
                onPress={() => {
                  setSubmitted(true);
                  login(email, password);
                }}
                className="bg-blue-600 rounded-xl mt-2"
                gradient
                loading={loading}
              >
                Войти
              </Button>
              <GradientBorderButton
                onPress={() => {
                  setSubmitted(false);
                  router.push("/register");
                }}
              >
                Зарегистрироваться
              </GradientBorderButton>
            </View>
          </BlurView>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
