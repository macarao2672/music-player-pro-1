import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { useMusicContext } from "@/lib/music-context";
import type { Music } from "@/lib/music-context";

export function useMediaScanner() {
  const { dispatch } = useMusicContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    scanForMusic();
  }, []);

  const scanForMusic = async () => {
    try {
      setLoading(true);
      setError(null);

      // Solicitar permissão de acesso à mídia
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        setError("Permissão de acesso à mídia não concedida");
        setLoading(false);
        return;
      }

      // Buscar todos os áudios do dispositivo
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
      });

      const musicList: Music[] = [];

      // Iterar sobre os assets e extrair as músicas
      for (const asset of assets.assets) {
        const music: Music = {
          id: asset.id,
          title: asset.filename || "Desconhecido",
          artist: "Desconhecido",
          duration: asset.duration || 0,
          uri: asset.uri,
          albumArt: undefined, // Será gerado dinamicamente
        };

        musicList.push(music);
      }

      // Atualizar o contexto com a lista de músicas
      dispatch({ type: "SET_MUSIC_LIST", payload: musicList });

      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao escanear mídia:", err);
      setLoading(false);
    }
  };

  const requestMediaPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === "granted";
    } catch (err) {
      console.error("Erro ao solicitar permissão de mídia:", err);
      return false;
    }
  };

  return {
    scanForMusic,
    requestMediaPermission,
    loading,
    error,
  };
}
