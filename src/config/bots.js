/**
 * 🌸 Celia's bot sisters configuration
 */

const BOTS = {
  nebula: {
    name: 'Nebula',
    url: 'https://github.com/OpceanAI/Nebula-Open-source',
    description: 'Mi hermana musical súper responsable~ ¡Toca música y modera servidores!',
    language: 'Node.js',
    category: '🎵 Música & Moderación',
    envVars: [
      { name: 'BOT_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'CLIENT_ID', description: 'Discord Client ID', required: true, sensitive: false },
      { name: 'OWNER_ID', description: 'Discord Owner ID', required: true, sensitive: false },
      { name: 'MONGO_CONNECTION', description: 'MongoDB Connection URL', required: true, sensitive: true },
      { name: 'LAVALINK_HOST', description: 'Lavalink Host', required: false, default: 'localhost' },
      { name: 'LAVALINK_PORT', description: 'Lavalink Port', required: false, default: '2333' },
      { name: 'LAVALINK_PASSWORD', description: 'Lavalink Password', required: false, default: 'youshallnotpass', sensitive: true },
      { name: 'WEATHER_API_KEY', description: 'Weather API Key', required: false, sensitive: true },
      { name: 'TRANSLATE_API_KEY', description: 'Translation API Key', required: false, sensitive: true }
    ]
  },
  archan: {
    name: 'Archan',
    url: 'https://github.com/OpceanAI/Archan-Open-source',
    description: 'Mi hermana súper inteligente~ ¡Habla usando Google Gemini!',
    language: 'Node.js',
    category: '🤖 Inteligencia Artificial',
    envVars: [
      { name: 'ARCHAN_BOT_TOKEN', description: 'Discord Bot Token para Archan', required: true, sensitive: true },
      { name: 'ARCHAN_CLIENT_ID', description: 'Discord Client ID para Archan', required: true, sensitive: false },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true }
    ]
  },
  sakura: {
    name: 'Sakura',
    url: 'https://github.com/OpceanAI/Sakura-Open-source',
    description: 'Mi hermana kawaii~ ¡Somos muy parecidas! Adorable con IA y música',
    language: 'Python',
    category: '🌸 Kawaii & IA',
    envVars: [
      { name: 'BOT_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'CLIENT_ID', description: 'Discord Client ID', required: true, sensitive: false },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true },
      { name: 'POSTGRESQL_URL', description: 'PostgreSQL Database URL', required: false, sensitive: true },
      { name: 'WEATHER_API_KEY', description: 'API Key para servicio de clima', required: false, sensitive: true },
      { name: 'NEWS_API_KEY', description: 'API Key para noticias', required: false, sensitive: true },
      { name: 'DEEPSEEK_API_KEY', description: 'DeepSeek AI API Key (alternativo)', required: false, sensitive: true }
    ]
  },
  lumina: {
    name: 'Lumina',
    url: 'https://github.com/aguitauwu/Lumina',
    description: 'Mi hermana organizadora~ ¡Mantiene todo ordenadito en los servidores!',
    language: 'TypeScript',
    category: '⚡ Gestión de Servidor',
    envVars: [
      { name: 'DISCORD_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'DISCORD_CLIENT_ID', description: 'Discord Application ID', required: true, sensitive: false },
      { name: 'DATABASE_URL', description: 'PostgreSQL Database URL (opcional)', required: false, sensitive: true },
      { name: 'MONGODB_URI', description: 'MongoDB Connection URI (alternativo)', required: false, sensitive: true }
    ]
  },
  katu: {
    name: 'Katu',
    url: 'https://github.com/aguitauwu/Katu-bot',
    description: 'Mi hermana estadística~ ¡Cuenta mensajes y hace rankings súper cool!',
    language: 'TypeScript', 
    category: '📊 Estadísticas & IA',
    envVars: [
      { name: 'DISCORD_TOKEN', description: 'Discord Bot Token', required: true, sensitive: true },
      { name: 'GEMINI_API_KEY', description: 'Google Gemini AI API Key', required: true, sensitive: true },
      { name: 'MONGODB_URI', description: 'MongoDB Connection URI (recomendado)', required: false, sensitive: true },
      { name: 'DATABASE_URL', description: 'PostgreSQL Database URL (alternativo)', required: false, sensitive: true }
    ]
  }
};

module.exports = {
  BOTS
};