class Makao {
  constructor(room, io, deckGenerator) {
    this.room = room;
    this.io = io;
    this.playersNumber = room.players.size
    let [playersCards, stack] = deckGenerator.prepareCards(this.playersNumber,5)
    this.board = [stack.pop()]
    this.playersCards = playersCards
    this.playersCardsChosen = {}
    this.stack = stack
    this.whichTurn = room.getFirstPlayerId()
    this.amountOfCardsToCollect = 1
    this.linkPlayerCardsWithPlayer()
    this.sendCardInfoToPlayers()
  }

  sendCardInfoToPlayers() {
    const playersId = []
    this.room.players.forEach((player) => {
      playersId.push(player.id)
    })
    playersId.forEach((playerId) => {
      const cardsToSend = Object.fromEntries(Object.entries(this.playersCards).map(([id, playerCards]) => {
        return [id, this.preparePlayerDeckToSend(playerId, id, playerCards)]
      }))
      const gameInfoForPlayer = {
        players: cardsToSend,
        stack: {cards: this.stack.length},
        board: this.board,
        whichTurn: this.whichTurn,
      }
      this.io.to(playerId).emit("cardsOnTable", gameInfoForPlayer)
    })
  }

  linkPlayerCardsWithPlayer() {
    let i = 0
    const cards = {}
    this.room.players.forEach((player) => {
      cards[player.id] = this.playersCards[i];
      i++;
      this.playersCardsChosen[player.id] = []
    })
    this.playersCards = cards
  }

  preparePlayerDeckToSend(playerId, id, playerCards) {
    if(playerId === id) return playerCards
    return playerCards.map(() => null)
  }

  collectCards(playerId) {
    const playerCards = this.playersCards[playerId]
    const cardsToCollect = this.stack.splice(-this.amountOfCardsToCollect, this.amountOfCardsToCollect)
    playerCards.push(...cardsToCollect)
    this.amountOfCardsToCollect = 1
    this.whichTurn = this.room.getNextPlayerId(playerId)
    this.sendCardInfoToPlayers()
  }

  layOutCards(playerId, cards) {
    this.playersCards[playerId] = this.playersCards[playerId].filter((playerCard) => {
      for (const card of cards) {
        if ((playerCard.value === card.value) && (playerCard.suit === card.suit)) return false
      }
      return true
    })
    this.stack.unshift(...this.board)
    this.board = cards
    this.whichTurn = this.room.getNextPlayerId(playerId)
    this.sendCardInfoToPlayers()
  }

  choseCard(playerId, card) {
    if (this.board.at(-1).value === card.value || this.board.at(-1).suit === card.suit) {
      this.playersCardsChosen[playerId].push(card)
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  Makao,
};
