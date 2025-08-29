const userInfo = require("../shared/user");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "userinfo",
  description: "shows information about the user",
  category: "INFORMATION",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "[@member|id]",
    aliases: ["uinfo", "memberinfo"],
  },

  async messageRun(message, args) {
    let response;
    try {
      const target = args.length > 0 ? await message.guild.resolveMember(args[0]) : message.member;
      response = target
        ? userInfo(target)
        : "🥺 *susurra confundida* No puedo encontrar a esa persona... ¿está en este servidor? 💭🌸";
    } catch (e) {
      response = "🥺 *susurra confundida* No puedo encontrar a esa persona... ¿está en este servidor? 💭🌸";
    }
    await message.safeReply(response);
  },
};
