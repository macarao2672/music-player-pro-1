#!/bin/bash

# Script de Build do APK - Music Player Pro
# Este script compila o aplicativo para Android e gera um APK pronto para instalação

set -e

echo "================================"
echo "Music Player Pro - Build Android"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Erro: pnpm não está instalado${NC}"
    echo "Instale com: npm install -g pnpm"
    exit 1
fi

# Verificar se eas-cli está instalado
if ! command -v eas &> /dev/null; then
    echo -e "${YELLOW}Aviso: eas-cli não está instalado${NC}"
    echo "Instalando eas-cli..."
    pnpm add -g eas-cli
fi

echo -e "${YELLOW}Passo 1: Verificando dependências...${NC}"
pnpm check
echo -e "${GREEN}✓ Dependências verificadas${NC}"
echo ""

echo -e "${YELLOW}Passo 2: Limpando build anterior...${NC}"
rm -rf dist/ .expo/ android/ build/ || true
echo -e "${GREEN}✓ Build anterior limpo${NC}"
echo ""

echo -e "${YELLOW}Passo 3: Compilando para Android...${NC}"
echo "Nota: Este processo pode levar vários minutos..."
echo ""

# Tentar compilar com eas build
if command -v eas &> /dev/null; then
    echo "Usando EAS Build (recomendado)..."
    eas build --platform android --local --output ./app.apk || {
        echo -e "${RED}Erro na compilação com EAS${NC}"
        echo "Tentando método alternativo..."
        exit 1
    }
else
    echo "EAS CLI não disponível. Tente instalar com: npm install -g eas-cli"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Compilação concluída!${NC}"
echo ""

# Verificar se o APK foi gerado
if [ -f "./app.apk" ]; then
    APK_SIZE=$(du -h ./app.apk | cut -f1)
    echo -e "${GREEN}APK gerado com sucesso!${NC}"
    echo "Localização: ./app.apk"
    echo "Tamanho: $APK_SIZE"
    echo ""
    echo -e "${YELLOW}Próximos passos:${NC}"
    echo "1. Transferir o APK para seu dispositivo Android"
    echo "2. Habilitar 'Instalar de fontes desconhecidas' nas configurações"
    echo "3. Abrir o arquivo APK no gerenciador de arquivos"
    echo "4. Seguir as instruções de instalação"
    echo ""
    echo -e "${YELLOW}Ou instalar via ADB (se disponível):${NC}"
    echo "adb install -r ./app.apk"
else
    echo -e "${RED}Erro: APK não foi gerado${NC}"
    exit 1
fi
