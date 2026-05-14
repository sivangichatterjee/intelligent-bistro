import { useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import type { MenuCategory } from "../types";
import { selectionFeedback } from "../lib/haptics";

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  appetizers: "Appetizers",
  bowls: "Bowls",
  dumplings: "Dumplings",
  noodles: "Noodles",
  rice: "Rice",
  main_course: "Main Course",
  sides: "Sides",
  drinks: "Drinks",
};

interface Props {
  categories: readonly MenuCategory[];
  activeCategory: MenuCategory;
  onPress: (category: MenuCategory) => void;
}

export function CategoryTabs({ categories, activeCategory, onPress }: Props) {
  const listRef = useRef<FlatList<MenuCategory>>(null);

  const handlePress = (category: MenuCategory, index: number) => {
    selectionFeedback();
    onPress(category);
    listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  };

  return (
    <View className="border-b border-border">
      <FlatList
        ref={listRef}
        data={categories as MenuCategory[]}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
        onScrollToIndexFailed={() => {}}
        renderItem={({ item, index }) => {
          const isActive = item === activeCategory;
          return (
            <Pressable
              onPress={() => handlePress(item, index)}
              className={
                isActive
                  ? "px-4 py-2 rounded-full bg-accent"
                  : "px-4 py-2 rounded-full border border-border"
              }
            >
              <Text
                className={
                  isActive
                    ? "font-sans-medium text-sm text-surface"
                    : "font-sans-medium text-sm text-ink"
                }
              >
                {CATEGORY_LABELS[item]}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
