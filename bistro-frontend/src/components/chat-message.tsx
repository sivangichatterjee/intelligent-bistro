import { View, Text } from "react-native";
import type { ChatMessage as ChatMessageType, MenuItem } from "../types";
import { CartActionPill } from "./cart-action-pill";
import { SuggestionCard } from "./suggestion-card";

interface Props {
  message: ChatMessageType;
  menu: MenuItem[];
}

export function ChatMessage({ message, menu }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <View className="self-end mb-3 max-w-[80%]">
        <View className="bg-accent rounded-2xl rounded-tr-sm px-4 py-3">
          <Text className="font-sans text-sm text-surface leading-5">
            {message.text}
          </Text>
        </View>
      </View>
    );
  }

  const hasSuggestions = message.suggestions && message.suggestions.length > 0;

  return (
    <View className="self-start mb-3" style={{ width: hasSuggestions ? "92%" : undefined, maxWidth: hasSuggestions ? undefined : "80%" }}>
      <View
        style={{ alignSelf: "flex-start", maxWidth: "100%" }}
        className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3"
      >
        <Text
          className={
            message.isError
              ? "font-sans text-sm text-muted leading-5"
              : "font-sans text-sm text-ink leading-5"
          }
        >
          {message.text}
        </Text>
      </View>

      {message.actions && message.actions.length > 0 && (
        <View className="flex-row flex-wrap gap-1 mt-1">
          {message.actions
            .filter((a) => a.type !== "clear" || a.item_id === "")
            .map((action, index) => (
              <CartActionPill
                key={`${action.type}-${action.item_id}-${index}`}
                action={action}
                menu={menu}
              />
            ))}
        </View>
      )}

      {hasSuggestions && (
        <View style={{ marginTop: 8 }}>
          {message.suggestions!.map((itemId, index) => {
            const menuItem = menu.find((m) => m.id === itemId);
            if (!menuItem) return null;
            return (
              <SuggestionCard key={itemId} item={menuItem} index={index} />
            );
          })}
        </View>
      )}
    </View>
  );
}
