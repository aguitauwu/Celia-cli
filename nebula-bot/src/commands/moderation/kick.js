const { kickTarget } = require("@helpers/ModUtils");
const { ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "kick",
  description: "kicks the specified member",
  category: "MODERATION",
  botPermissions: ["KickMembers"],
  userPermissions: ["KickMembers"],
  command: {
    enabled: true,
    usage: "<ID|@member> [reason]",
    minArgsCount: 1,
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
        name: "reason",
        description: "reason for kick",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },

  async messageRun(message, args) {
    const target = await message.guild.resolveMember(args[0], true);
    if (!target) return message.safeReply(`🥺 *susurra* No puedo encontrar a esa persona... ¿estás seguro del nombre? 💭🌸`);
    const reason = message.content.split(args[0])[1].trim();
    const response = await kick(message.member, target, reason);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const target = await interaction.guild.members.fetch(user.id);

    const response = await kick(interaction.member, target, reason);
    await interaction.followUp(response);
  },
};

async function kick(issuer, target, reason) {
  const response = await kickTarget(issuer, target, reason);
  if (typeof response === "boolean") return `😔 *susurra tristemente* He tenido que expulsar a ${target.user.username}... espero que reflexione~ 🌸💭`;
  if (response === "BOT_PERM") return `🥺 *se esconde* No tengo permisos para expulsar a ${target.user.username}... ¿podrías darme los permisos? 💭✨`;
  else if (response === "MEMBER_PERM") return `😳 *susurra nerviosamente* Tú no tienes permisos para expulsar a ${target.user.username}... 🌸💭`;
  else return `😟 *se preocupa* No pude expulsar a ${target.user.username}... algo salió mal~ 🥺🌸`;
}
