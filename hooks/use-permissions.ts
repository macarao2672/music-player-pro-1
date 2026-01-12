import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export interface PermissionStatus {
  notifications: boolean;
  storage: boolean;
  loading: boolean;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    notifications: false,
    storage: false,
    loading: true,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Verificar permissão de notificações
      const notificationStatus = await Notifications.getPermissionsAsync();
      const hasNotificationPermission = notificationStatus.granted;

      // Nota: No React Native/Expo, a permissão de armazenamento é gerenciada automaticamente
      // em Android 11+ (scoped storage), mas podemos verificar se temos acesso
      const hasStoragePermission = true; // Será verificado durante a leitura de arquivos

      setPermissions({
        notifications: hasNotificationPermission,
        storage: hasStoragePermission,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      setPermissions((prev) => ({ ...prev, loading: false }));
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const result = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });

      setPermissions((prev) => ({
        ...prev,
        notifications: result.granted,
      }));

      return result.granted;
    } catch (error) {
      console.error("Erro ao solicitar permissão de notificações:", error);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    // No Expo, as permissões de armazenamento são gerenciadas automaticamente
    // Esta função é um placeholder para futuras implementações
    if (Platform.OS === "android") {
      // Poderia usar expo-media-library ou expo-document-picker
      // para acessar mídia com permissões apropriadas
    }
    return true;
  };

  return {
    permissions,
    requestNotificationPermission,
    requestStoragePermission,
    checkPermissions,
  };
}
