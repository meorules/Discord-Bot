const { AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const answers = require('./players'); // array of player names (variable length)

// ------------------- Utility Functions -------------------

function getRandomAnswer() {
    const index = Math.floor(Math.random() * answers.length);
    return answers[index].toUpperCase();
}

function isValidGuess(guess, answerLength) {
    if (!guess) return false;
    if (answerLength && guess.length !== answerLength) return false;
    return answers.includes(guess.toUpperCase());
}

function getTodaysDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}

// ------------------- CSV Handling -------------------

const CSV_PATH = path.join(__dirname, 'data.csv');

function ensureCSV() {
    if (!fs.existsSync(CSV_PATH)) {
        const header = ['user','wordOfTheDay','canGuess','lastGuessDate','guesses','wins','games','hasCompletedToday'];
        fs.writeFileSync(CSV_PATH, header.join(',') + '\n', 'utf8');
    }
}

function loadCSV() {
    ensureCSV();
    const content = fs.readFileSync(CSV_PATH, 'utf8');
    if (!content) return [];
    return content
        .trim()
        .split('\n')
        .map(line => line.split(','));
}

function saveCSV(data) {
    const csvContent = data.map(row => row.join(',')).join('\n');
    fs.writeFileSync(CSV_PATH, csvContent, 'utf8');
}

function getUserRow(username, data) {
    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === username) return i;
    }
    const newRow = [username, getRandomAnswer(), 'true', getTodaysDate(), '', '0', '0', 'false'];
    data.push(newRow);
    return data.length - 1;
}

// ------------------- Wordle Logic -------------------

function getGuessColors(guess, answer) {
    const result = Array(answer.length).fill(3); // 1=green, 2=yellow, 3=gray
    const usedAnswerIndices = new Set();

    // First pass: green
    for (let i = 0; i < answer.length; i++) {
        if (guess[i] === answer[i]) {
            result[i] = 1;
            usedAnswerIndices.add(i);
        }
    }

    // Second pass: yellow
    for (let i = 0; i < answer.length; i++) {
        if (result[i] === 1) continue;
        for (let j = 0; j < answer.length; j++) {
            if (!usedAnswerIndices.has(j) && guess[i] === answer[j]) {
                result[i] = 2;
                usedAnswerIndices.add(j);
                break;
            }
        }
    }

    return result;
}

// ------------------- Canvas Drawing -------------------

async function drawBoard(guesses, answer) {
    const maxBoardWidth = 330;
    const bufferGap = 5;
    const rows = 6;

    // Dynamically calculate square size based on answer length
    let squareSize = Math.floor((maxBoardWidth - (answer.length - 1) * bufferGap) / answer.length);
    const minSquareSize = 30; // avoid tiny squares
    if (squareSize < minSquareSize) squareSize = minSquareSize;

    const canvasWidth = answer.length * squareSize + (answer.length - 1) * bufferGap;
    const canvasHeight = rows * (squareSize + bufferGap);

    const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Load images
    const background = await Canvas.loadImage(path.join(__dirname, 'images', 'BlankImage.png'));
    const emptySquare = await Canvas.loadImage(path.join(__dirname, 'images', 'EmptySquare.png'));
    const absentSquare = await Canvas.loadImage(path.join(__dirname, 'images', 'ColorAbsent.png'));
    const greenSquare = await Canvas.loadImage(path.join(__dirname, 'images', 'GreenSquare.png'));
    const yellowSquare = await Canvas.loadImage(path.join(__dirname, 'images', 'YellowSquare.png'));

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#d7dadc';
    ctx.font = `${Math.floor(squareSize * 0.7)}px Clear Sans, Helvetica Neue, Arial, sans-serif`;

    let rowOffset = 0;

    for (let row = 0; row < rows; row++) {
        const guess = guesses[row] || '';
        const colors = getGuessColors(guess.padEnd(answer.length, ' '), answer);
        let xOffset = 0;

        for (let col = 0; col < answer.length; col++) {
            let square = emptySquare;
            if (colors[col] === 1) square = greenSquare;
            else if (colors[col] === 2) square = yellowSquare;
            else if (colors[col] === 3 && guess[col]) square = absentSquare;

            ctx.drawImage(square, xOffset, rowOffset, squareSize, squareSize);

            if (guess[col]) {
                ctx.fillText(guess[col], xOffset + squareSize / 2, rowOffset + squareSize * 0.7);
            }

            xOffset += squareSize + bufferGap;
        }

        rowOffset += squareSize + bufferGap;
    }

    return new AttachmentBuilder(canvas.toBuffer(), { name: 'wordle.png' });
}

// ------------------- Game Functions -------------------

async function LoadNewWordle(interaction) {
    const data = loadCSV();
    const userIndex = getUserRow(interaction.user.username, data);
    const row = data[userIndex];

    if (row[3] === getTodaysDate() && row[7] === 'true') {
        return interaction.followUp("You have already played today. Come back tomorrow!");
    }

    row[1] = getRandomAnswer();
    row[3] = getTodaysDate();
    row[4] = '';
    row[7] = 'false';

    saveCSV(data);

    const attachment = await drawBoard([], row[1]);
    await interaction.editReply({ files: [attachment] });
}

async function PlayWordle(interaction) {
    const data = loadCSV();
    const userIndex = getUserRow(interaction.user.username, data);
    const row = data[userIndex];

    if (row[7] === 'true') return interaction.followUp("You have already completed today's game!");

    const guess = interaction.options.getString('guess');
    if (!isValidGuess(guess, row[1].length))
        return interaction.followUp(`Invalid guess. Must be a valid player name (${row[1].length} characters).`);

    let guesses = row[4] ? row[4].split(' ') : [];
    guesses.push(guess.toUpperCase());
    row[4] = guesses.join(' ');

    const attachment = await drawBoard(guesses, row[1]);

    // Check win
    if (guess.toUpperCase() === row[1]) {
        row[6] = (parseInt(row[6] || 0) + 1).toString(); // wins
        row[5] = (parseInt(row[5] || 0) + 1).toString(); // games
        row[7] = 'true';
        saveCSV(data);

        await interaction.editReply({ files: [attachment] });
        return interaction.followUp(`🎉 Congratulations! You guessed the word in ${guesses.length} tries!`);
    }

    // Max attempts reached
    if (guesses.length >= 6) {
        row[5] = (parseInt(row[5] || 0) + 1).toString(); // games
        row[7] = 'true';
        saveCSV(data);

        await interaction.editReply({ files: [attachment] });
        return interaction.followUp(`Game over! The correct word was **${row[1]}**.`);
    }

    // Game still in progress
    saveCSV(data);
    await interaction.editReply({ files: [attachment] });
}

function ShowWordleStats(interaction) {
    const data = loadCSV();
    const userIndex = getUserRow(interaction.user.username, data);
    const row = data[userIndex];

    const wins = parseInt(row[6] || 0);
    const games = parseInt(row[5] || 0);
    const winRate = games > 0 ? Math.round((wins / games) * 100) : 0;

    interaction.followUp(`Stats for ${interaction.user.username}:\nGames Played: ${games}\nWin Rate: ${winRate}%`);
}

// ------------------- Exports -------------------

module.exports = {
    LoadNewWordle,
    PlayWordle,
    ShowWordleStats
};
