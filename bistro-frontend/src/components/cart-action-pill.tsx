import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { CartAction, MenuItem } from "../types";

interface Props {
  action: CartAction;
  menu: MenuItem[];
}

function formatActionLabel(action: CartAction, menu: MenuItem[]): string | null {
  const item = menu.find((m) => m.id === action.item_id);
  const name = item?.name ?? action.item_id;

  switch (action.type) {
    case "add":
      return `Added ${action.quantity}× ${name}`;
    case "remove":
      return `Removed ${name}`;
    case "update":
      return `Updated ${name} to ${action.quantity}`;
    case "clear":
      return "Cart cleared";
    default:
      return null;
  }
}

export function CartActionPill({ action, menu }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withTiming(0, { duration: 300 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const label = formatActionLabel(action, menu);
  if (!label) return null;

  return (
    <Animated.View
      style={animatedStyle}
      className="self-start bg-sage/10 border border-sage/20 rounded-full px-3 py-1 mt-1.5"
    >
      <Text className="font-sans text-xs text-sage">{label} ✓</Text>
    </Animated.View>
  );
}
