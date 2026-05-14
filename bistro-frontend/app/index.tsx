import { useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from "react-native-reanimated";
import { lightImpact } from "../src/lib/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LandingScreen() {
  const router = useRouter();
  const scale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleExplore = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 12, stiffness: 400 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 400 });
    });
    lightImpact();
    router.replace("/menu");
  }, [router, scale]);

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1 }}
      className="bg-bg"
    >
      <View style={{ flex: 1 }} className="items-center justify-between px-6 py-8">

        {/* Top spacer */}
        <View className="h-2" />

        {/* Hero — staggered fade-in-down entrance */}
        <View style={{ flex: 1 }} className="items-center justify-center">
          {/* Bug 5: mascot reduced to w-52/h-52 to leave room for the new paragraph */}
          <Animated.View entering={FadeInDown.duration(600).delay(0)}>
            <Image
              source={require("../assets/images/woki.png")}
              style={{ width: 208, height: 208, marginBottom: 24 }}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(100)}>
            <Text className="font-serif-semibold text-5xl text-ink text-center mb-3">
              Wokwise
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <Text className="font-sans text-base text-muted text-center px-8">
              Just ask. We'll wok it out.
            </Text>
          </Animated.View>

          {/* Bug 5: extended description paragraph */}
          <Animated.View entering={FadeInDown.duration(600).delay(300)}>
            <Text className="font-sans text-sm text-muted text-center px-8 mt-4 leading-relaxed">
              From cravings to checkout, Wokwise helps you find the right dish faster.
            </Text>
          </Animated.View>
        </View>

        {/* CTA + footer — slides up after hero */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(450)}
          className="w-full items-center"
        >
          <AnimatedPressable
            onPress={handleExplore}
            style={[buttonStyle, { width: "100%" }]}
            className="bg-ink rounded-full py-4 items-center mb-4"
          >
            <Text className="font-sans-semibold text-base text-surface">
              Explore Menu
            </Text>
          </AnimatedPressable>

          <Text className="font-sans text-xs text-muted">
            Powered by AI · Asian fusion delivered
          </Text>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}
