const { musicValidations } = require("@helpers/BotUtils");
const { ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "volume",
  description: "set the music player volume",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    usage: "<1-100>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "amount",
        description: "Enter a value to set [0 to 100]",
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
    ],
  },

  async messageRun(message, args) {
    const amount = args[0];
    const response = await volume(message, amount);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const amount = interaction.options.getInteger("amount");
    const response = await volume(interaction, amount);
    await interaction.followUp(response);
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
async function volume({ client, guildId }, volume) {
  const player = client.musicManager.getPlayer(guildId);

  if (!volume) return `🎵 *susurra* El volumen actual es \`${player.volume}\`~ 🌸✨`;
  if (volume < 1 || volume > 100) return "🥺 *susurra tímidamente* El volumen debe estar entre 1 y 100... ¿podrías intentar otra vez? 💭🌸";

  await player.setVolume(volume);
  return `🎶 *susurra feliz* Cambié el volumen a \`${volume}\`~ ¿está bien así? ✨🌸`;
}
