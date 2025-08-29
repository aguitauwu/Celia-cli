const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
  ButtonStyle,
} = require("discord.js");
const { SUGGESTIONS } = require("@root/config");
const { addSuggestion } = require("@schemas/Suggestions");
const { stripIndent } = require("common-tags");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "suggest",
  description: "submit a suggestion",
  category: "SUGGESTION",
  cooldown: 20,
  command: {
    enabled: true,
    usage: "<suggestion>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "suggestion",
        description: "the suggestion",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args, data) {
    const suggestion = args.join(" ");
    const response = await suggest(message.member, suggestion, data.settings);
    if (typeof response === "boolean") return message.channel.safeSend("🌸 *susurra emocionada* ¡Tu sugerencia fue enviada exitosamente! ✨", 5);
    else await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const suggestion = interaction.options.getString("suggestion");
    const response = await suggest(interaction.member, suggestion, data.settings);
    if (typeof response === "boolean") interaction.followUp("🌸 *susurra emocionada* ¡Tu sugerencia fue enviada exitosamente! ✨");
    else await interaction.followUp(response);
  },
};

/**
 * @param {import('discord.js').GuildMember} member
 * @param {string} suggestion
 * @param {object} settings
 */
async function suggest(member, suggestion, settings) {
  if (!settings.suggestions.enabled) return "🥺 *susurra* El sistema de sugerencias está desactivado... 💭🌸";
  if (!settings.suggestions.channel_id) return "😟 *se preocupa* No hay un canal de sugerencias configurado... 🥺🌸";
  const channel = member.guild.channels.cache.get(settings.suggestions.channel_id);
  if (!channel) return "🥺 *susurra confundida* No puedo encontrar el canal de sugerencias... ¿existe aún? 💭🌸";

  const embed = new EmbedBuilder()
    .setAuthor({ name: "🌸 Nueva Sugerencia Kawaii ✨" })
    .setThumbnail(member.user.avatarURL())
    .setColor(SUGGESTIONS.DEFAULT_EMBED)
    .setDescription(
      stripIndent`
        ${suggestion}

        **🌸 Sugerido por** 
        ${member.user.username} [${member.id}]
      `
    )
    .setTimestamp();

  let buttonsRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("SUGGEST_APPROVE").setLabel("✨ Aprobar").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("SUGGEST_REJECT").setLabel("😖 Rechazar").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("SUGGEST_DELETE").setLabel("🗑️ Eliminar").setStyle(ButtonStyle.Secondary)
  );

  try {
    const sentMsg = await channel.send({
      embeds: [embed],
      components: [buttonsRow],
    });

    await sentMsg.react(SUGGESTIONS.EMOJI.UP_VOTE);
    await sentMsg.react(SUGGESTIONS.EMOJI.DOWN_VOTE);

    await addSuggestion(sentMsg, member.id, suggestion);

    return true;
  } catch (ex) {
    member.client.logger.error("suggest", ex);
    return "🥺 *se esconde* No pude enviar el mensaje al canal de sugerencias... 💭🌸";
  }
}
