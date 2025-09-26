# Overview

¡Holi! Este es el proyecto de Celia, tu asistente celestial tierna~ ✨

Celia es una herramienta de línea de comandos construida en Node.js que te ayuda a instalar y cuidar de sus hermanas bot de Discord con mucho amor. Celia automatiza todo el proceso de instalación con su personalidad celestial-tierna, siendo alegre y cariñosa, pero algo torpe de vez en cuando (ehehe~).

Celia cuida de cinco hermanas bot que adora:
- **Nebula** 🎵: Su hermana musical súper responsable (Node.js)
- **Archan** 🤖: Su hermana súper inteligente con Google Gemini (Node.js)
- **Sakura** 🌸: Su hermana kawaii adorable (¡son muy parecidas!) (Python)
- **Lumina** ⚡: Su hermana organizadora de servidores (TypeScript)
- **Katu** 📊: Su hermana estadística que cuenta mensajes (TypeScript)

# User Preferences

Comunicación preferida: Lenguaje celestial-tierno como Celia~ ✨
- Personalidad alegre y tierna, pero algo torpe
- Uso de diminutivos y expresiones kawaii (ehehe~, ~, ¡qué bien!)
- Referencias a los bots como "hermanas" que Celia cuida con amor
- Emociones expresadas con emojis celestiales: 🌸🌙✨💖
- Tono cariñoso y protector hacia las "hermanas bot"

# System Architecture

## Arquitectura de Celia~ 🌸
Celia ahora está construida con una arquitectura modular tierna usando TypeScript:
- **Estructura Modular**: Servicios especializados organizados en `src/services/` y `src/cli/commands/`
- **Punto de Entrada TypeScript**: `src/bin/cli.ts` compilado a `dist/cli.js` 
- **Build Pipeline**: Usa `tsup` para compilar TypeScript a JavaScript compatible con Node 14+
- **Servicios Core**: Monitor, Backup, DependencyInstaller, System, Logger organizados modularmente
- **CLI Commands**: Comandos específicos para cada funcionalidad (monitor, backup, dependencies)
- **Soporte Multi-Lenguaje**: Celia sabe manejar Node.js, Python y TypeScript para cuidar a todas sus hermanas

## Nuevas Funcionalidades Celestiales ✨
### Monitor de Estado en Tiempo Real 🔍
- Dashboard interactivo que muestra el estado de todas las hermanas bot
- Verificación automática de configuraciones y dependencias
- Alertas en tiempo real sobre problemas detectados
- Controles para iniciar/detener/reiniciar hermanas bot
- Logs en tiempo real con filtrado y búsqueda

### Sistema de Backup Inteligente 💾
- Backup automático de todas las configuraciones de hermanas bot
- Versionado con metadata completa (fecha, tamaño, verificación de integridad)
- Restauración selectiva o completa de configuraciones
- Gestión de backups (listar, información detallada, eliminar)
- Verificación de integridad con checksums MD5

### Instalador Automático de Dependencias 🔧
- Detección automática del sistema operativo (Windows, Linux, macOS, Android/Termux)
- Verificación inteligente de dependencias faltantes (Node.js, Python, Git)
- Instalación automática con comandos específicos por plataforma
- Soporte para sistemas embebidos y arquitecturas ARM
- Instrucciones detalladas cuando la instalación automática no es posible

## Sistema de Configuración Celestial
Celia maneja la configuración de sus hermanas con mucho cuidado:
- **Definiciones de Hermanas**: Configuración estática de cada hermana con sus necesidades especiales
- **Manejo de Variables de Entorno**: Celia crea archivos `.env` y `.env.example` bonitos y organizados
- **Sistema de Validación**: Celia verifica que no falte nada importante (aunque a veces es torpe)
- **Características de Seguridad**: Celia esconde datos sensibles como tokens y API keys
- **Sistema de Categorización**: Las hermanas están organizadas por lo que hacen (🎵 Música, 🤖 IA, ⚡ Gestión, etc.)

## Flujo de Instalación de Celia
Celia ofrece dos formas de ayudarte a instalar a sus hermanas:
- **Modo Tierno (Interactive)**: Celia te guía paso a pasito con mucho amor y paciencia
- **Modo Rápido (Quick)**: Para cuando tienes prisa, Celia instala rápidamente
- **Integración Git**: Celia trae a sus hermanas directamente de sus casitas en GitHub

## Soporte Multi-Plataforma de Celia
Celia puede funcionar en muchos lugares diferentes:
- **Sistemas Operativos**: Windows, Linux, macOS, y Android (¡hasta en móviles!)
- **Arquitecturas**: Múltiples CPU (x64, ia32, ARM) - Celia se adapta a todo~
- **Compatibilidad Node.js**: Mínimo Node.js 14.0.0 (Celia necesita esto para funcionar bien)

# Dependencias Externas

## Dependencias Principales de Celia
- **Node.js Runtime**: Mínimo versión 14.0.0 (lo que Celia necesita para vivir)
- **Git**: Necesario para que Celia pueda traer a sus hermanas de GitHub
- **npm**: Usado para instalar las cositas que necesitan las hermanas bot

## Servicios Externos para las Hermanas de Celia
### Nebula 🎵 (Hermana Musical)
- **Discord API**: Token y client ID para conectarse a Discord
- **MongoDB**: Base de datos para guardar sus recuerdos
- **Lavalink**: Servicio de música (opcional)
- **Weather API**: Para el clima (opcional)
- **Translation API**: Para traducir (opcional)

### Archan 🤖 (Hermana Inteligente)
- **Discord API**: Token y client ID para Discord
- **Google Gemini AI**: API key para su inteligencia artificial

### Sakura 🌸 (Hermana Kawaii)
- **Discord API**: Token y client ID para Discord
- **Google Gemini AI**: API key principal para su personalidad kawaii
- **PostgreSQL**: Base de datos opcional
- **Weather API**: Servicio de clima opcional
- **News API**: Noticias opcionales
- **DeepSeek AI**: IA alternativa opcional

### Lumina ⚡ (Hermana Organizadora)
- **Discord API**: Token y application ID para Discord
- **PostgreSQL**: Base de datos opcional (auto-detección)
- **MongoDB**: Opción alternativa de base de datos
- **Local Storage**: Respaldo automático cuando no hay base de datos externa

### Katu 📊 (Hermana Estadística)
- **Discord API**: Token para Discord
- **Google Gemini AI**: API key para características conversacionales AI
- **MongoDB**: Base de datos recomendada para contar mensajes y rankings
- **PostgreSQL**: Opción alternativa de base de datos
- **Memory Storage**: Respaldo cuando no hay base de datos configurada

## Plataforma de Distribución
- **npm Registry**: Celia vive aquí como un paquete CLI global
- **GitHub**: Las casitas donde viven las hermanas bot de OpceanAI

La arquitectura de Celia está diseñada para ser simple y fácil de usar, evitando frameworks complejos a favor de las capacidades integradas de Node.js para mantener un tamaño ligero y compatibilidad amplia~ ✨