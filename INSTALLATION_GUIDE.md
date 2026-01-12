# Guia de Instalação - Music Player Pro

Este guia fornece instruções passo a passo para compilar, gerar e instalar o APK do Music Player Pro em seu dispositivo Android.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- **Node.js 18 ou superior** - [Download](https://nodejs.org/)
- **pnpm** - Gerenciador de pacotes (instale com: `npm install -g pnpm`)
- **EAS CLI** - Ferramenta de build do Expo (instale com: `npm install -g eas-cli`)
- **Conta Expo** - Necessária para usar EAS Build (crie em [expo.dev](https://expo.dev))
- **Android SDK** (opcional, apenas para testes locais)

## Método 1: Compilar o APK (Recomendado)

### Passo 1: Clonar ou Preparar o Projeto

```bash
cd music-player-pro
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Verificar Configuração

```bash
pnpm check
```

Certifique-se de que não há erros de TypeScript.

### Passo 4: Fazer Login no Expo (primeira vez)

```bash
eas login
```

Siga as instruções para fazer login ou criar uma conta.

### Passo 5: Compilar o APK

```bash
eas build --platform android --local --output app.apk
```

Este processo pode levar de 5 a 15 minutos, dependendo da velocidade da internet.

### Passo 6: Transferir o APK

Após a compilação, o arquivo `app.apk` estará na raiz do projeto. Transfira-o para seu dispositivo Android usando:

- **Cabo USB**: Conecte o dispositivo e copie o arquivo para a pasta de Downloads
- **Email**: Envie o arquivo para si mesmo
- **Google Drive/OneDrive**: Faça upload e baixe no dispositivo
- **ADB**: Use `adb push app.apk /sdcard/Download/`

## Método 2: Usar Script de Build

Um script bash foi fornecido para automatizar o processo:

```bash
chmod +x scripts/build-apk.sh
./scripts/build-apk.sh
```

O script executará todos os passos automaticamente.

## Instalação no Dispositivo Android

### Passo 1: Habilitar Instalação de Fontes Desconhecidas

1. Abra **Configurações** no seu dispositivo
2. Navegue até **Segurança** ou **Privacidade**
3. Procure por **Fontes desconhecidas** ou **Aplicativos desconhecidos**
4. Ative a opção para permitir instalação de APKs

### Passo 2: Instalar o APK

#### Opção A: Gerenciador de Arquivos

1. Abra o **Gerenciador de Arquivos**
2. Navegue até a pasta onde o `app.apk` foi salvo (geralmente Downloads)
3. Toque no arquivo `app.apk`
4. Toque em **Instalar**
5. Aguarde a conclusão da instalação

#### Opção B: ADB (se disponível)

```bash
adb install -r app.apk
```

### Passo 3: Iniciar o Aplicativo

1. Procure por **Music Player Pro** na tela inicial
2. Toque no ícone para abrir
3. Conceda as permissões solicitadas

## Permissões Necessárias

O aplicativo solicitará as seguintes permissões ao iniciar:

- **Notificações**: Para exibir notificações de reprodução
- **Arquivos de Mídia**: Para acessar músicas no dispositivo
- **Armazenamento**: Para ler arquivos de áudio

**Importante**: Conceda todas as permissões para que o aplicativo funcione corretamente.

## Primeiro Uso

### Escanear Músicas

1. Ao abrir o aplicativo pela primeira vez, você verá uma mensagem "Nenhuma música encontrada"
2. Toque em **Escanear** para descobrir músicas no seu dispositivo
3. Aguarde o processo de escaneamento (pode levar alguns minutos)
4. As músicas encontradas aparecerão na lista

### Reproduzir Música

1. Toque em uma música na lista para começar a reproduzir
2. Use os controles na parte inferior para pausar, pular, etc.
3. Toque no mini player para abrir os controles expandidos

## Troubleshooting

### Problema: "Arquivo não pode ser instalado"

**Solução**: Verifique se:
- Você habilitou "Fontes desconhecidas" nas configurações
- O arquivo APK não está corrompido
- Seu dispositivo tem espaço de armazenamento suficiente

### Problema: "Nenhuma música encontrada após escanear"

**Solução**:
- Certifique-se de que há arquivos de áudio no dispositivo
- Coloque alguns arquivos MP3 na pasta `/Music`
- Tente escanear novamente
- Verifique se a permissão de acesso a arquivos foi concedida

### Problema: "Aplicativo para ao abrir"

**Solução**:
- Desinstale e reinstale o aplicativo
- Verifique se seu dispositivo atende aos requisitos mínimos (Android 7.0+)
- Consulte os logs com: `adb logcat | grep "Music Player"`

### Problema: "Notificações não aparecem"

**Solução**:
- Verifique se a permissão POST_NOTIFICATIONS foi concedida
- Verifique as configurações de notificação do seu dispositivo
- Certifique-se de que o aplicativo não está silenciado

## Requisitos do Sistema

- **Android**: 7.0 (API 24) ou superior
- **Espaço em Disco**: Mínimo 50 MB
- **RAM**: Mínimo 2 GB (recomendado 4 GB+)
- **Processador**: ARM v7a ou ARM64

## Desinstalação

Para desinstalar o aplicativo:

1. Abra **Configurações**
2. Navegue até **Aplicativos**
3. Procure por **Music Player Pro**
4. Toque em **Desinstalar**
5. Confirme a desinstalação

## Suporte e Feedback

Se encontrar problemas ou tiver sugestões:

1. Verifique a documentação em `ANDROID_NATIVE_FEATURES.md`
2. Consulte os logs do aplicativo
3. Reporte problemas no repositório do projeto

## Atualizações

Para atualizar o aplicativo:

1. Compile uma nova versão do APK seguindo os passos acima
2. Desinstale a versão anterior
3. Instale a nova versão

**Nota**: Os dados do aplicativo (favoritos, histórico) serão preservados se você usar `adb install -r` em vez de desinstalar manualmente.

## Recursos Adicionais

- [Documentação de Funcionalidades Nativas](./ANDROID_NATIVE_FEATURES.md)
- [Design do Aplicativo](./design.md)
- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do Android](https://developer.android.com/)

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro de 2026
