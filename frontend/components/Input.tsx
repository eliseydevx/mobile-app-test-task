import {
  TextInput,
  TextInputProps,
  View,
  TextInput as RNTextInput,
} from "react-native";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import clsx from "clsx";

export const Input = forwardRef<
  RNTextInput,
  TextInputProps & { className?: string; error?: boolean }
>(({ className, style, error, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const innerRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  let borderColor = "#272a38"; // дефолт
  if (error) borderColor = "#FF4770"; // красный (error)
  else if (focused) borderColor = "#4f44c4"; // синий (фокус)

  return (
    <View
      style={{
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: "#232332",
        overflow: "hidden",
      }}
    >
      <TextInput
        ref={innerRef}
        className={clsx(
          "rounded-xl px-4 py-3 text-base bg-transparent text-white placeholder:text-neutral-400",
          className
        )}
        style={[{ color: "#fff", height: 48 }, style]}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  );
});
