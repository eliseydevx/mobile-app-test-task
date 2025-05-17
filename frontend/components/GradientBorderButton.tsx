import { Pressable, Text, PressableProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";

interface GradientBorderButtonProps extends PressableProps {
  children: React.ReactNode;
}

export function GradientBorderButton({
  children,
  ...props
}: GradientBorderButtonProps) {
  return (
    <LinearGradient
      colors={["#4f44c4", "#1fa2ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 2,
        marginTop: 8,
      }}
    >
      <Pressable
        style={{
          borderRadius: 14,
          backgroundColor: "#181924",
          alignItems: "center",
          paddingVertical: 14,
          paddingHorizontal: 32,
        }}
        {...props}
      >
        <MaskedView
          maskElement={
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "black",
              }}
            >
              {children}
            </Text>
          }
        >
          <LinearGradient
            colors={["#4f44c4", "#1fa2ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              style={{
                opacity: 0,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {children}
            </Text>
          </LinearGradient>
        </MaskedView>
      </Pressable>
    </LinearGradient>
  );
}
