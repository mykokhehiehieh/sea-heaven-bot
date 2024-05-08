const { shoot }= require('./../../Fishing/fishing.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Shoot fish')
        .addIntegerOption(option =>
            option
            .setName('token')
            .setDescription('How much tokens to fire at once (limit can be upgraded)')
        )
        .addStringOption(option =>
            option
            .setName('target')
            .setDescription('Targets which fish to shoot (random if not found)')
            .setChoices(
                {name: "Ikan Bilis", value: "ikanBilis"},
                {name: "Tilapia", value: "tilapia"},
                {name: "Starfish", value: "starfish"},
                {name: "Seahorse", value: "seahorse"},
                {name: "Lobster", value: "lobster"},
                {name: "Jellyfish", value: "jellyfish"},
                {name: "Flying Fish", value: "flyingFish"},
                {name: "Turtle", value: "turtle"},
                {name: "Stingray", value: "stingray"},
                {name: "Fossil", value: "fossil"},
                {name: "Squid", value: "squid"},
                {name: "Lionfish", value: "lionfish"},
                {name: "Sunfish", value: "sunfish"},
                {name: "Anglerfish", value: "anglerFish"},
                {name: "Pink One", value: "pinkOne"},
                {name: "Crocodile", value: "crocodile"},
                {name: "Hammerfish", value: "hammerfish"},
                {name: "Dolphin", value: "dolphin"},
                {name: "Blue Whale", value: "blueWhale"},
                {name: "Red Whale", value: "redWhale"},
                {name: "Gold Whale", value: "goldWhale"},
                {name: "Pufferfish", value: "pufferfish"},
                {name: "Electric ball", value: "electricBall"},
                {name: "Octopus", value: "octopus"},
                {name: "Piranha", value: "piranha"},
            )
        ),
	async execute(interaction) {
		await interaction.reply(/*shoot(interaction.user.id, interaction.options.getInteger('token'), interaction.options.getString('target'))*/`${interaction.user.id} tried to shoot ${interaction.options.getString('target')} with ${interaction.options.getInteger('token')} <:pe:1217869006338396200>`);
	},
};