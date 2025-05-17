import { View, Text } from "react-native";

interface ToastProps {
  text1?: string;
  text2?: string;
  [key: string]: any;
}

export const toastConfig = {
  success: (props: ToastProps) => {
    const { text1, text2 } = props;
    return (
      <View
        style={{
          backgroundColor: "#181924",
          borderLeftWidth: 6,
          borderLeftColor: "#1fa2ff",
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: 16,
          marginHorizontal: 10,
          marginTop: 12,
          shadowColor: "#1fa2ff",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 16,
          elevation: 8,
          width: "90%",
        }}
      >
        <Text
          style={{
            color: "#1fa2ff",
            fontWeight: "bold",
            fontSize: 17,
            marginBottom: 4,
          }}
        >
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "#fff", fontSize: 14 }}>{text2}</Text>
        ) : null}
      </View>
    );
  },
  error: (props: ToastProps) => {
    const { text1, text2 } = props;
    return (
      <View
        style={{
          backgroundColor: "#181924",
          borderLeftWidth: 6,
          borderLeftColor: "#FF4770",
          paddingVertical: 14,
          paddingHorizontal: 18,
          borderRadius: 16,
          marginHorizontal: 10,
          marginTop: 12,
          shadowColor: "#FF4770",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 16,
          elevation: 8,
          width: "90%",
        }}
      >
        <Text
          style={{
            color: "#FF4770",
            fontWeight: "bold",
            fontSize: 17,
            marginBottom: 4,
          }}
        >
          {text1}
        </Text>
        {text2 ? (
          <Text style={{ color: "#fff", fontSize: 14 }}>{text2}</Text>
        ) : null}
      </View>
    );
  },
  // Можно добавить info, warning и др. типы по аналогии
};
