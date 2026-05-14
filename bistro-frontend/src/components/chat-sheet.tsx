import { useState, useRef, useEffect, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedKeyboard,
  useAnimatedReaction,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useChatStore } from "../store/chat-store";
import { useCartStore } from "../store/cart-store";
import { useUIStore } from "../store/ui-store";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";
import type { MenuItem } from "../types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.75;

const SUGGESTION_CHIPS = [
  "Something spicy",
  "Vegetarian options",
  "Surprise me",
] as const;

interface Props {
  menu: MenuItem[];
}

export function ChatSheet({ menu }: Props) {
  const [input, setInput] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  const listRef = useRef<FlatList>(null);
  const { messages, isLoading, sendMessage, reset } = useChatStore();
  const cartItems = useCartStore((s) => s.items);
  const visible = useUIStore((s) => s.isChatOpen);
  const closeChat = useUIStore((s) => s.closeChat);

  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  // keyboard.height is a UI-thread shared value — zero bridge overhead.
  // We use it only to drive the in-sheet spacer and auto-scroll.
  const keyboard = useAnimatedKeyboard();

  // ─── Slide animations ────────────────────────────────────────────────────────

  const slideIn = useCallback(() => {
    backdropOpacity.value = withTiming(1, { duration: 220 });
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [translateY, backdropOpacity]);

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
          runOnJS(closeChat)();
        }
      }
    );
  }, [translateY, backdropOpacity, closeChat]);

  useEffect(() => {
    if (visible) {
      reset();
      setIsRendered(true);
      requestAnimationFrame(slideIn);
    } else if (isRendered) {
      slideOut();
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Auto-scroll ─────────────────────────────────────────────────────────────

  // Scroll to bottom when a new message arrives
  useEffect(() => {
    if (messages.length === 0) return;
    const t = setTimeout(
      () => listRef.current?.scrollToEnd({ animated: true }),
      80
    );
    return () => clearTimeout(t);
  }, [messages.length]);

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  // Scroll to bottom as the keyboard rises so the latest message stays visible
  useAnimatedReaction(
    () => keyboard.height.value,
    (current, previous) => {
      if (current > (previous ?? 0)) {
        runOnJS(scrollToBottom)();
      }
    }
  );

  // ─── Animated styles ─────────────────────────────────────────────────────────

  // Sheet slide only — translateY is NEVER subtracted by keyboard height.
  // Moving the whole sheet up by keyboard height causes the top of the sheet
  // (drag handle + header) to slide off-screen on typical iPhones.
  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // Spacer rendered *below* the input bar, inside the sheet.
  // As keyboard rises, this spacer grows → FlatList (flex:1 above it) shrinks →
  // input bar floats up to sit exactly above the keyboard.
  // The sheet itself never moves; the header stays visible at all times.
  const keyboardSpacerStyle = useAnimatedStyle(() => ({
    height: keyboard.height.value,
  }));

  // ─── Send handler ─────────────────────────────────────────────────────────────

  const handleSend = useCallback(
    (chipText?: string) => {
      const text = (chipText ?? input).trim();
      if (!text || isLoading) return;
      if (!chipText) setInput("");
      sendMessage(text, cartItems);
    },
    [input, isLoading, cartItems, sendMessage]
  );

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
        {/* Backdrop blur — pointerEvents="none" so taps pass through to the Pressable below */}
        <Animated.View
          style={[StyleSheet.absoluteFill, backdropStyle]}
          pointerEvents="none"
        >
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        </Animated.View>

        {/* Full-screen tap target: tapping outside the sheet dismisses it */}
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            Keyboard.dismiss();
            slideOut();
          }}
        />

        {/*
          Sheet — translateY handles open/close slide only.
          Height is fixed at SHEET_HEIGHT so the top (drag handle + header)
          always sits at screenHeight - SHEET_HEIGHT, well below the status bar.
        */}
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
              Ask Woki
            </Text>
            <View className="flex-row items-center">
              <Pressable onPress={() => reset()} className="p-2">
                <Ionicons name="refresh-outline" size={20} color="#6B6B6B" />
              </Pressable>
              <Pressable onPress={slideOut} className="p-2">
                <Ionicons name="close" size={22} color="#6B6B6B" />
              </Pressable>
            </View>
          </View>

          {/*
            Content area: FlatList + input bar + keyboard spacer.
            flex:1 fills whatever height remains below the header.
            Layout (flex column):
              FlatList     → flex:1, shrinks as spacer grows
              Input bar    → fixed height
              Spacer       → keyboard.height.value, grows as keyboard rises
            Net effect: input bar floats up by exactly keyboard height.
          */}
          <View style={{ flex: 1 }}>
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChatMessage message={item} menu={menu} />
              )}
              style={{ flex: 1 }}
              contentContainerStyle={{
                padding: 16,
                paddingBottom: 8,
                flexGrow: 1,
              }}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() =>
                listRef.current?.scrollToEnd({ animated: true })
              }
              ListEmptyComponent={
                <View
                  style={{ flex: 1 }}
                  className="items-center justify-center px-6"
                >
                  {/* Woki mascot */}
                  <View className="w-20 h-20 rounded-full bg-bg items-center justify-center overflow-hidden mb-4">
                    <Image
                      source={require("../../assets/images/woki.png")}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="font-serif-semibold text-2xl text-ink mb-2">
                    Hi! I'm Woki.
                  </Text>
                  <Text className="font-sans text-base text-muted text-center mb-6">
                    What can I help you order today?
                  </Text>
                  <View className="flex-row flex-wrap justify-center gap-2">
                    {SUGGESTION_CHIPS.map((chip) => (
                      <Pressable
                        key={chip}
                        onPress={() => handleSend(chip)}
                        className="border border-border bg-surface rounded-full px-4 py-2"
                      >
                        <Text className="font-sans text-sm text-ink">
                          {chip}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              }
              ListFooterComponent={isLoading ? <TypingIndicator /> : null}
            />

            {/* Input bar */}
            <View className="flex-row items-center px-4 py-3 border-t border-border gap-x-3">
              <TextInput
                className="flex-1 bg-bg rounded-full px-4 py-3 font-sans text-sm text-ink border border-border"
                placeholder="What would you like to order?"
                placeholderTextColor="#6B6B6B"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
                multiline={false}
                editable={!isLoading}
              />
              <Pressable
                onPress={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={
                  input.trim() && !isLoading
                    ? "w-10 h-10 rounded-full bg-accent items-center justify-center"
                    : "w-10 h-10 rounded-full bg-border items-center justify-center"
                }
              >
                <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Keyboard spacer — grows as keyboard rises, shrinks as it dismisses.
                This pushes the input bar up from within the sheet without moving
                the sheet itself or the header. */}
            <Animated.View style={keyboardSpacerStyle} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
