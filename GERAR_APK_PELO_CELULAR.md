# Como Gerar o APK 100% pelo Celular 📱

Este guia mostra como gerar o APK do Music Player Pro usando apenas seu celular, sem precisar de computador.

## Método: EAS Build (Recomendado - Mais Fácil)

EAS Build é um serviço online do Expo que compila seu app na nuvem e envia o APK direto para você.

### Passo 1: Criar Conta no Expo (5 minutos)

1. Abra o navegador do seu celular
2. Acesse: **https://expo.dev**
3. Clique em **Sign Up** (Criar Conta)
4. Escolha uma das opções:
   - Email e senha
   - GitHub
   - Google
5. Confirme seu email
6. **Pronto!** Sua conta está criada

### Passo 2: Acessar o Projeto Online

1. Acesse: **https://github.com/new** (crie uma conta GitHub se não tiver)
2. Crie um novo repositório chamado `music-player-pro`
3. Copie o código do projeto para lá
4. Ou acesse diretamente o link que será fornecido

### Passo 3: Conectar Expo ao GitHub

1. Acesse: **https://expo.dev/dashboard**
2. Faça login com sua conta Expo
3. Clique em **Projects**
4. Clique em **New Project**
5. Selecione **Import from GitHub**
6. Autorize o Expo a acessar seu GitHub
7. Selecione o repositório `music-player-pro`
8. Clique em **Import**

### Passo 4: Iniciar a Compilação

1. No dashboard do Expo, clique no projeto `music-player-pro`
2. Clique em **Build**
3. Selecione **Android**
4. Escolha:
   - **Build type**: APK
   - **Release channel**: production
5. Clique em **Start build**
6. Aguarde a compilação (geralmente 5-15 minutos)

### Passo 5: Baixar o APK

1. Quando a compilação terminar, você verá um link de download
2. Clique em **Download** para baixar o APK
3. O arquivo será salvo na pasta **Downloads** do seu celular

### Passo 6: Instalar o APK

1. Abra o **Gerenciador de Arquivos**
2. Navegue até **Downloads**
3. Procure por `music-player-pro-*.apk`
4. Toque no arquivo
5. Se aparecer um aviso, toque em **Instalar mesmo assim**
6. Aguarde a instalação
7. Toque em **Abrir** para iniciar o app

## Método Alternativo: Usando Expo Go (Mais Rápido para Testes)

Se quiser testar antes de gerar o APK final:

### Passo 1: Instalar Expo Go

1. Abra a **Google Play Store**
2. Procure por **Expo Go**
3. Clique em **Instalar**
4. Aguarde a instalação

### Passo 2: Conectar ao Projeto

1. Abra o **Expo Go**
2. Faça login com sua conta Expo
3. Procure por `music-player-pro`
4. Toque para abrir
5. O app carregará em segundos

**Vantagem**: Você vê as mudanças em tempo real sem compilar  
**Desvantagem**: Funcionalidades nativas podem não funcionar 100%

## Troubleshooting

### Problema: "Build falhou"

**Solução**:
1. Verifique se o código está correto no GitHub
2. Tente novamente clicando em **Rebuild**
3. Se persistir, verifique os logs clicando em **View logs**

### Problema: "Não consigo fazer login no Expo"

**Solução**:
1. Verifique sua conexão de internet
2. Tente limpar o cache do navegador
3. Tente em outro navegador (Chrome, Firefox, etc.)

### Problema: "Download não funciona"

**Solução**:
1. Verifique se tem espaço no celular (mínimo 100 MB)
2. Tente novamente o download
3. Se não funcionar, use um gerenciador de download

### Problema: "Instalação bloqueada - Fonte desconhecida"

**Solução**:
1. Abra **Configurações**
2. Vá para **Segurança** ou **Privacidade**
3. Procure por **Fontes desconhecidas** ou **Instalar aplicativos desconhecidos**
4. Ative para o navegador que usou para baixar
5. Tente instalar novamente

### Problema: "App não abre após instalar"

**Solução**:
1. Desinstale e reinstale
2. Verifique se seu Android é 7.0 ou superior
3. Libere espaço em armazenamento
4. Reinicie o celular

## Permissões na Primeira Abertura

Quando abrir o app pela primeira vez, ele pedirá:

- ✅ **Notificações**: Permita (para avisos de reprodução)
- ✅ **Arquivos de Mídia**: Permita (para acessar músicas)
- ✅ **Armazenamento**: Permita (para ler arquivos)

**Importante**: Conceda todas as permissões para que o app funcione corretamente!

## Próximas Vezes

Depois que o APK estiver gerado, você pode:

1. **Compartilhar com amigos**: Envie o arquivo APK por email, WhatsApp, etc.
2. **Atualizar**: Gere um novo APK quando fizer mudanças
3. **Usar Expo Go**: Para testes rápidos sem compilar

## Dicas Importantes

- 📱 Mantenha seu celular conectado à internet durante todo o processo
- 🔋 Deixe a bateria carregando (o processo pode demorar)
- 🌐 Use WiFi se possível (mais estável que dados móveis)
- ⏱️ A primeira compilação demora mais (5-15 min), as próximas são mais rápidas
- 💾 O APK fica salvo em Downloads, você pode compartilhar depois

## Links Úteis

- **Expo Dashboard**: https://expo.dev/dashboard
- **Expo Docs**: https://docs.expo.dev
- **GitHub**: https://github.com
- **Google Play Store**: https://play.google.com/store

## Suporte

Se tiver dúvidas:

1. Consulte a [Documentação do Expo](https://docs.expo.dev)
2. Verifique o [Guia de Instalação](./INSTALLATION_GUIDE.md)
3. Leia a [Documentação de Funcionalidades Nativas](./ANDROID_NATIVE_FEATURES.md)

---

**Dúvida?** Tente novamente os passos ou entre em contato com o suporte do Expo em https://expo.dev/support

**Sucesso! 🎉** Seu APK estará pronto em poucos minutos!
