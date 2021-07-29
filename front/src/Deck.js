const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["spades", "diamonds", "clubs", "hearts"];

export function prepareCards(numOfPlayers, cardsPerPlayer=undefined) {
    const deck = getDeck();
    const shuffledDeck = shuffle(deck);
    let  playerCards = [];
    if(!cardsPerPlayer) {
        const cardsToDraw = 52 / numOfPlayers;
        for(let i = 0; i < numOfPlayers; i++) {
            playerCards.push(shuffledDeck.slice(i*cardsToDraw, (i+1)*cardsToDraw))
        }
        return playerCards
    } else {
        for(let i = 0; i < numOfPlayers; i++) {
            playerCards.push(shuffledDeck.slice(i*cardsPerPlayer, (i+1)*cardsPerPlayer))
        }
        const stack = shuffledDeck.slice(numOfPlayers*cardsPerPlayer-1, -1)
        return [playerCards, stack]
    }

}

function getDeck() {
	var deck = [];
	for(var i = 0; i < suits.length; i++) {
		for(var x = 0; x < values.length; x++) {
			var card = {value: values[x], suit: suits[i]};
			deck.push(card);
		}
	}
	return deck;
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}