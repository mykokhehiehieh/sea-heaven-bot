const { fieldMessage } = require('../../Fishing/fishing.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('field')
		.setDescription('view the field'),
	async execute(interaction) {
		await interaction.reply(fieldMessage());
	},
};