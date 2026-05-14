import { Pressable, Text, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useUIStore } from "../store/ui-store";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChatFab() {
  const openChat = useUIStore((s) => s.openChat);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.96, { damping: 10, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 300 });
    });
    openChat();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 10,
          elevation: 10,
        },
      ]}
      className="rounded-full overflow-hidden shadow-lg"
    >
      <LinearGradient
        colors={["#D64545", "#B8332E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 56,
          paddingLeft: 6,
          paddingRight: 12,
          paddingVertical: 6,
          gap: 8,
        }}
      >
        {/* Mascot avatar */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../../assets/images/woki.png")}
            style={{ width: 44, height: 44 }}
            resizeMode="contain"
          />
        </View>

        {/* Label */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#FFFFFF",
          }}
        >
          Ask Woki
        </Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}
