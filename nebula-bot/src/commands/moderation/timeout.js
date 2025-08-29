const { timeoutTarget } = require("@helpers/ModUtils");
const { ApplicationCommandOptionType } = require("discord.js");
const ems = require("enhanced-ms");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "timeout",
  description: "timeouts the specified member",
  category: "MODERATION",
  botPermissions: ["ModerateMembers"],
  userPermissions: ["ModerateMembers"],
  command: {
    enabled: true,
    aliases: ["mute"],
    usage: "<ID|@member> <duration> [reason]",
    minArgsCount: 2,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        description: "the target member",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "duration",
        description: "the time to timeout the member for",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "reason",
        description: "reason for timeout",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },

  async messageRun(message, args) {
    const target = await message.guild.resolveMember(args[0], true);
    if (!target) return message.safeReply(`🥺 *susurra* No puedo encontrar a esa persona... ¿estás seguro del nombre? 💭🌸`);

    // parse time
    const ms = ems(args[1]);
    if (!ms) return message.safeReply("🌸 *susurra confundida* Necesito una duración válida... como 1d/1h/1m/1s~ 💭✨");

    const reason = args.slice(2).join(" ").trim();
    const response = await timeout(message.member, target, ms, reason);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const user = interaction.options.getUser("user");

    // parse time
    const duration = interaction.options.getString("duration");
    const ms = ems(duration);
    if (!ms) return interaction.followUp("🌸 *susurra confundida* Necesito una duración válida... como 1d/1h/1m/1s~ 💭✨");

    const reason = interaction.options.getString("reason");
    const target = await interaction.guild.members.fetch(user.id);

    const response = await timeout(interaction.member, target, ms, reason);
    await interaction.followUp(response);
  },
};

async function timeout(issuer, target, ms, reason) {
  if (isNaN(ms)) return "🌸 *se confunde* Esa no es una duración válida... intenta 1d/1h/1m/1s~ 💭✨";
  const response = await timeoutTarget(issuer, target, ms, reason);
  if (typeof response === "boolean") return `😟 *susurra tristemente* He tenido que silenciar a ${target.user.username}... espero que reflexione~ 🌸💭`;
  if (response === "BOT_PERM") return `🥺 *se esconde* No tengo permisos para silenciar a ${target.user.username}... ¿podrías darme los permisos? 💭✨`;
  else if (response === "MEMBER_PERM") return `😳 *susurra nerviosamente* Tú no tienes permisos para silenciar a ${target.user.username}... 🌸💭`;
  else if (response === "ALREADY_TIMEOUT") return `🤭 *susurra* ${target.user.username} ya está silenciado... no puedo silenciarlo más~ 🌸✨`;
  else return `😟 *se preocupa* No pude silenciar a ${target.user.username}... algo salió mal~ 🥺🌸`;
}
