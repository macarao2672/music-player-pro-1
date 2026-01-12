# Music Player Pro - Aplicativo Android

Um aplicativo moderno de player de música para Android com interface elegante, suporte a tema escuro/claro e funcionalidades nativas avançadas.

## Características Principais

### Interface de Usuário
- **Design Moderno**: Interface limpa e intuitiva com gradientes roxos
- **Tema Claro/Escuro**: Alterna automaticamente com as preferências do sistema
- **Busca em Tempo Real**: Filtre músicas enquanto digita
- **Abas Inteligentes**: Visualize Todas, Favoritas ou Recentes

### Funcionalidades de Reprodução
- **Reprodução de Áudio**: Suporte para múltiplos formatos (MP3, WAV, OGG, FLAC)
- **Controles Completos**: Play, Pause, Próxima, Anterior
- **Shuffle e Repeat**: Modos de reprodução personalizáveis
- **Favoritos**: Marque suas músicas favoritas para acesso rápido
- **Histórico**: Rastreie as músicas reproduzidas recentemente

### Funcionalidades Nativas Android
- **MediaScanner**: Descobre automaticamente todas as músicas no dispositivo
- **Notificações Persistentes**: Controle a reprodução pela barra de notificações
- **Reprodução em Segundo Plano**: Música continua tocando ao minimizar
- **Permissões Inteligentes**: Solicita apenas as permissões necessárias
- **Integração com Sistema**: Funciona com controles de mídia do dispositivo

### Persistência de Dados
- **Favoritos**: Salvos localmente e recuperados ao reiniciar
- **Histórico**: Últimas 50 músicas reproduzidas
- **Preferências**: Tema e configurações persistem
- **Estado de Reprodução**: Retoma de onde parou

## Estrutura do Projeto

```
music-player-pro/
├── app/                           # Código do aplicativo
│   ├── _layout.tsx               # Layout raiz com provedores
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Configuração de abas
│   │   └── index.tsx             # Tela principal
│   └── oauth/                    # Callbacks de autenticação
├── components/                    # Componentes reutilizáveis
│   ├── screen-container.tsx      # Container com SafeArea
│   ├── themed-view.tsx           # View com tema
│   └── ui/
│       └── icon-symbol.tsx       # Mapeamento de ícones
├── hooks/                         # Hooks customizados
│   ├── use-audio-player.ts       # Reprodução de áudio
│   ├── use-media-scanner.ts      # Escaneamento de mídia
│   ├── use-notifications.ts      # Notificações
│   ├── use-permissions.ts        # Gerenciamento de permissões
│   ├── use-colors.ts             # Cores do tema
│   └── use-color-scheme.ts       # Detecção de tema
├── lib/                           # Utilitários e contextos
│   ├── music-context.tsx         # Contexto global de estado
│   ├── theme-provider.tsx        # Provedor de tema
│   ├── utils.ts                  # Funções utilitárias
│   ├── trpc.ts                   # Cliente TRPC
│   └── _core/                    # Núcleo do framework
├── constants/                     # Constantes do aplicativo
│   └── theme.ts                  # Definições de cores
├── assets/                        # Recursos estáticos
│   └── images/                   # Ícones e logos
├── app.config.ts                 # Configuração do Expo
├── tailwind.config.js            # Configuração do Tailwind
├── theme.config.js               # Paleta de cores
├── package.json                  # Dependências
└── design.md                      # Especificação de design
```

## Tecnologias Utilizadas

- **React Native 0.81**: Framework para desenvolvimento mobile
- **Expo SDK 54**: Plataforma de desenvolvimento
- **TypeScript 5.9**: Tipagem estática
- **NativeWind 4**: Tailwind CSS para React Native
- **React Router 6**: Navegação
- **TanStack Query**: Gerenciamento de dados
- **expo-audio**: Reprodução de áudio
- **expo-media-library**: Acesso a mídia
- **expo-notifications**: Notificações
- **AsyncStorage**: Armazenamento local

## Instalação e Uso

### Desenvolvimento Local

1. **Instalar dependências**:
   ```bash
   pnpm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   pnpm dev
   ```

