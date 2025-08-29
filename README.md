# 🤖 OpceanAI CLI

[![npm version](https://badge.fury.io/js/opceanaicli.svg)](https://www.npmjs.com/package/opceanaicli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Support](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

**CLI tool to install and configure open-source Discord bots from OpceanAI automatically**

Una herramienta de línea de comandos que permite instalar y configurar automáticamente bots de Discord de código abierto de OpceanAI con configuración interactiva de variables de entorno.

## ✨ Características

- 🚀 **Instalación Automática**: Clona repositorios de GitHub automáticamente
- 🔧 **Configuración Interactiva**: Guía paso a paso para configurar variables de entorno
- 🔐 **Entrada Segura**: Input oculto para datos sensibles (tokens, API keys)
- 📁 **Generación Automática**: Crea archivos `.env` y `.env.example` automáticamente
- 📦 **Instalación de Dependencias**: Instala dependencias npm opcional
- 🎨 **Interfaz Colorizada**: Experiencia de usuario mejorada con colores
- ✅ **Validación de Entrada**: Validación robusta de datos de entrada
- 🌍 **Multiplataforma**: Compatible con Windows, Linux y macOS
- 📱 **Modo Rápido**: Instalación sin interacción para entornos móviles

## 📦 Instalación

### Instalación Global (Recomendada)
```bash
npm install -g opceanaicli
```

### Verificar Instalación
```bash
opceanaicli --version
```

## 🚀 Uso Rápido

### Ver Bots Disponibles
```bash
opceanaicli list
```

### Instalación Rápida (Recomendada para móviles)
```bash
# Instalar Nebula Bot
opceanaicli quick-install nebula

# Instalar Archan Bot  
opceanaicli quick-install archan
```

### Instalación Interactiva (Para escritorio)
```bash
# Instalación completa con configuración paso a paso
opceanaicli install nebula
opceanaicli install archan
```

## 🤖 Bots Disponibles

### 🎵 Nebula Bot
- **Descripción**: Bot multipropósito con música y moderación
- **Repositorio**: [OpceanAI/Nebula-Open-source-](https://github.com/OpceanAI/Nebula-Open-source-)
- **Características**: Música, moderación, utilidades
- **Requisitos**: Discord Bot Token, MongoDB

### 🧠 Archan Bot  
- **Descripción**: Bot de IA con Google Gemini
- **Repositorio**: [OpceanAI/Archan-Open-source-](https://github.com/OpceanAI/Archan-Open-source-)
- **Características**: Respuestas AI, chat inteligente
- **Requisitos**: Discord Bot Token, Google Gemini API Key

## 📖 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `opceanaicli list` | Ver bots disponibles |
| `opceanaicli install <bot>` | Instalación interactiva |
| `opceanaicli quick-install <bot>` | Instalación rápida |
| `opceanaicli --help` | Mostrar ayuda |
| `opceanaicli --version` | Mostrar versión |

## 🔧 Configuración Post-Instalación

Después de la instalación, necesitarás configurar las variables de entorno:

### Para Nebula Bot:
1. **Discord Developer Portal**: https://discord.com/developers/applications
   - Crear aplicación → Bot → Copiar token
   - General Information → Copiar Application ID
2. **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
3. Editar archivo `.env` en `nebula-bot/`

### Para Archan Bot:
1. **Discord Developer Portal**: https://discord.com/developers/applications
2. **Google AI Studio**: https://ai.google.dev/
3. Editar archivo `.env` en `archan-bot/`

## 💻 Compatibilidad

### Sistemas Operativos
- ✅ Windows (32/64 bits)
- ✅ Linux (todas las distros)
- ✅ macOS

### Arquitecturas
- ✅ x86 (32/64 bits)
- ✅ ARM (32/64 bits)
- ✅ Apple Silicon (M1/M2)

### Requisitos
- **Node.js**: ≥14.0.0
- **Git**: Para clonar repositorios
- **npm**: Para instalación de dependencias

## 🔄 Diferencias entre Modos

### `install` (Interactivo)
- ✅ Configuración paso a paso
- ✅ Input oculto para tokens sensibles
- ✅ Instalación automática de dependencias
- ❌ Puede fallar en entornos móviles

### `quick-install` (Rápido)
- ✅ Sin interacción - ideal para móviles
- ✅ Instalación inmediata
- ✅ Compatible con todos los entornos
- ⚠️ Requiere edición manual del .env

## 🛠️ Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/opceanaicli.git
cd opceanaicli

# Hacer ejecutable
chmod +x index.js

# Probar localmente
./index.js --help
```

## 📝 Ejemplo Completo

```bash
# 1. Instalar OpceanAI CLI
npm install -g opceanaicli

# 2. Ver bots disponibles
opceanaicli list

# 3. Instalar Archan Bot (modo rápido)
opceanaicli quick-install archan

# 4. Configurar tokens
cd archan-bot
# Editar .env con tus tokens reales

# 5. Instalar dependencias y ejecutar
npm install
npm start
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## ⚠️ Disclaimer

Este CLI es una herramienta no oficial para facilitar la instalación de bots de Discord de OpceanAI. Los bots instalados son propiedad de sus respectivos desarrolladores.

## 🔗 Enlaces Útiles

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Google AI Studio](https://ai.google.dev/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Node.js Downloads](https://nodejs.org/)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/opceanaicli?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/opceanaicli?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/opceanaicli)

---

**Hecho con ❤️ por la comunidad de OpceanAI**
