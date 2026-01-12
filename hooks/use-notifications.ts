import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { NotificationBehavior } from "expo-notifications";

// Configurar handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    if (Platform.OS === "android") {
      // Criar canal de notificação para Android
      await Notifications.setNotificationChannelAsync("music-player", {
        name: "Music Player",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#4a00e0",
      });
    }
  };

  const sendPlayingNotification = async (title: string, artist: string) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reproduzindo",
          body: `${title} - ${artist}`,
          data: { type: "music_playing" },
        },
        trigger: null, // Enviar imediatamente
      });
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
    }
  };

  const sendPauseNotification = async () => {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error("Erro ao descartar notificação:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const result = await Notifications.requestPermissionsAsync();
      return result.granted;
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
      return false;
    }
  };

  return {
    sendPlayingNotification,
    sendPauseNotification,
    requestPermission,
  };
}
