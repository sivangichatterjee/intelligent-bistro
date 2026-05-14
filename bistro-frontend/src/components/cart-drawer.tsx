import { useState, useEffect, useCallback, useRef } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
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
import Swipeable from "react-native-gesture-handler/Swipeable";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../store/cart-store";
import { useUIStore } from "../store/ui-store";
import { QuantityStepper } from "./quantity-stepper";
import { EmptyState } from "./empty-state";
import type { MenuItem } from "../types";
import { mediumImpact, lightImpact, successNotification } from "../lib/haptics";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

// Bug 3: matched duration for sheet + backdrop so they finish together cleanly
const SLIDE_DURATION = 280;
const SLIDE_EASING = Easing.bezier(0.16, 1, 0.3, 1);

interface CartRowProps {
  item_id: string;
  quantity: number;
  menu: MenuItem[];
}

function CartRow({ item_id, quantity, menu }: CartRowProps) {
  const { removeItem, addItem, updateItem } = useCartStore.getState();
  const menuItem = menu.find((m) => m.id === item_id);

  if (!menuItem) return null;

  const renderRightActions = () => (
    <Pressable
      onPress={() => {
        mediumImpact();
        removeItem(item_id);
      }}
      className="bg-accent justify-center items-center w-20 rounded-xl ml-2"
    >
      <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View className="flex-row items-center bg-surface py-3 px-4 gap-x-3">
        <Image
          source={{ uri: menuItem.image_url }}
          className="w-14 h-14 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text
            className="font-sans-semibold text-sm text-ink"
            numberOfLines={1}
          >
            {menuItem.name}
          </Text>
          <Text className="font-sans text-sm text-muted mt-0.5">
            ${(menuItem.price * quantity).toFixed(2)}
          </Text>
        </View>
        <QuantityStepper
          quantity={quantity}
          onIncrement={() => addItem(item_id, 1)}
          onDecrement={() => {
            if (quantity <= 1) {
              removeItem(item_id);
            } else {
              updateItem(item_id, quantity - 1);
            }
          }}
        />
      </View>
    </Swipeable>
  );
}

interface Props {
  menu: MenuItem[];
}

export function CartDrawer({ menu }: Props) {
  const [isRendered, setIsRendered] = useState(false);
  const visible = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const openChat = useUIStore((s) => s.openChat);
  const openOrderConfirmation = useUIStore((s) => s.openOrderConfirmation);
  const cartItems = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice(menu));

  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  // Intent flags: set before slideOut() to signal which modal should open after
  // the cart modal is fully unmounted. Refs avoid re-renders and are always
  // readable with the latest value inside runOnJS callbacks on the JS thread.
  const shouldOpenChatOnClose = useRef(false);
  const shouldOpenConfirmationOnClose = useRef(false);

  // Called via runOnJS at the end of the slide-out animation. Checks both flags
  // and opens the appropriate modal. Only one flag should be true at a time.
  const openModalIfNeeded = useCallback(() => {
    if (shouldOpenChatOnClose.current) {
      shouldOpenChatOnClose.current = false;
      openChat();
    } else if (shouldOpenConfirmationOnClose.current) {
      shouldOpenConfirmationOnClose.current = false;
      openOrderConfirmation();
    }
  }, [openChat, openOrderConfirmation]);

  const slideIn = useCallback(() => {
    backdropOpacity.value = withTiming(1, {
      duration: SLIDE_DURATION,
      easing: SLIDE_EASING,
    });
    translateY.value = withTiming(0, {
      duration: SLIDE_DURATION,
      easing: SLIDE_EASING,
    });
  }, [translateY, backdropOpacity]);

  const slideOut = useCallback(() => {
    backdropOpacity.value = withTiming(0, {
      duration: SLIDE_DURATION,
      easing: SLIDE_EASING,
    });
    translateY.value = withTiming(
      SHEET_HEIGHT,
      { duration: SLIDE_DURATION, easing: SLIDE_EASING },
      (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
          runOnJS(closeCart)();
          // Runs on JS thread after modal fully unmounts — safe to open another Modal
          runOnJS(openModalIfNeeded)();
        }
      }
    );
  }, [translateY, backdropOpacity, closeCart, openModalIfNeeded]);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      requestAnimationFrame(slideIn);
    } else if (isRendered) {
      slideOut();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!isRendered) return null;

  return (
    <Modal
      transparent
      visible={isRendered}
      onRequestClose={slideOut}
      animationType="none"
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop: fades in on open, fades out immediately on dismiss */}
        <Animated.View
          style={[StyleSheet.absoluteFill, backdropStyle]}
          pointerEvents="none"
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Tap outside to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={slideOut} />

        {/* Sheet */}
        <Animated.View
          style={[animatedSheetStyle, { height: SHEET_HEIGHT }]}
          className="bg-surface rounded-t-3xl overflow-hidden"
        >
          {/* Drag handle */}
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 rounded-full bg-border" />
          </View>

          {/* Header */}
          <View className="px-6 pb-4 border-b border-border flex-row items-center justify-between">
            <Text className="font-serif-semibold text-xl text-ink">
              Your Order
            </Text>
            <Pressable onPress={slideOut} className="p-2">
              <Ionicons name="close" size={22} color="#6B6B6B" />
            </Pressable>
          </View>

          {/* Items */}
          {cartItems.length === 0 ? (
            <EmptyState
              onAskWoki={() => {
                lightImpact();
                shouldOpenChatOnClose.current = true;
                slideOut();
              }}
            />
          ) : (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.item_id}
                renderItem={({ item }) => (
                  <CartRow
                    item_id={item.item_id}
                    quantity={item.quantity}
                    menu={menu}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-border mx-4" />
                )}
                style={{ flex: 1 }}
              />

              {/* Total + Checkout */}
              <View className="px-6 pt-4 pb-8 border-t border-border">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="font-serif-semibold text-lg text-ink">
                    Total
                  </Text>
                  <Text className="font-serif-semibold text-lg text-ink">
                    ${totalPrice.toFixed(2)}
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    successNotification();
                    shouldOpenConfirmationOnClose.current = true;
                    slideOut();
                  }}
                  className="bg-ink rounded-full py-4 items-center"
                >
                  <Text className="font-sans-semibold text-base text-surface">
                    Checkout
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