3. **Abrir em Expo Go**:
   - Instale o [Expo Go](https://expo.dev/go) em seu dispositivo
   - Escaneie o código QR exibido no terminal

### Compilar APK

Veja o [Guia de Instalação](./INSTALLATION_GUIDE.md) para instruções completas.

```bash
eas build --platform android --local --output app.apk
```

## Configuração

### Temas

Edite `theme.config.js` para personalizar as cores:

```javascript
const themeColors = {
  primary: { light: '#4a00e0', dark: '#8e2de2' },
  background: { light: '#ffffff', dark: '#121212' },
  // ... mais cores
};
```

### Permissões Android

As permissões são configuradas em `app.config.ts`:

```typescript
permissions: [
  "POST_NOTIFICATIONS",
  "READ_EXTERNAL_STORAGE",
  "READ_MEDIA_AUDIO",
  "FOREGROUND_SERVICE",
  "FOREGROUND_SERVICE_MEDIA_PLAYBACK",
  "WAKE_LOCK"
]
```

## Funcionalidades Nativas

Para detalhes sobre as funcionalidades nativas Android, consulte [ANDROID_NATIVE_FEATURES.md](./ANDROID_NATIVE_FEATURES.md).

### MediaScanner

O aplicativo automaticamente descobre músicas usando `expo-media-library`:

```typescript
const assets = await MediaLibrary.getAssetsAsync({
  mediaType: MediaLibrary.MediaType.audio,
});
```

### Notificações

Notificações persistentes com controles de reprodução:

```typescript
await Notifications.setNotificationChannelAsync("music-player", {
  name: "Music Player",
  importance: Notifications.AndroidImportance.MAX,
});
```

### Reprodução em Segundo Plano

Configuração de áudio para reprodução contínua:

```typescript
await setAudioModeAsync({
  playsInSilentMode: true,
});
```

## Gerenciamento de Estado

O aplicativo usa React Context para gerenciamento de estado global:

```typescript
const { state, dispatch } = useMusicContext();

// Ações disponíveis
dispatch({ type: "SET_MUSIC_LIST", payload: musicList });
dispatch({ type: "ADD_TO_FAVORITES", payload: musicId });
dispatch({ type: "SET_PLAYING", payload: true });
dispatch({ type: "TOGGLE_THEME" });
```

## Styling

O projeto usa **NativeWind** (Tailwind CSS para React Native):

```tsx
<View className="flex-1 items-center justify-center p-4 bg-background">
  <Text className="text-2xl font-bold text-foreground">
    Hello World
  </Text>
</View>
```

## Testes

Execute os testes com:

```bash
pnpm test
```

## Build e Deployment

### Verificar Erros

```bash
pnpm check
```

### Lint

```bash
pnpm lint
```

### Format

```bash
pnpm format
```

### Build para Produção

```bash
eas build --platform android --non-interactive
```

## Troubleshooting

### Erro: "Cannot find module 'expo-media-library'"

Instale a dependência:
```bash
pnpm add expo-media-library
```

### Erro: "Permission denied"

Verifique se as permissões foram concedidas no dispositivo.

### Aplicativo não encontra músicas

1. Coloque arquivos MP3 na pasta `/Music`
2. Toque em "Escanear" no aplicativo
3. Verifique se a permissão foi concedida

## Contribuindo

Para contribuir com melhorias:

1. Crie uma branch: `git checkout -b feature/sua-feature`
2. Commit suas mudanças: `git commit -m 'Add sua-feature'`
3. Push para a branch: `git push origin feature/sua-feature`
4. Abra um Pull Request

## Licença

Este projeto é fornecido como está para fins educacionais e pessoais.

## Suporte

Para suporte e dúvidas:

1. Consulte a [Documentação de Funcionalidades Nativas](./ANDROID_NATIVE_FEATURES.md)
2. Verifique o [Guia de Instalação](./INSTALLATION_GUIDE.md)
3. Revise o [Design](./design.md)

## Roadmap Futuro

- [ ] Sincronização com nuvem
- [ ] Reprodução de playlists
- [ ] Equalizer integrado
- [ ] Suporte a streaming
- [ ] Integração com Spotify
- [ ] Visualizador de áudio
- [ ] Suporte a lyrics
- [ ] Modo sleep timer

## Changelog

### v1.0.0 (Janeiro 2026)
- Lançamento inicial
- Interface completa do player
- Funcionalidades nativas Android
- Suporte a tema claro/escuro
- MediaScanner integrado
- Notificações persistentes
- Reprodução em segundo plano

---

**Desenvolvido com ❤️ usando Expo e React Native**

Para mais informações, visite [expo.dev](https://expo.dev) e [react-native.dev](https://react-native.dev).
