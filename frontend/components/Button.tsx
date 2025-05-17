import {
  Pressable,
  Text,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";
import React from "react";

export function Button({
  children,
  gradient,
  className,
  loading,
  ...props
}: PressableProps & {
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
  loading?: boolean;
}) {
  if (gradient) {
    return (
      <Pressable
        {...props}
        style={[
          { borderRadius: 14, overflow: "hidden", marginTop: 8 },
          typeof props.style === "function" ? undefined : props.style,
        ]}
      >
        <LinearGradient
          colors={["#4f44c4", "#1fa2ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 32,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-base">{children}</Text>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  // ОБРАБОТКА ФУНКЦИИ В style:
  if (typeof props.style === "function") {
    return (
      <Pressable
        {...props}
        className={clsx(
          "bg-neutral-800 rounded-xl px-8 py-3 items-center mt-2 border border-blue-600",
          className
        )}
        style={(state) => {
          if (typeof props.style === "function") {
            const styleResult = props.style(state);
            return [styleResult, { marginTop: 8 }].filter(Boolean);
          }
          return [{ marginTop: 8 }];
        }}
      >
        {loading ? (
          <ActivityIndicator color="#1fa2ff" />
        ) : (
          <Text className="text-blue-400 font-bold text-base">{children}</Text>
        )}
      </Pressable>
    );
  }

  // ОБЫЧНЫЙ ОБЪЕКТ/МАССИВ СТИЛЕЙ:
  return (
    <Pressable
      {...props}
      className={clsx(
        "bg-neutral-800 rounded-xl px-8 py-3 items-center mt-2 border border-blue-600",
        className
      )}
      style={[props.style, { marginTop: 8 }]}
    >
      <Text className="text-blue-400 font-bold text-base">{children}</Text>
    </Pressable>
  );
}
