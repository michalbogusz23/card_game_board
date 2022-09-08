const Player = require("./Player");

module.exports = class Room {
    constructor(roomId, capacity, game) {
        this.id = roomId;
        this.capacity = parseInt(capacity)
        this.game = game
        this.players = new Map();
    }

    addPlayer(id, username) {
        if (this.players.size >= this.capacity)
           throw new Error(`Room ${this.id} already full`)
        const player = new Player(id, username, this.players.size)
        this.players.set(id, player);
    }

    getNextPlayerId(playerId) {
        const playerIndex = this.players.get(playerId)?.index
        if(playerIndex === undefined) return null

        const nextPlayerIndex = (playerIndex + 1) % this.players.size
        let nextPlayerId = null
        this.players.forEach((player) => {
            if(player.index === nextPlayerIndex) nextPlayerId = player.id
        })
        return nextPlayerId
    }

    getPreviousPlayerId(playerId) {
        const player = this.players.get(playerId)
        if (player === undefined) return null
        const previousPlayerIndex = player.index === 0 ? this.players.size - 1 : player.index - 1
        let previousPlayerId = null
        this.players.forEach((player) => {
            if (player.index === previousPlayerIndex) previousPlayerId = player.id
        })
        return previousPlayerId
    }

    getFirstPlayerId() {
        let firstPlayerId = null
        this.players.forEach((player) => {
            if(player.index === 0) firstPlayerId = player.id
        })
        return firstPlayerId
    }

    isFull() {
        return this.capacity === this.players.size
    }

    getRoomInfo() {
        return {
            "capacity": this.capacity,
            "game": this.game,
            "players": this.getPlayers()
        }
    }

    getPlayers() {
        const players = {}
        this.players.forEach((player) => {
            const playerInfo = player.getPlayerInfo()
            players[playerInfo.id] = playerInfo
        })
        return players;
    }
    getPlayerIndex(playerId) {
        return this.players.get(playerId).index
    }
}
