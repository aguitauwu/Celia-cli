const SnakeGame = require("snakecord");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "snake",
  description: "play snake game on discord",
  cooldown: 300,
  category: "FUN",
  botPermissions: ["SendMessages", "EmbedLinks", "AddReactions", "ReadMessageHistory", "ManageMessages"],
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(message, args) {
    await message.safeReply("🐍🌸 *susurra emocionada* ¡Vamos a jugar Snake! uwu ✨");
    await startSnakeGame(message);
  },

  async interactionRun(interaction) {
    await interaction.followUp("🐍🌸 *susurra emocionada* ¡Vamos a jugar Snake! uwu ✨");
    await startSnakeGame(interaction);
  },
};

async function startSnakeGame(data) {
  const snakeGame = new SnakeGame({
    title: "🐍 Juego Snake Kawaii 🌸",
    color: "PURPLE",
    timestamp: true,
    gameOverTitle: "🥺 Game Over~ *se esconde* 🌸",
  });

  await snakeGame.newGame(data);
}
