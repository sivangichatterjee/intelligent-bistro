import * as Haptics from "expo-haptics";

export function lightImpact(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export function mediumImpact(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export function selectionFeedback(): void {
  Haptics.selectionAsync();
}

export function successNotification(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
