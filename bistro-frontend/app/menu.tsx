import { useState, useEffect, useCallback } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMenu } from "../src/lib/api";
import type { MenuItem, MenuCategory } from "../src/types";
import { MenuHeader } from "../src/components/menu-header";
import { CategoryTabs } from "../src/components/category-tabs";
import { MenuItemCard } from "../src/components/menu-item-card";
import { CartFab } from "../src/components/cart-fab";
import { ChatFab } from "../src/components/chat-fab";
import { CartDrawer } from "../src/components/cart-drawer";
import { ChatSheet } from "../src/components/chat-sheet";
import { ItemDetailSheet } from "../src/components/item-detail-sheet";
import { OrderConfirmation } from "../src/components/order-confirmation";
import { useCartStore } from "../src/store/cart-store";

const CATEGORIES: MenuCategory[] = [
  "appetizers",
  "bowls",
  "dumplings",
  "noodles",
  "rice",
  "main_course",
  "sides",
  "drinks",
];

export default function MenuScreen() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("appetizers");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const totalCount = useCartStore((s) => s.totalCount());

  const handleItemPress = useCallback((item: MenuItem) => {
    setSelectedItem(item);
  }, []);

  const handleDetailClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    fetchMenu()
      .then(setMenu)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-bg">
        <ActivityIndicator color="#D64545" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }} className="items-center justify-center bg-bg px-8">
        <Text className="font-sans-semibold text-base text-ink text-center">
          Could not reach the kitchen
        </Text>
        <Text className="font-sans text-sm text-muted text-center mt-2">
          Check that the backend is running and try again.
        </Text>
      </View>
    );
  }

  const filteredMenu = menu.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }} className="bg-bg">
      <MenuHeader />
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={selectedCategory}
        onPress={setSelectedCategory}
      />

      {/*
        Explicit flex:1 via style ensures the container fills remaining space
        regardless of NativeWind className processing. FABs use position:absolute
        within this container as their stacking context.
      */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} onPress={() => handleItemPress(item)} />
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        <CartFab count={totalCount} />
        <ChatFab />
      </View>

      <CartDrawer menu={menu} />
      <ChatSheet menu={menu} />
      <ItemDetailSheet item={selectedItem} onClose={handleDetailClose} />
      <OrderConfirmation />
    </SafeAreaView>
  );
}
