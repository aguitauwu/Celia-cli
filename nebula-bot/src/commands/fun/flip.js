const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");

const NORMAL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_,;.?!/\\'0123456789";
const FLIPPED = "∀qϽᗡƎℲƃHIſʞ˥WNOԀὉᴚS⊥∩ΛMXʎZɐqɔpǝɟbɥıظʞןɯuodbɹsʇnʌʍxʎz‾'؛˙¿¡/\\,0ƖᄅƐㄣϛ9ㄥ86";

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "flip",
  description: "flips a coin or message",
  category: "FUN",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    minArgsCount: 1,
    subcommands: [
      {
        trigger: "coin",
        description: "flips a coin heads or tails",
      },
      {
        trigger: "text <input>",
        description: "reverses the given message",
      },
    ],
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "coin",
        description: "flip a coin",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "text",
        description: "reverses the given message",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "input",
            description: "text to flip",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    const sub = args[0].toLowerCase();

    if (sub === "coin") {
      const items = ["HEAD", "TAIL"];
      const toss = items[Math.floor(Math.random() * items.length)];

      message.channel.send({ embeds: [firstEmbed(message.author)] }).then((coin) => {
        // 2nd embed
        setTimeout(() => {
          coin.edit({ embeds: [secondEmbed()] }).catch(() => {});
          // 3rd embed
          setTimeout(() => {
            coin.edit({ embeds: [resultEmbed(toss)] }).catch(() => {});
          }, 2000);
        }, 2000);
      });
    }

    //
    else if (sub === "text") {
      if (args.length < 2) return message.channel.send("🥺 *susurra tímidamente* ¿Podrías darme algo de texto para voltear? 🌸💭");
      const input = args.slice(1).join(" ");
      const response = await flipText(input);
      await message.safeReply(`✨ *voltea el texto mágicamente* 🌙\n\`${response}\``);
    }

    // else
    else await message.safeReply("🥺 *se confunde* Hmm... ¿cómo quieres que use este comando? Intenta 'coin' o 'text' por favor~ 💭✨");
  },

  async interactionRun(interaction) {
    const sub = interaction.options.getSubcommand("type");

    if (sub === "coin") {
      const items = ["HEAD", "TAIL"];
      const toss = items[Math.floor(Math.random() * items.length)];
      await interaction.followUp({ embeds: [firstEmbed(interaction.user)] });

      setTimeout(() => {
        interaction.editReply({ embeds: [secondEmbed()] }).catch(() => {});
        setTimeout(() => {
          interaction.editReply({ embeds: [resultEmbed(toss)] }).catch(() => {});
        }, 2000);
      }, 2000);
    }

    //
    else if (sub === "text") {
      const input = interaction.options.getString("input");
      const response = await flipText(input);
      await interaction.followUp(`✨ *voltea el texto mágicamente* 🌙\n\`${response}\``);
    }
  },
};

const firstEmbed = (user) =>
  new EmbedBuilder().setColor(EMBED_COLORS.BOT_EMBED).setDescription(`🌙 *susurra* ${user.username}, vamos a lanzar una monedita~ ✨`);

const secondEmbed = () => new EmbedBuilder().setColor(EMBED_COLORS.BOT_EMBED).setDescription("🪙 *la moneda gira en el aire mágicamente* 💫");

const resultEmbed = (toss) =>
  new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(`🎉 **${toss === "HEAD" ? "¡CARA" : "¡CRUZ"} gana!** 🥺✨\n*${toss === "HEAD" ? "uwu qué suerte~" : "ohh~ interesante"}* 🌸`)
    .setImage(toss === "HEAD" ? "https://i.imgur.com/HavOS7J.png" : "https://i.imgur.com/u1pmQMV.png");

async function flipText(text) {
  let builder = "";
  for (let i = 0; i < text.length; i += 1) {
    const letter = text.charAt(i);
    const a = NORMAL.indexOf(letter);
    builder += a !== -1 ? FLIPPED.charAt(a) : letter;
  }
  return builder;
}
