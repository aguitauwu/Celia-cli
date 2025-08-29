# Discord Bot Installer CLI

## Overview

A command-line interface (CLI) tool designed to automatically install and configure open-source Discord bots from OpceanAI. The tool provides an interactive setup process that guides users through downloading bot repositories, configuring environment variables, and setting up dependencies. It supports multiple Discord bot projects including Nebula (multipurpose bot with music and moderation) and Archan (AI bot with Google Gemini integration).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### CLI Application Structure
- **Single-file Node.js CLI**: Built as a standalone executable using `#!/usr/bin/env node` shebang
- **Interactive Terminal Interface**: Uses readline module for user input with colorized output for better UX
- **Bot Configuration System**: Centralized configuration for multiple Discord bot projects with predefined environment variable schemas

### Core Components

#### Bot Repository Management
- **Automatic Git Cloning**: Downloads Discord bot repositories from GitHub using child_process execSync
- **Multi-bot Support**: Configurable system supporting different bot types (Nebula, Archan) with unique requirements
- **Directory Management**: Handles local file system operations for project setup

#### Environment Configuration Engine
- **Interactive Variable Setup**: Step-by-step prompts for required and optional environment variables
- **Sensitive Data Handling**: Hidden input for tokens, API keys, and other sensitive credentials
- **Automatic File Generation**: Creates both `.env` (working configuration) and `.env.example` (template) files
- **Input Validation**: Validates user input with type checking and requirement enforcement

#### User Experience Features
- **Colorized Console Output**: Enhanced terminal experience with color-coded messages (green, red, yellow, blue, cyan, magenta)
- **Progress Feedback**: Real-time status updates during installation and configuration process
- **Error Handling**: Robust error management with user-friendly messages

### Bot-Specific Configurations

#### Nebula Bot Architecture
- **MongoDB Integration**: Requires MongoDB connection for data persistence
- **Lavalink Audio System**: Optional music functionality with configurable host, port, and authentication
- **External API Support**: Weather and translation services integration
- **Discord Integration**: Standard Discord bot setup with token, client ID, and owner configuration

#### Archan Bot Architecture  
- **Google Gemini AI Integration**: AI-powered responses using Google's Gemini API
- **Simplified Configuration**: Streamlined setup focused on AI functionality
- **Discord Integration**: Basic Discord bot configuration with dedicated token and client ID

### Development Patterns
- **Modular Configuration**: Each bot has its own configuration schema with required/optional fields
- **Default Value Management**: Sensible defaults for optional configuration values
- **Cross-platform Compatibility**: Uses Node.js built-in modules for maximum compatibility

## External Dependencies

### Runtime Dependencies
- **Node.js Runtime**: Core platform for CLI execution
- **Built-in Node Modules**: 
  - `child_process` for Git operations and npm installations
  - `fs` for file system operations
  - `path` for cross-platform path handling
  - `readline` for interactive terminal input

### Bot-Specific External Services
- **Discord API**: All bots require Discord bot tokens and client IDs
- **MongoDB**: Nebula bot requires MongoDB database for data storage
- **Lavalink**: Optional audio server for Nebula's music functionality
- **Weather API**: Optional weather service integration for Nebula
- **Translation API**: Optional translation service for Nebula
- **Google Gemini API**: Required AI service for Archan bot functionality

### Installation Tools
- **Git**: Required for cloning repositories from GitHub
- **npm**: Used for installing bot dependencies after setup
- **GitHub Integration**: Pulls from OpceanAI organization repositories

### Package Distribution
- **npm Registry**: Distributed as `@guita/discord-bot-installer` for global installation
- **Global CLI Installation**: Designed to be installed globally for system-wide access