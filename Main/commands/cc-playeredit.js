const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const CardType = require('../modules/cardType.js');

const leagueValues = [
  { name: 'Premier League', value: 'Premier League' },
  { name: 'Ligue 1', value: 'Ligue 1' },
  { name: 'La Liga', value: 'La Liga' },
  { name: 'Bundesliga', value: 'Bundesliga' },
  { name: 'Serie A', value: 'Serie A' },
  { name: 'Süper Lig', value: 'Süper Lig' },
  { name: 'Liga Portugal', value: 'Liga Portugal' },
  { name: 'Pro League', value: 'Pro League' },
  { name: 'Eredivisie', value: 'Eredivisie' },
  { name: 'Major League Soccer', value: 'Major League Soccer' },
  { name: 'A-League Men', value: 'A-League Men' },
  { name: 'Premier Division', value: 'Premier Division' },
  { name: 'Liga F', value: 'Liga F' },
  { name: 'Women\'s Super League', value: 'Women\'s Super League' },
  { name: 'Division 1 Féminine', value: 'Division 1 Féminine' },
  { name: 'GPFBL', value: 'GPFBL' },
  { name: 'National Women\'s Soccer League', value: 'National Women\'s Soccer League' },
  { name: 'Serie A Femminile', value: 'Serie A Femminile' },
  { name: 'Women\'s Premier League', value: 'Women\'s Premier League' },
  { name: 'None', value: 'None' },
  { name: 'Birthday', value: 'Birthday' },
  { name: 'Icon', value: 'Icon' },
];


module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-edit')
        .setDescription('Edit your player upgrades')
        .addStringOption(
            option => option.setName('name')
            .setDescription('Player of the name you own who you want to upgrade')
            .setRequired(true)
        )
        .addIntegerOption(
            option => option
            .setName('upgrade')
            .setDescription('The rating upgrade or downgrade')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('position')
            .setDescription('1 to add random adjacent position, 2 to remove all positions, or provide a specific one to be added')
            .setRequired(false)
            .setMaxLength(3)
        )
        .addStringOption(
            option => option.setName('team')
            .setDescription('Switch the Team of the player (please use the same teams as other players)')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('league')
            .setDescription('Switch the League of the player (please use the same leagues as other players)')
            .setRequired(false)
            .addChoices(leagueValues)
        )
        .addStringOption(
            option => option.setName('nation')
            .setDescription('Switch the Nation of the player (please use the same nations as shown in #bot-guide')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('cardtype')
            .setDescription('Switch the Card Type of the player')
            .setRequired(false)
            .addChoices(CardType.CARD_TYPE_VALUES)
        )
        .addStringOption(
            option => option.setName('notes')
            .setDescription('A note to put onto the player')
            .setRequired(false)
        )        
,
    async execute(interaction) {
        let upgrade = interaction.options.getInteger("upgrade");
        let name = interaction.options.getString("name");
        let position = interaction.options.getString("position");
        let teamToChangeTo = interaction.options.getString("team");
        let league = interaction.options.getString("league");
        let nation = interaction.options.getString("nation");
        let cardType = interaction.options.getString("cardtype");
        let notes = interaction.options.getString("notes");
        let username = interaction.user.username;
        let player;
        team = await Team.RetrieveTeamByUser(username);
        if(!upgrade && !position && !teamToChangeTo && !league && !cardType && !notes && !nation){
            return interaction.followUp('You must provide at least an upgrade or a position to edit for ' + name);
        }
        if(upgrade){
            player = await Team.EditPlayerUpgrade(team,name,upgrade);
        }
        if(position){
            player = await Team.EditPlayerPosition(team,name,position);
        }

        if(teamToChangeTo){
            player = await Team.EditPlayerTeamOrLeagueOrNote(team,name,"Team",teamToChangeTo);
        }

        if(league){
            player = await Team.EditPlayerTeamOrLeagueOrNote(team,name,"League",league);
        }

        if(nation){
            player = await Team.EditPlayerTeamOrLeagueOrNote(team,name,"Nation",nation);
        }

        if(cardType){
            player = await Team.EditPlayerTeamOrLeagueOrNote(team,name,"CardType",cardType);
        }

        if(notes){
            player = await Team.EditPlayerTeamOrLeagueOrNote(team,name,"Notes",notes);
        }

        if(player){
            return interaction.followUp(`The player was edited successfully in your team, these are the new details: \n ${await player.stringify()}`);
        }
        return interaction.followUp('Unable to edit the player upgrade for ' + name);
    },
};