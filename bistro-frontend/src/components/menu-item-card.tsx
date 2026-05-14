import { View, Text, Image, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import type { MenuItem } from "../types";
import { useCartStore } from "../store/cart-store";
import { lightImpact } from "../lib/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  item: MenuItem;
  onPress?: () => void;
}

export function MenuItemCard({ item, onPress }: Props) {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.item_id === item.id)?.quantity ?? 0
  );
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleAdd = () => {
    scale.value = withSpring(0.92, { damping: 10, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 300 });
    });
    addItem(item.id, 1);
    lightImpact();
  };

  const handleDecrement = () => {
    lightImpact();
    if (quantity === 1) {
      removeItem(item.id);
    } else {
      updateItem(item.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    lightImpact();
    addItem(item.id, 1);
  };

  return (
    <Pressable onPress={onPress} className="mb-4 mx-4">
    <View className="bg-surface rounded-2xl overflow-hidden shadow-sm">
      <Image
        source={{ uri: item.image_url }}
        className="w-full h-56"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row items-start gap-x-2 mb-1">
          <Text
            className="font-sans-semibold text-base text-ink flex-1"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {item.tags.includes("popular") && (
            <View className="bg-sage rounded-full px-2.5 py-1 self-start">
              <Text className="font-sans-semibold text-xs text-white">Popular</Text>
            </View>
          )}
        </View>

        <Text
          className="font-sans text-sm text-muted mb-3 leading-5"
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="font-sans-semibold text-base text-ink">
            ${item.price.toFixed(2)}
          </Text>

          {quantity === 0 ? (
            // Add button — shows when item is not in cart
            <AnimatedPressable
              onPress={handleAdd}
              style={animatedStyle}
              className="w-10 h-10 rounded-full bg-ink items-center justify-center"
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </AnimatedPressable>
          ) : (
            // Inline stepper — shows when item is already in cart
            <View
              className="flex-row items-center bg-ink rounded-full h-10 px-1"
            >
              <Pressable
                onPress={handleDecrement}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="remove" size={16} color="#FFFFFF" />
              </Pressable>

              <Text
                className="font-sans-semibold text-sm text-surface text-center"
                style={{ minWidth: 20 }}
              >
                {quantity}
              </Text>

              <Pressable
                onPress={handleIncrement}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
    </Pressable>
  );
}
