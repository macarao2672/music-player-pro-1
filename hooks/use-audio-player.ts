import { useEffect, useRef, useState } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useMusicContext } from "@/lib/music-context";

export function useAudioPlayerHook() {
  const { state, dispatch } = useMusicContext();
  const playerRef = useRef<ReturnType<typeof useAudioPlayer> | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Inicializar modo de áudio
  useEffect(() => {
    initializeAudioMode();
  }, []);

  const initializeAudioMode = async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });
    } catch (error) {
      console.error("Erro ao configurar modo de áudio:", error);
    }
  };

  const playMusic = async (musicUri: string) => {
    try {
      if (!playerRef.current) {
        playerRef.current = useAudioPlayer(musicUri);
      }

      // Se a URI mudou, criar novo player
      // Nota: useAudioPlayer cria um novo player automaticamente
      // então não precisamos verificar a source

      await playerRef.current.play();
      dispatch({ type: "SET_PLAYING", payload: true });
    } catch (error) {
      console.error("Erro ao reproduzir música:", error);
    }
  };

  const pauseMusic = async () => {
    try {
      if (playerRef.current) {
        await playerRef.current.pause();
        dispatch({ type: "SET_PLAYING", payload: false });
      }
    } catch (error) {
      console.error("Erro ao pausar música:", error);
    }
  };

  const resumeMusic = async () => {
    try {
      if (playerRef.current) {
        await playerRef.current.play();
        dispatch({ type: "SET_PLAYING", payload: true });
      }
    } catch (error) {
      console.error("Erro ao retomar música:", error);
    }
  };

  const seekTo = async (time: number) => {
    try {
      if (playerRef.current) {
        await playerRef.current.seekTo(time);
        dispatch({ type: "SET_CURRENT_TIME", payload: time });
      }
    } catch (error) {
      console.error("Erro ao buscar posição:", error);
    }
  };

  const setVolume = async (volume: number) => {
    try {
      if (playerRef.current) {
        playerRef.current.volume = Math.max(0, Math.min(1, volume));
      }
    } catch (error) {
      console.error("Erro ao ajustar volume:", error);
    }
  };

  const stopMusic = async () => {
    try {
      if (playerRef.current) {
        await playerRef.current.pause();
        await playerRef.current.seekTo(0);
        dispatch({ type: "SET_PLAYING", payload: false });
        dispatch({ type: "SET_CURRENT_TIME", payload: 0 });
      }
    } catch (error) {
      console.error("Erro ao parar música:", error);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.release();
      }
    };
  }, []);

  return {
    playMusic,
    pauseMusic,
    resumeMusic,
    seekTo,
    setVolume,
    stopMusic,
    duration,
    currentTime,
  };
}
