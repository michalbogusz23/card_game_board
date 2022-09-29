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
    this.suitsChoice = ""
    this.demand = ""
    this.demandScope = 0
    this.playersPaused = {}
    this.roundsToPause = 0
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
        suitsChoice: this.suitsChoice,
        demand: this.demand,
        amountOfCardsToCollect: this.amountOfCardsToCollect,
        playersPaused: this.playersPaused,
        roundsToPause: this.roundsToPause,
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
      this.playersPaused[player.id] = 0
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
    this.whichTurn = this.room.getNextPlayerId(playerId, this.playersPaused)
    this.clearOldRules(playerId)
    this.sendCardInfoToPlayers()
  }

  layOutCards(playerId, cards, demand="", choice="") {
    if (cards[0].value === "A" && !choice) {
      this.io.to(playerId).emit("chooseSuit")
    } else if (cards[0].value === "J" && !demand) {
      this.io.to(playerId).emit("chooseDemand")
    } else {
      this.gameRules(playerId, cards, demand, choice)
    }

  }

  gameRules(playerId, cards, demand="", choice="") {
    this.playersCards[playerId] = this.playersCards[playerId].filter((playerCard) => {
      for (const card of cards) {
        if ((playerCard.value === card.value) && (playerCard.suit === card.suit)) return false
      }
      return true
    })
    this.stack.unshift(...this.board)
    this.board = cards

    this.clearOldRules(playerId)
    if(cards.size === 0 && this.roundsToPause > 0) {
      this.playersPaused[playerId] = this.roundsToPause
    }
    if(this.playersPaused[playerId]) {
      this.sendCardInfoToPlayers()
      return
    }
    if (cards[0].value in ["2", "3"]) this.amountOfCardsToCollect += parseInt(cards[0].value)
    if (cards[0].value === "K" && cards[0].suit in ["hearts", "spades"]) {
      this.amountOfCardsToCollect += 5
      if (cards[0].suit === "spades") this.whichTurn = this.room.getPreviousPlayerId(playerId, this.playersPaused)
    }
    if (cards[0].value === "4") {
      const playerToPause = this.room.getNextPlayerId(playerId, {})
      this.playersPaused[playerToPause] ++
    }
    if(demand) {
      this.demand = demand
      this.demandScope = this.playersNumber
    }
    if(choice) this.suitsChoice = choice
    this.whichTurn = this.room.getNextPlayerId(playerId, this.playersPaused)

    this.sendCardInfoToPlayers()
  }

  clearOldRules(playerId) {
    this.suitsChoice = ""
    if(this.demandScope) this.demandScope--
    if(!this.demandScope) this.demand = ""
    const prevPlayer = this.room.getPreviousPlayerId(playerId, {})
    if(this.playersPaused[prevPlayer]) this.playersPaused[prevPlayer] --
  }

  choseCard(playerId, card) {
    if (this.playersCardsChosen[playerId] > 0) return false
    if (!this.canCardBePlayed(card)) return false
    this.playersCardsChosen[playerId].push(card)
    return true
  }

  canCardBePlayed(card) {
    if (this.isPenaltyCard(this.board.at(-1)) && this.isPenaltyCard(card)) return false
    if (this.demand)
      return card.value === this.demand || card.value === "J";
    if (this.suitsChoice)
      return card.suit === this.suitsChoice || card.value === "A";
    if(this.roundsToPause)
      return card.value === "4"
    return this.board.at(-1).value === card.value
          || this.board.at(-1).suit === card.suit
  }

  isPenaltyCard(card) {
    return card.value in ["2", "3"] || (card.value === "K" && card.suit in ["hearts", "spades"])
  }
}

module.exports = {
  Makao,
};
