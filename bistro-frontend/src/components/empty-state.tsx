import { View, Text, Image, Pressable } from "react-native";

interface Props {
  onAskWoki?: () => void;
}

export function EmptyState({ onAskWoki }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="w-16 h-16 rounded-full bg-bg items-center justify-center mb-4">
        <Text className="text-4xl">🧺</Text>
      </View>
      <Text className="font-sans-semibold text-base text-muted text-center">
        Your cart is empty
      </Text>
      <Text className="font-sans text-sm text-muted mt-1 text-center leading-5">
        Try asking Woki for a recommendation
      </Text>
      {onAskWoki && (
        // Bug 2: pill with Woki mascot avatar, matching the chat FAB style
        <Pressable
          onPress={onAskWoki}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 24,
            paddingLeft: 6,
            paddingRight: 20,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: "#D64545",
            gap: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../../assets/images/woki.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            Ask Woki
          </Text>
        </Pressable>
      )}
    </View>
  );
}
