import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightImpact, mediumImpact } from "../lib/haptics";

interface Props {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({ quantity, onIncrement, onDecrement }: Props) {
  const handleDecrement = () => {
    mediumImpact();
    onDecrement();
  };

  const handleIncrement = () => {
    lightImpact();
    onIncrement();
  };

  return (
    <View className="flex-row items-center gap-x-3">
      <Pressable
        onPress={handleDecrement}
        className="w-8 h-8 rounded-full border border-border items-center justify-center"
      >
        <Ionicons name="remove" size={16} color="#1A1A1A" />
      </Pressable>

      <Text className="font-sans-semibold text-base text-ink w-5 text-center">
        {quantity}
      </Text>

      <Pressable
        onPress={handleIncrement}
        className="w-8 h-8 rounded-full bg-ink items-center justify-center"
      >
        <Ionicons name="add" size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
