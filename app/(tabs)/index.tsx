import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useMusicContext } from "@/lib/music-context";
import { useMediaScanner } from "@/hooks/use-media-scanner";
import { usePermissions } from "@/hooks/use-permissions";
import { useNotifications } from "@/hooks/use-notifications";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Tab = "all" | "favorites" | "recent";

export default function HomeScreen() {
  const { state, dispatch } = useMusicContext();
  const { scanForMusic, loading: scanLoading } = useMediaScanner();
  const { permissions, requestNotificationPermission } = usePermissions();
  const { sendPlayingNotification } = useNotifications();
  const colors = useColors();

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchText, setSearchText] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Solicitar permissões ao iniciar
    requestNotificationPermission();
  }, []);

  const filteredMusic = state.musicList.filter((music) => {
    const matchesSearch =
      music.title.toLowerCase().includes(searchText.toLowerCase()) ||
      music.artist.toLowerCase().includes(searchText.toLowerCase());

    if (activeTab === "favorites") {
      return matchesSearch && state.favorites.includes(music.id);
    } else if (activeTab === "recent") {
      return matchesSearch && state.recentlyPlayed.includes(music.id);
    }

    return matchesSearch;
  });

  const handlePlayMusic = (index: number) => {
    const music = filteredMusic[index];
    dispatch({ type: "SET_CURRENT_TRACK", payload: state.musicList.indexOf(music) });
    dispatch({ type: "SET_PLAYING", payload: true });
    dispatch({ type: "ADD_TO_RECENTLY_PLAYED", payload: music.id });
    sendPlayingNotification(music.title, music.artist);
  };

  const handleToggleFavorite = (musicId: string) => {
    if (state.favorites.includes(musicId)) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: musicId });
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: musicId });
    }
  };

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const renderMusicItem = ({ item, index }: { item: any; index: number }) => {
    const isFavorite = state.favorites.includes(item.id);
    const isPlaying = state.currentTrackIndex === state.musicList.indexOf(item);

    return (
      <Pressable
        onPress={() => handlePlayMusic(index)}
        style={({ pressed }) => [
          {
            backgroundColor: isPlaying
              ? "rgba(74, 0, 224, 0.1)"
              : colors.surface,
            borderLeftWidth: isPlaying ? 4 : 0,
            borderLeftColor: isPlaying ? "#4a00e0" : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 15,
            marginBottom: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        {/* Album Art */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            backgroundColor: stringToColor(item.title),
            marginRight: 15,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <MaterialIcons name="music-note" size={24} color="white" />
        </View>

        {/* Music Info */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: 3,
            }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: colors.muted,
            }}
          >
            {item.artist}
          </Text>
        </View>

        {/* Duration */}
        <Text
          style={{
            fontSize: 14,
            color: colors.muted,
            marginRight: 15,
          }}
        >
          {Math.floor(item.duration / 60)}:{String(Math.floor(item.duration % 60)).padStart(2, "0")}
        </Text>

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={() => handleToggleFavorite(item.id)}
          style={{ padding: 8 }}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={20}
            color={isFavorite ? "#ff4757" : colors.muted}
          />
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons name="music-note" size={24} color="#4a00e0" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#4a00e0",
            }}
          >
            Music Player Pro
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => dispatch({ type: "TOGGLE_THEME" })}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(142, 45, 226, 0.1)",
            }}
          >
            <MaterialIcons
              name={state.theme === "light" ? "dark-mode" : "light-mode"}
              size={20}
              color="#4a00e0"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSettings(!showSettings)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(142, 45, 226, 0.1)",
            }}
          >
            <MaterialIcons name="settings" size={20} color="#4a00e0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background,
            borderRadius: 25,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <MaterialIcons name="search" size={18} color={colors.muted} />
          <TextInput
            placeholder="Buscar música..."
            placeholderTextColor={colors.muted}
            value={searchText}
            onChangeText={setSearchText}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 10,
              color: colors.foreground,
              fontSize: 14,
            }}
          />
        </View>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.surface,
          borderRadius: 10,
          padding: 5,
          marginHorizontal: 20,
          marginVertical: 15,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {(["all", "favorites", "recent"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor:
                activeTab === tab ? "#4a00e0" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: activeTab === tab ? "white" : colors.muted,
              }}
            >
              {tab === "all"
                ? "Todas"
                : tab === "favorites"
                ? "Favoritas"
                : "Recentes"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Music List */}
      {state.musicList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons name="music-note" size={64} color={colors.muted} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.foreground,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Nenhuma música encontrada
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.muted,
              marginTop: 8,
              textAlign: "center",
            }}
          >
            Toque em Escanear para descobrir músicas no seu dispositivo
          </Text>
          <TouchableOpacity
            onPress={scanForMusic}
            style={{
              marginTop: 20,
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: "#4a00e0",
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {scanLoading ? "Escaneando..." : "Escanear"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredMusic}
          renderItem={renderMusicItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          scrollEnabled={true}
        />
      )}
    </ScreenContainer>
  );
}
