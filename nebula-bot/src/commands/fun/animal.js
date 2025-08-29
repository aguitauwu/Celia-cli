const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { MESSAGES, EMBED_COLORS } = require("@root/config.js");
const { getJson } = require("@helpers/HttpUtils");

const animals = ["cat", "dog", "panda", "fox", "red_panda", "koala", "bird", "raccoon", "kangaroo"];
const BASE_URL = "https://some-random-api.com/animal";

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "animal",
  description: "shows a random animal image",
  cooldown: 5,
  category: "FUN",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<type>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "name",
        description: "animal type",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: animals.map((animal) => ({ name: animal, value: animal })),
      },
    ],
  },

  async messageRun(message, args) {
    const choice = args[0];
    if (!animals.includes(choice)) {
      return message.safeReply(`🥺 *susurra tímidamente* Ese animalito no lo conozco... ¿podrías elegir uno de estos? 🌸\n${animals.join(", ")} ✨💭`);
    }
    const response = await getAnimal(message.author, choice);
    return message.safeReply(response);
  },

  async interactionRun(interaction) {
    const choice = interaction.options.getString("name");
    const response = await getAnimal(interaction.user, choice);
    await interaction.followUp(response);
  },
};

async function getAnimal(user, choice) {
  const response = await getJson(`${BASE_URL}/${choice}`);
  if (!response.success) return MESSAGES.API_ERROR;

  const imageUrl = response.data?.image;
  let kawaii_messages = [
    "🌸 *susurra* ¡Mira qué ${choice} tan adorable! uwu ✨",
    "💫 *se emociona tímidamente* ¿No es precioso este ${choice}? 🥺",
    "🌙 *whispers* Este ${choice} me da mucha ternura~ 💭"
  ];
  
  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(kawaii_messages[Math.floor(Math.random() * kawaii_messages.length)].replace('${choice}', choice))
    .setImage(imageUrl)
    .setFooter({ text: `🌸 Pedido por ${user.tag} con mucho amor~ ✨` });

  return { embeds: [embed] };
}
