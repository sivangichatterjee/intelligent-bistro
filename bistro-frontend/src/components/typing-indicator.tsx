import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const DOT_DELAY_MS = 150;

function Dot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.8, { duration: 400 })
        ),
        -1,
        false
      )
    );
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="w-2 h-2 rounded-full bg-muted"
    />
  );
}

export function TypingIndicator() {
  return (
    <View className="self-start bg-surface border border-border rounded-2xl px-4 py-3 mb-3 flex-row items-center gap-x-1.5">
      <Dot delay={0} />
      <Dot delay={DOT_DELAY_MS} />
      <Dot delay={DOT_DELAY_MS * 2} />
    </View>
  );
}
