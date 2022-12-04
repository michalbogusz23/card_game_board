class DeckGenerator {
  constructor() {
    this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.suits = ["spades", "diamonds", "clubs", "hearts"];
    this.deck = [];
  }

  prepareCards(numOfPlayers, cardsPerPlayer) {
    this.deck = [];
    this.generateDeck();
    this.shuffle();
    let playersCards = [];
    for (let i = 0; i < numOfPlayers; i++) {
      playersCards.push(
        this.deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer)
      );
    }
    playersCards[0].push({ value: "A", suit: "spades", chosen: false })
    playersCards[0].push({ value: "J", suit: "spades", chosen: false })
    playersCards[0].push({ value: "4", suit: "spades", chosen: false })
    playersCards[1].push({ value: "J", suit: "hearts", chosen: false })
    const stack = this.deck.slice(numOfPlayers * cardsPerPlayer - 1, -1);
    stack.push({ value: "5", suit: "spades", chosen: false })
    return [playersCards, stack];
  }

  generateDeck() {
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        const card = { value, suit, chosen: false }
        this.deck.push(card);
      })
    })
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

}

module.exports = {
  DeckGenerator,
};
