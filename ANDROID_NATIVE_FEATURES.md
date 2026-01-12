# Funcionalidades Nativas Android - Music Player Pro

Este documento descreve as funcionalidades nativas Android integradas no aplicativo Music Player Pro.

## 1. Permissões Solicitadas

O aplicativo solicita as seguintes permissões no arquivo `app.config.ts`:

### Permissões Críticas

- **POST_NOTIFICATIONS**: Permite enviar notificações ao usuário sobre o status da reprodução
- **READ_EXTERNAL_STORAGE**: Permite ler arquivos de música do armazenamento externo (Android 12 e anteriores)
- **READ_MEDIA_AUDIO**: Permite ler arquivos de áudio especificamente (Android 13+)
- **FOREGROUND_SERVICE**: Permite executar serviço em primeiro plano
- **FOREGROUND_SERVICE_MEDIA_PLAYBACK**: Permite que o serviço de reprodução execute em primeiro plano
- **WAKE_LOCK**: Permite manter o dispositivo acordado durante a reprodução

## 2. MediaScanner

O hook `useMediaScanner` utiliza a API `expo-media-library` para:

- Solicitar permissão de acesso à mídia
- Escanear todos os arquivos de áudio no dispositivo
- Extrair informações de cada arquivo (título, duração, URI)
- Atualizar a lista de músicas no contexto do aplicativo

**Localização**: `hooks/use-media-scanner.ts`

### Como Funciona

1. Ao iniciar o aplicativo, o hook solicita permissão de acesso à mídia
2. Após concessão, escaneia todos os arquivos de áudio usando `MediaLibrary.getAssetsAsync()`
3. Para cada arquivo encontrado, extrai informações e cria um objeto `Music`
4. A lista é armazenada no contexto global e persistida no AsyncStorage

## 3. Notificações

O hook `useNotifications` gerencia notificações nativas:

### Funcionalidades

- **Canal de Notificação**: Cria um canal "Music Player" com importância máxima
- **Notificação de Reprodução**: Exibe notificação quando uma música começa a tocar
- **Controles na Notificação**: Permite pausar/tocar/pular via notificação
- **Vibração e Som**: Configurado para vibrar e emitir som

**Localização**: `hooks/use-notifications.ts`

### Configuração do Canal (Android)

```typescript
await Notifications.setNotificationChannelAsync("music-player", {
  name: "Music Player",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#4a00e0",
});
```

## 4. Reprodução em Segundo Plano

O aplicativo suporta reprodução de música mesmo quando minimizado:

### Configuração de Áudio

```typescript
await setAudioModeAsync({
  playsInSilentMode: true,
});
```

### Características

- Música continua tocando ao minimizar o aplicativo
- Notificação persistente com controles de reprodução
- Suporte a controles de mídia do sistema (botões de fone de ouvido)

**Localização**: `hooks/use-audio-player.ts`

## 5. Acesso ao Armazenamento

O aplicativo acessa o armazenamento do dispositivo através de:

### APIs Utilizadas

- **expo-media-library**: Para acessar mídia do dispositivo
- **AsyncStorage**: Para persistir dados localmente (favoritos, histórico)

### Fluxo de Permissões

1. Solicita permissão de acesso à mídia ao iniciar
2. Se concedida, escaneia o armazenamento
3. Se negada, exibe mensagem de erro e botão para tentar novamente

## 6. Compilação e Geração do APK

### Pré-requisitos

- Node.js 18+ instalado
- pnpm ou npm instalado
- Android SDK (para testes locais)
- Expo CLI instalado globalmente

### Passos para Gerar APK

1. **Instalar dependências**:
   ```bash
   cd music-player-pro
   pnpm install
   ```

2. **Verificar configuração**:
   ```bash
   pnpm check
   ```

3. **Construir para Android**:
   ```bash
   eas build --platform android --local
   ```

   Ou usando Expo Go para testes rápidos:
   ```bash
   pnpm android
   ```

4. **Gerar APK**:
   ```bash
   eas build --platform android --local --output app.apk
   ```

### Configurações de Build

O arquivo `app.config.ts` contém as configurações necessárias:

- **minSdkVersion**: 24 (Android 7.0)
- **targetSdkVersion**: 34 (Android 14)
- **compileSdkVersion**: 34
- **Arquiteturas**: armeabi-v7a, arm64-v8a

## 7. Estrutura de Arquivos

```
music-player-pro/
├── app/
│   ├── _layout.tsx              # Layout raiz com MusicProvider
│   └── (tabs)/
│       ├── _layout.tsx          # Layout de abas
│       └── index.tsx            # Tela home com lista de músicas
├── hooks/
│   ├── use-media-scanner.ts     # MediaScanner
│   ├── use-notifications.ts     # Notificações
│   ├── use-audio-player.ts      # Reprodução de áudio
│   └── use-permissions.ts       # Gerenciamento de permissões
├── lib/
│   └── music-context.tsx        # Contexto global de estado
├── app.config.ts                # Configuração do Expo
└── android-native-config.json   # Referência de configurações Android
```

## 8. Testes

### Testar MediaScanner

1. Coloque alguns arquivos MP3 na pasta `/Music` do dispositivo
2. Abra o aplicativo
3. Toque em "Escanear"
4. Verifique se as músicas aparecem na lista

### Testar Notificações

1. Reproduza uma música
2. Minimize o aplicativo
3. Verifique se a notificação aparece na barra de status
4. Toque nos controles da notificação para pausar/tocar

### Testar Reprodução em Segundo Plano

1. Reproduza uma música
2. Minimize o aplicativo
3. Verifique se a música continua tocando
4. Use os controles de mídia do sistema para controlar

## 9. Troubleshooting

### Permissões não são solicitadas

- Verifique se o `app.config.ts` contém as permissões corretas
- Limpe o cache e reinstale o aplicativo

### MediaScanner não encontra músicas

- Verifique se há arquivos de áudio no dispositivo
- Confirme que a permissão foi concedida
- Tente usar o aplicativo "Arquivos" para navegar até `/Music`

### Notificações não aparecem

- Verifique se a permissão POST_NOTIFICATIONS foi concedida
- Confirme que o canal de notificação foi criado
- Verifique as configurações de notificação do dispositivo

### Reprodução para quando minimiza

- Verifique se o modo de áudio foi configurado corretamente
- Confirme que a permissão FOREGROUND_SERVICE foi concedida
- Verifique se o dispositivo não tem otimizações de bateria muito agressivas

## 10. Recursos Adicionais

- [Expo Media Library Docs](https://docs.expo.dev/modules/expo-media-library/)
- [Expo Audio Docs](https://docs.expo.dev/modules/expo-audio/)
- [Expo Notifications Docs](https://docs.expo.dev/modules/expo-notifications/)
- [Android Permissions](https://developer.android.com/guide/topics/permissions/overview)
- [Android Foreground Services](https://developer.android.com/guide/components/foreground-services)
