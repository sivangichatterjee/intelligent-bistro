import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { lightImpact } from "../lib/haptics";

export function MenuHeader() {
  const router = useRouter();

  const handleBack = () => {
    lightImpact();
    router.replace("/");
  };

  return (
    <View style={{ position: "relative" }} className="pt-6 pb-4 px-6 items-center">
      {/* Bug 4: subtle back-to-landing affordance */}
      <Pressable
        onPress={handleBack}
        style={{ position: "absolute", left: 16, top: 24 }}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={24} color="#6B6B6B" />
      </Pressable>

      <Text className="font-serif-semibold text-3xl text-ink tracking-tight">
        Wokwise
      </Text>
      <Text className="font-sans text-sm text-muted mt-1">
        Just ask. We'll wok it out.
      </Text>
    </View>
  );
}
