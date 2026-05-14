import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUIStore } from "../store/ui-store";

interface Props {
  count: number;
}

export function CartFab({ count }: Props) {
  const openCart = useUIStore((s) => s.openCart);
  return (
    <Pressable
      onPress={openCart}
      className="w-14 h-14 rounded-full bg-ink items-center justify-center shadow-lg"
      style={{
        position: "absolute",
        bottom: 24,
        left: 24,
        zIndex: 10,
        elevation: 10,
      }}
    >
      <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
      {count > 0 && (
        <View className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-accent items-center justify-center px-1">
          <Text className="font-sans-bold text-xs text-surface leading-none">
            {count > 99 ? "99+" : count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
