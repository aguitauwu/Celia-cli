const { getUser } = require("@schemas/User");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { diffHours, getRemainingTime } = require("@helpers/Utils");
const { EMBED_COLORS } = require("@root/config");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "rep",
  description: "give reputation to a user",
  category: "SOCIAL",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    minArgsCount: 1,
    aliases: ["reputation"],
    subcommands: [
      {
        trigger: "view [user]",
        description: "view reputation for a user",
      },
      {
        trigger: "give [user]",
        description: "give reputation to a user",
      },
    ],
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "view",
        description: "view reputation for a user",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "the user to check reputation for",
            type: ApplicationCommandOptionType.User,
            required: false,
          },
        ],
      },
      {
        name: "give",
        description: "give reputation to a user",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "the user to check reputation for",
            type: ApplicationCommandOptionType.User,
            required: true,
          },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    const sub = args[0];
    let response;

    // status
    if (sub === "view") {
      let target = message.author;
      if (args.length > 1) {
        const resolved = (await message.guild.resolveMember(args[1])) || message.member;
        if (resolved) target = resolved.user;
      }
      response = await viewReputation(target);
    }

    // give
    else if (sub === "give") {
      const target = await message.guild.resolveMember(args[1]);
      if (!target) return message.safeReply("🥺 *susurra* Necesitas mencionar a un usuario válido para darle reputación... 🌸💭");
      response = await giveReputation(message.author, target.user);
    }

    //
    else {
      response = "🌸 *se confunde* Uso incorrecto del comando... ¿podrías intentar de nuevo? uwu 💭";
    }

    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const sub = interaction.options.getSubcommand();
    let response;

    // status
    if (sub === "view") {
      const target = interaction.options.getUser("user") || interaction.user;
      response = await viewReputation(target);
    }

    // give
    if (sub === "give") {
      const target = interaction.options.getUser("user");
      response = await giveReputation(interaction.user, target);
    }

    await interaction.followUp(response);
  },
};

async function viewReputation(target) {
  const userData = await getUser(target);
  if (!userData) return `🥺 *susurra* ${target.username} aún no tiene reputación... ¿quizas debería ser más activo? 🌸✨`;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `🌸 Reputación kawaii de ${target.username} ✨` })
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(target.displayAvatarURL())
    .addFields(
      {
        name: "🎁 Dada",
        value: userData.reputation?.given.toString(),
        inline: true,
      },
      {
        name: "🌸 Recibida",
        value: userData.reputation?.received.toString(),
        inline: true,
      }
    );

  return { embeds: [embed] };
}

async function giveReputation(user, target) {
  if (target.bot) return "🥺 *susurra* No puedo darle reputación a otros bots... somos colegas uwu 🌸🤖";
  if (target.id === user.id) return "😅 *ríe tímidamente* No puedes darte reputación a ti mismo, tontito~ 🌸✨";

  const userData = await getUser(user);
  if (userData && userData.reputation.timestamp) {
    const lastRep = new Date(userData.reputation.timestamp);
    const diff = diffHours(new Date(), lastRep);
    if (diff < 24) {
      const nextUsage = lastRep.setHours(lastRep.getHours() + 24);
      return `🥺 *susurra* Ya diste reputación hoy... puedes hacerlo de nuevo en \`${getRemainingTime(nextUsage)}\` 🌸✨`;
    }
  }

  const targetData = await getUser(target);

  userData.reputation.given += 1;
  userData.reputation.timestamp = new Date();
  targetData.reputation.received += 1;

  await userData.save();
  await targetData.save();

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(`🌸 *susurra emocionada* ${target.toString()} +1 Reputación kawaii! ✨`)
    .setFooter({ text: `💕 Por ${user.username} con amor uwu` })
    .setTimestamp(Date.now());

  return { embeds: [embed] };
}
