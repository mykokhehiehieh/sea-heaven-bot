const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('babi')
		.setDescription('testing'),
	async execute(interaction) {
		await interaction.reply(`${interaction.user.username} <:babi:808034870445867009>`);
	},
};