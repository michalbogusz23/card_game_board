class Makao {
  constructor(room, io, deckGenerator) {
    this.room = room;
    this.io = io;
    this.playersNumber = room.players.size
    const [playersCards, stack] = deckGenerator.prepareCards(this.playersNumber,5)
    this.playersCards = playersCards
    this.stack = stack
    this.linkPlayerCardsWithPlayer()
    this.sendCardInfoToPlayers()
  }

  sendCardInfoToPlayers() {
    const playersId = []
    this.room.players.forEach((player) => {
      playersId.push(player.id)
    })
    playersId.forEach((playerId) => {
      const xd = Object.entries(this.playersCards).map(([id, playerCards]) => {
        this.preparePlayerDeckToSend(playerId, id, playerCards)
      })
      const myobj = {
        players: {
          xd
        },
        stack: {cards: this.stack.length}
      }
      console.log(myobj)
      // this.io.to(playerId).emit()
    })
  }

  linkPlayerCardsWithPlayer() {
    let i = 0
    const cards = {}
    this.room.players.forEach((player) => {
      cards[player.id] = this.playersCards[i];
      i++;
    })
    this.playersCards = cards
  }

  preparePlayerDeckToSend(playerId, id, playerCards) {
    if(playerId === id) return playerCards
    return playerCards.map(() => null)
  }
}

module.exports = {
  Makao,
};
