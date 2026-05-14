import { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, Image, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useUIStore } from "../store/ui-store";
import { useCartStore } from "../store/cart-store";
import { lightImpact, successNotification } from "../lib/haptics";

export function OrderConfirmation() {
  const visible = useUIStore((s) => s.isOrderConfirmationOpen);
  const closeOrderConfirmation = useUIStore((s) => s.closeOrderConfirmation);
  const clearCart = useCartStore((s) => s.clearCart);

  // Freeze the order number for the lifetime of this open session
  const [orderNumber] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  useEffect(() => {
    if (visible) {
      successNotification();
    }
  }, [visible]);

  const handleDismiss = () => {
    lightImpact();
    clearCart();
    closeOrderConfirmation();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent={false}
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View
        style={StyleSheet.absoluteFill}
        className="bg-bg items-center justify-center px-8"
      >
        <Animated.View
          entering={FadeInDown.duration(500)}
          className="items-center w-full"
        >
          {/* Woki mascot with success badge */}
          <View style={{ position: "relative", width: 120, height: 120, marginBottom: 8 }}>
            <View className="w-28 h-28 rounded-full bg-surface border border-border overflow-hidden items-center justify-center">
              <Image
                source={require("../../assets/images/woki.png")}
                style={{ width: 96, height: 96 }}
                resizeMode="contain"
              />
            </View>
            {/* Checkmark badge */}
            <View
              className="bg-sage rounded-full items-center justify-center"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 34,
                height: 34,
                borderWidth: 3,
                borderColor: "#FAF7F2",
              }}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading */}
          <Text className="font-serif-semibold text-3xl text-ink text-center mt-6">
            Thanks for ordering!
          </Text>

          {/* Subtext */}
          <Text className="font-sans text-base text-muted text-center mt-3 leading-relaxed">
            Your food is being prepared and will be on its way soon.
          </Text>

          {/* Order number */}
          <Text className="font-sans-medium text-sm text-muted mt-6">
            Order #{orderNumber}
          </Text>

          {/* Spacer */}
          <View style={{ height: 64 }} />

          {/* CTA */}
          <Pressable
            onPress={handleDismiss}
            className="bg-ink rounded-full py-4 w-full items-center"
          >
            <Text className="font-sans-semibold text-base text-surface">
              Back to Menu
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
