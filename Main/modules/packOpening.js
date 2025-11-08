const Player = require('./Player');

class PackOpening{

    static async GenerateRandomPlayerByRating(rating){

        let players = await Player.RetrievePlayersByRating(rating);

        if(players.length == 1){
            return await Player.ReplaceIfPromo(players[0]);
        }
        else if(players.length > 0){
            let playerNumber = generateRandomNumber(0,players.length-1)
            let playerToReturn = players[playerNumber];
            playerToReturn = await Player.ReplaceIfPromo(playerToReturn);

            return playerToReturn;
        }
        else{
            console.error('No players available for request of rating' + rating)
            console.error('packOpeningjs::GenerateRandomPlayerByRating')
            return null;
        }

    }

    static async GenerateNonEliteSpecial(){
        let players = await Player.RetrievePackablePromoPlayers(75,84);

        if(players.length == 1){
            return players[0];
        }
        else if(players.length > 0){
            let playerNumber = generateRandomNumber(0,players.length-1)
            return players[playerNumber];
        }
        else{
            console.error('No players available for request card type: Non Special Elite')
            console.error('packOpeningjs::GenerateNonEliteSpecial')
            if(generateRandomNumber(1,2) == 1){
                console.error('Returning Elite player instead')
                return await this.GenerateElite();
            }
            else{
                console.error('Returning 84 rated player instead')
                return await this.GenerateRandomPlayerByRating(84);
            }

        }
    }

    static async GeneratePromoElitePlayer(){
        let players = await Player.RetrievePackablePromoPlayers(85,99);

        if(players.length == 1){
            return players[0];
        }
        else if(players.length > 0){
            let playerNumber = generateRandomNumber(0,players.length-1)
            return players[playerNumber];
        }
        else{
            console.error('No players available for request card type: Promo Elite')
            console.error('packOpeningjs::GeneratePromoElitePlayer')
            console.error('Returning Elite player instead')
            return await this.GenerateElite();
            }
    }

    static async GenerateRandomPlayerByCardType(cardTypeID){
        let players = await Player.RetrievePlayersByCardType(cardTypeID);
       
        if(players.length == 1){
            return await Player.ReplaceIfPromo(players[0]);
        }
        else if(players.length > 0){
            let playerNumber = generateRandomNumber(0,players.length-1)
            let playerToReturn = players[playerNumber];
            playerToReturn = await Player.ReplaceIfPromo(playerToReturn);

            return playerToReturn;
        }
        else{
            console.error('No players available for request card type:' + cardTypeID)
            console.error('packOpeningjs::GenerateRandomPlayerByCardType')

            if(cardTypeID == 7){
                console.error('POTW generated, returning Elite player instead')
                return await this.GenerateElite();
            }
            return null;
        }

    }

    static async GenerateElite(){
        let oddsGenerated = generateRandomNumber(1,100);
        if(oddsGenerated <= 30){
            return await PackOpening.GenerateRandomPlayerByRating(85);
        }
        else if(oddsGenerated <= 48 && oddsGenerated > 30){
            return await PackOpening.GenerateRandomPlayerByRating(86);
        }
        else if(oddsGenerated <= 57 && oddsGenerated > 48){
            return await PackOpening.GenerateRandomPlayerByRating(87);
        }
        else if(oddsGenerated <= 62 && oddsGenerated > 57){
            return await PackOpening.GenerateRandomPlayerByRating(88);
        }
        else if(oddsGenerated <= 65 && oddsGenerated > 62){
            return await PackOpening.GenerateRandomPlayerByRating(89);
        }
        else if(oddsGenerated <= 68 && oddsGenerated > 65){
            return await PackOpening.GenerateRandomPlayerByRating(90);
        }
        else if(oddsGenerated <= 70 && oddsGenerated > 68){
            return await PackOpening.GenerateRandomPlayerByRating(91);
        }
        else if(oddsGenerated <= 81 && oddsGenerated > 70){
            //Generate Promo
            return await PackOpening.GeneratePromoElitePlayer();
        }
        else if(oddsGenerated <= 90 && oddsGenerated > 81){
            return await PackOpening.GenerateRandomPlayerByCardType(7);
        }
        else if(oddsGenerated <= 97 && oddsGenerated > 90){
            return await PackOpening.GenerateRandomPlayerByCardType(4);
        }
        else if(oddsGenerated <= 100 && oddsGenerated > 97){
            return await PackOpening.GenerateRandomPlayerByCardType(5);
        }
    }

}

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function generateRandomNumbers(amount, min, max) {
    let numbers = [];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
}

module.exports = PackOpening;