# Overview

OpceanAI CLI is a Node.js command-line tool designed to automatically install and configure open-source Discord bots from the OpceanAI ecosystem. The tool streamlines the process of setting up Discord bots by automating repository cloning, dependency installation, and environment variable configuration through an interactive setup process.

The CLI currently supports five main Discord bots:
- **Nebula**: A multipurpose bot with music and moderation capabilities (Node.js)
- **Archan**: An AI-powered bot using Google Gemini (Node.js)
- **Sakura**: A kawaii adorable bot with AI, music and unique personality (Python)
- **Lumina**: Server management bot with verification, welcome messages and autoroles (TypeScript)
- **Katu**: Message counter bot with AI and daily rankings (TypeScript)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## CLI Architecture
The application follows a single-file CLI architecture pattern built on Node.js core modules:
- **Entry Point**: Single `index.js` file serving as both the main application and executable binary
- **Command Processing**: Direct argument parsing without external CLI frameworks
- **Interactive Interface**: Uses Node.js `readline` module for user input and configuration
- **Process Management**: Leverages `child_process.execSync` for Git operations and multi-language dependency installations
- **Multi-Language Support**: Handles Node.js, Python, and TypeScript projects with appropriate dependency managers

## Configuration Management
The tool implements a declarative configuration system:
- **Bot Definitions**: Static configuration objects defining each bot's requirements, language, and environment variables
- **Environment Variable Handling**: Language-specific `.env` and `.env.example` file generation with enhanced formatting
- **Validation System**: Built-in validation for required vs optional configuration values
- **Security Features**: Sensitive data input masking for tokens and API keys
- **Categorization System**: Bots organized by functionality (Music & Moderation, AI, Server Management, etc.)

## Installation Workflow
The architecture supports two installation modes:
- **Interactive Mode**: Step-by-step guided setup with user prompts
- **Quick Install Mode**: Automated installation for mobile or headless environments
- **Git Integration**: Direct GitHub repository cloning and dependency resolution

## Cross-Platform Support
The design prioritizes platform compatibility:
- **Operating System Support**: Windows, Linux, macOS, and Android
- **Architecture Support**: Multiple CPU architectures (x64, ia32, ARM variants)
- **Node.js Compatibility**: Minimum Node.js 14.0.0 requirement

# External Dependencies

## Core Dependencies
- **Node.js Runtime**: Minimum version 14.0.0 for core functionality
- **Git**: Required for repository cloning operations
- **npm**: Used for dependency installation in target bot projects

## Bot-Specific External Services
### Nebula Bot Dependencies
- **Discord API**: Bot token and client ID for Discord integration
- **MongoDB**: Database connection for data persistence
- **Lavalink**: Music streaming service (optional)
- **Weather API**: Third-party weather service (optional)
- **Translation API**: Text translation service (optional)

### Archan Bot Dependencies
- **Discord API**: Bot token and client ID for Discord integration
- **Google Gemini AI**: API key for AI functionality

### Sakura Bot Dependencies (Python)
- **Discord API**: Bot token and client ID for Discord integration
- **Google Gemini AI**: Primary AI API key for kawaii personality
- **PostgreSQL**: Optional database for data persistence
- **Weather API**: Optional third-party weather service
- **News API**: Optional news service integration
- **DeepSeek AI**: Optional alternative AI provider

### Lumina Bot Dependencies (TypeScript)
- **Discord API**: Bot token and application ID for Discord integration
- **PostgreSQL**: Optional database (auto-detection system)
- **MongoDB**: Alternative database option
- **Local Storage**: Automatic fallback when no external database is configured

### Katu Bot Dependencies (TypeScript)
- **Discord API**: Bot token for Discord integration
- **Google Gemini AI**: API key for AI conversational features
- **MongoDB**: Recommended database for message counting and rankings
- **PostgreSQL**: Alternative database option
- **Memory Storage**: Fallback when no database is configured

## Distribution Platform
- **npm Registry**: Primary distribution method as a global CLI package
- **GitHub**: Source repository hosting for the OpceanAI bot projects

The architecture is designed for simplicity and ease of use, avoiding complex frameworks in favor of Node.js built-in capabilities to maintain a lightweight footprint and broad compatibility.