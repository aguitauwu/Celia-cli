/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "ping",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
    ephemeral: true,
    options: [],
  },

  async messageRun(message, args) {
    const ping = Math.floor(message.client.ws.ping);
    let response = `🌙 *susurra tímidamente* Mi latencia es \`${ping}ms\``;
    
    if (ping < 100) {
      response += ` uwu ✨ *muy rápidito* 💫`;
    } else if (ping < 200) {
      response += ` 🥺 *está bien...* 🌸`;
    } else {
      response += ` 😖 *ay no... un poquito lento* 💭`;
    }
    
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const ping = Math.floor(interaction.client.ws.ping);
    let response = `🌙 *susurra tímidamente* Mi latencia es \`${ping}ms\``;
    
    if (ping < 100) {
      response += ` uwu ✨ *muy rápidito* 💫`;
    } else if (ping < 200) {
      response += ` 🥺 *está bien...* 🌸`;
    } else {
      response += ` 😖 *ay no... un poquito lento* 💭`;
    }
    
    await interaction.followUp(response);
  },
};
