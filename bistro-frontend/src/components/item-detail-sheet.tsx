import { useState, useRef, useEffect, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { lightImpact } from "../lib/haptics";
import type { MenuItem } from "../types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export function ItemDetailSheet({ item, onClose }: Props) {
  const [isRendered, setIsRendered] = useState(false);

  // Keep the last non-null item so content stays visible during slide-out
  const lastItemRef = useRef<MenuItem | null>(null);
  if (item !== null) lastItemRef.current = item;
  const displayedItem = lastItemRef.current;

  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  const quantity = useCartStore(
    (s) => s.items.find((i) => i.item_id === (displayedItem?.id ?? ""))?.quantity ?? 0
  );
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItem = useCartStore((s) => s.updateItem);

  const slideIn = useCallback(() => {
    backdropOpacity.value = withTiming(1, { duration: 220 });
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [translateY, backdropOpacity]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const slideOut = useCallback(() => {
    backdropOpacity.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(
      SHEET_HEIGHT,
      { duration: 250, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
          runOnJS(handleClose)();
        }
      }
    );
  }, [translateY, backdropOpacity, handleClose]);

  const visible = item !== null;

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      requestAnimationFrame(slideIn);
    } else if (isRendered) {
      slideOut();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!isRendered || !displayedItem) return null;

  const handleAdd = () => {
    lightImpact();
    addItem(displayedItem.id, 1);
  };

  const handleDecrement = () => {
    lightImpact();
    if (quantity === 1) {
      removeItem(displayedItem.id);
    } else {
      updateItem(displayedItem.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    lightImpact();
    addItem(displayedItem.id, 1);
  };

  return (
    <Modal
      transparent
      visible={isRendered}
      onRequestClose={slideOut}
      animationType="none"
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <Animated.View
          style={[StyleSheet.absoluteFill, backdropStyle]}
          pointerEvents="none"
        >
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        </Animated.View>

        {/* Tap outside to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={slideOut} />

        {/* Sheet */}
        <Animated.View
          style={[sheetStyle, { height: SHEET_HEIGHT }]}
          className="bg-surface rounded-t-3xl overflow-hidden"
        >
          {/* Drag handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 rounded-full bg-border" />
          </View>

          {/* Close button */}
          <View className="px-6 pb-2 flex-row justify-end">
            <Pressable onPress={slideOut} className="p-2">
              <Ionicons name="close" size={22} color="#6B6B6B" />
            </Pressable>
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {/* Hero image */}
            <Image
              source={{ uri: displayedItem.image_url }}
              className="w-full h-64"
              resizeMode="cover"
            />

            {/* Name */}
            <Text className="font-serif-semibold text-3xl text-ink px-6 mt-4">
              {displayedItem.name}
            </Text>

            {/* Description */}
            <Text className="font-sans text-base text-muted px-6 mt-2 leading-relaxed">
              {displayedItem.description}
            </Text>

            {/* Stat row */}
            <View className="flex-row gap-2 px-6 mt-5 flex-wrap">
              {displayedItem.spice_level > 0 && (
                <View className="bg-bg rounded-full px-3 py-2 flex-row items-center gap-1">
                  {([1, 2, 3] as const).map((level) => (
                    <Ionicons
                      key={level}
                      name="flame"
                      size={14}
                      color={level <= displayedItem.spice_level ? "#D64545" : "#E8E2D5"}
                    />
                  ))}
                  <Text className="font-sans text-xs text-muted ml-1">Spice</Text>
                </View>
              )}
              <View className="bg-bg rounded-full px-3 py-2 flex-row items-center gap-1">
                <Ionicons name="flash-outline" size={14} color="#6B6B6B" />
                <Text className="font-sans text-xs text-muted">
                  {displayedItem.calories} cal
                </Text>
              </View>
            </View>

            {/* Dietary section */}
            {displayedItem.dietary.length > 0 && (
              <>
                <Text className="font-sans-medium text-xs text-muted uppercase tracking-wider px-6 mt-6 mb-2">
                  Dietary
                </Text>
                <View className="flex-row flex-wrap gap-2 px-6">
                  {displayedItem.dietary.map((tag) => (
                    <View key={tag} className="bg-sage/15 px-3 py-1 rounded-full">
                      <Text className="font-sans-medium text-sm text-sage">{tag}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Allergens section */}
            {displayedItem.allergens.length > 0 && (
              <>
                <Text className="font-sans-medium text-xs text-muted uppercase tracking-wider px-6 mt-6 mb-2">
                  Allergens
                </Text>
                <View className="flex-row flex-wrap gap-2 px-6">
                  {displayedItem.allergens.map((allergen) => (
                    <View key={allergen} className="bg-accent/10 px-3 py-1 rounded-full">
                      <Text className="font-sans-medium text-sm text-accent">
                        {allergen}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>

          {/* Sticky bottom CTA */}
          <View className="bg-surface border-t border-border px-6 py-4 flex-row items-center justify-between">
            <Text className="font-serif-semibold text-2xl text-ink">
              ${displayedItem.price.toFixed(2)}
            </Text>

            {quantity === 0 ? (
              <Pressable
                onPress={handleAdd}
                className="bg-ink rounded-full px-6 py-3"
              >
                <Text className="font-sans-semibold text-base text-surface">
                  Add to Cart
                </Text>
              </Pressable>
            ) : (
              <View className="flex-row items-center bg-ink rounded-full h-12 px-1">
                <Pressable
                  onPress={handleDecrement}
                  className="w-10 h-10 items-center justify-center"
                >
                  <Ionicons name="remove" size={18} color="#FFFFFF" />
                </Pressable>
                <Text
                  className="font-sans-semibold text-base text-surface text-center"
                  style={{ minWidth: 24 }}
                >
                  {quantity}
                </Text>
                <Pressable
                  onPress={handleIncrement}
                  className="w-10 h-10 items-center justify-center"
                >
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                </Pressable>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
