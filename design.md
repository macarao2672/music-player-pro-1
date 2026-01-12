# Music Player Pro - Design

## Visão Geral
Um aplicativo de player de música Android com interface moderna, suporte a modo escuro/claro, e funcionalidades nativas como acesso ao armazenamento, notificações e reprodução em segundo plano.

## Orientação
- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão
- **Padrão**: Segue guidelines iOS/Android

## Paleta de Cores

### Modo Claro
- **Primária**: #4a00e0 (Roxo)
- **Secundária**: #8e2de2 (Roxo claro)
- **Fundo**: #f8f9fa (Cinza muito claro)
- **Superfície**: #ffffff (Branco)
- **Texto**: #333333 (Cinza escuro)
- **Texto Secundário**: #666666 (Cinza médio)
- **Borda**: #e0e0e0 (Cinza claro)

### Modo Escuro
- **Primária**: #8e2de2 (Roxo claro)
- **Secundária**: #4a00e0 (Roxo)
- **Fundo**: #121212 (Preto)
- **Superfície**: #1e1e1e (Cinza muito escuro)
- **Texto**: #ffffff (Branco)
- **Texto Secundário**: #b0b0b0 (Cinza claro)
- **Borda**: #333333 (Cinza escuro)

## Telas

### 1. Home Screen (Biblioteca de Músicas)
**Conteúdo Principal:**
- Header com logo "Music Player Pro" e ícones de ação (tema, configurações)
- Barra de busca para filtrar músicas
- Sistema de abas: "Todas", "Favoritas", "Recentes"
- Lista de músicas com:
  - Ícone de álbum (gerado dinamicamente)
  - Título da música
  - Artista
  - Duração
  - Botão de favorito (coração)

**Funcionalidades:**
- Tap em música para reproduzir
- Swipe para favoritar/desfavoritar
- Busca em tempo real
- Alternância de abas

### 2. Mini Player
**Localização**: Parte inferior da tela (acima da tab bar)
**Conteúdo:**
- Ícone de álbum pequeno
- Título e artista da música em reprodução
- Botões de controle: play/pause, próxima
- Barra de progresso (clicável para buscar)

**Funcionalidades:**
- Tap para abrir player expandido
- Controles rápidos de reprodução

### 3. Expanded Player
**Localização**: Modal/Sheet que cobre a tela
**Conteúdo:**
- Ícone de álbum grande
- Título e artista
- Tempo atual / Duração total
- Barra de progresso (interativa)
- Controles: Anterior, Play/Pause, Próxima
- Botões: Shuffle, Repeat, Favorito
- Volume slider
- Botão para fechar

**Funcionalidades:**
- Controle completo de reprodução
- Ajuste de volume
- Modo shuffle e repeat
- Adicionar/remover de favoritos

### 4. Settings/Configurações
**Conteúdo:**
- Alternar tema (claro/escuro)
- Permissões (Notificações, Armazenamento)
- Informações do app

**Funcionalidades:**
- Toggle tema
- Solicitar/verificar permissões

## Fluxos de Usuário Principais

### Fluxo 1: Reproduzir Música
1. Usuário abre app
2. Vê lista de músicas (carregadas via MediaScanner)
3. Toca em uma música
4. Mini player aparece na parte inferior
5. Música começa a tocar
6. Usuário pode controlar via mini player ou expandir para controles completos

### Fluxo 2: Buscar Música
1. Usuário digita na barra de busca
2. Lista é filtrada em tempo real
3. Toca em uma música da lista filtrada
4. Reprodução inicia

### Fluxo 3: Favoritar Música
1. Usuário vê lista de músicas
2. Toca no ícone de coração
3. Música é adicionada aos favoritos
4. Ícone muda de cor (vermelho)
5. Música aparece na aba "Favoritas"

### Fluxo 4: Reprodução em Segundo Plano
1. Música está tocando
2. Usuário minimiza app
3. Música continua tocando
4. Notificação com controles aparece na barra de status
5. Usuário pode pausar/tocar/pular via notificação

## Componentes Principais

| Componente | Descrição | Localização |
|-----------|-----------|------------|
| Header | Logo + ações | Topo |
| SearchBox | Barra de busca | Abaixo do header |
| Tabs | Abas de filtro | Abaixo da busca |
| MusicList | Lista de músicas | Área principal |
| MusicItem | Item individual de música | Dentro de MusicList |
| MiniPlayer | Player compacto | Parte inferior |
| ExpandedPlayer | Player completo | Modal |
| SettingsPanel | Configurações | Modal |

## Funcionalidades Nativas Android

1. **Permissão de Notificações** - Para notificações de reprodução
2. **Acesso ao Armazenamento** - Para ler arquivos de música
3. **MediaScanner** - Para descobrir músicas automaticamente
4. **Reprodução em Segundo Plano** - Música continua tocando ao minimizar
5. **Notificação Persistente** - Controles de reprodução na barra de status
