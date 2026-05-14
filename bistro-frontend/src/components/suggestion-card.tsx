import { useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { lightImpact } from "../lib/haptics";
import type { MenuItem } from "../types";

interface Props {
  item: MenuItem;
  index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SuggestionCard({ item, index }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const quantity = cartItems.find((c) => c.item_id === item.id)?.quantity ?? 0;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const handleAdd = () => {
    lightImpact();
    scale.value = withSpring(0.97, { damping: 15, stiffness: 500 }, () => {
      scale.value = withSpring(1, { damping: 15, stiffness: 500 });
    });
    addItem(item.id, 1);
  };

  return (
    <Animated.View
      style={[
        cardStyle,
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#E8E2D5",
          overflow: "hidden",
          marginBottom: 8,
          width: "100%",
        },
      ]}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 72, height: 72 }}
        resizeMode="cover"
      />

      {/* Text content */}
      <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 8, justifyContent: "center" }}>
        <Text
          className="font-sans-semibold text-sm text-ink"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="font-sans text-xs text-muted mt-0.5" numberOfLines={1}>
          {item.description}
        </Text>
        <Text className="font-sans-semibold text-sm text-ink mt-1">
          ${item.price.toFixed(2)}
        </Text>
      </View>

      {/* Add button */}
      <View style={{ paddingRight: 12, alignItems: "center", justifyContent: "center" }}>
        <AnimatedPressable
          onPress={handleAdd}
          hitSlop={8}
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 20,
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {quantity > 0 ? (
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              {quantity}
            </Text>
          ) : (
            <Ionicons name="add" size={18} color="#FFFFFF" />
          )}
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
}
