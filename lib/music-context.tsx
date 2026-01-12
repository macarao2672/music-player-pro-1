import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Music {
  id: string;
  title: string;
  artist: string;
  duration: number;
  uri: string;
  albumArt?: string;
}

export interface MusicState {
  musicList: Music[];
  favorites: string[];
  recentlyPlayed: string[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  currentTime: number;
  theme: "light" | "dark";
}

type MusicAction =
  | { type: "SET_MUSIC_LIST"; payload: Music[] }
  | { type: "ADD_TO_FAVORITES"; payload: string }
  | { type: "REMOVE_FROM_FAVORITES"; payload: string }
  | { type: "SET_CURRENT_TRACK"; payload: number }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "CYCLE_REPEAT" }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "TOGGLE_THEME" }
  | { type: "ADD_TO_RECENTLY_PLAYED"; payload: string }
  | { type: "LOAD_STATE"; payload: MusicState };

const initialState: MusicState = {
  musicList: [],
  favorites: [],
  recentlyPlayed: [],
  currentTrackIndex: null,
  isPlaying: false,
  shuffle: false,
  repeat: "off",
  currentTime: 0,
  theme: "light",
};

function musicReducer(state: MusicState, action: MusicAction): MusicState {
  switch (action.type) {
    case "SET_MUSIC_LIST":
      return { ...state, musicList: action.payload };
    case "ADD_TO_FAVORITES":
      if (!state.favorites.includes(action.payload)) {
        return { ...state, favorites: [...state.favorites, action.payload] };
      }
      return state;
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    case "SET_CURRENT_TRACK":
      return { ...state, currentTrackIndex: action.payload, currentTime: 0 };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };
    case "CYCLE_REPEAT":
      const repeatCycle: ("off" | "one" | "all")[] = ["off", "one", "all"];
      const currentIndex = repeatCycle.indexOf(state.repeat);
      const nextRepeat = repeatCycle[(currentIndex + 1) % repeatCycle.length];
      return { ...state, repeat: nextRepeat };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "ADD_TO_RECENTLY_PLAYED":
      const filtered = state.recentlyPlayed.filter((id) => id !== action.payload);
      return {
        ...state,
        recentlyPlayed: [action.payload, ...filtered].slice(0, 50),
      };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

interface MusicContextType {
  state: MusicState;
  dispatch: React.Dispatch<MusicAction>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  // Carregar estado persistido ao iniciar
  useEffect(() => {
    loadPersistedState();
  }, []);

  // Persistir estado quando mudar
  useEffect(() => {
    saveState(state);
  }, [state]);

  const loadPersistedState = async () => {
    try {
      const saved = await AsyncStorage.getItem("musicPlayerState");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_STATE", payload: parsed });
      }
    } catch (error) {
      console.error("Erro ao carregar estado:", error);
    }
  };

  const saveState = async (currentState: MusicState) => {
    try {
      await AsyncStorage.setItem("musicPlayerState", JSON.stringify(currentState));
    } catch (error) {
      console.error("Erro ao salvar estado:", error);
    }
  };

  return (
    <MusicContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext deve ser usado dentro de MusicProvider");
  }
  return context;
}
