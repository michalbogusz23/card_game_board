module.exports = class Room {
    constructor(roomId, capacity, game) {
        this.id = roomId;
        this.capacity = capacity
        this.game = game
        this.players = new Map();
    }

    addPlayer(player) {
        if (this.players.size >= this.capacity)
           throw new Error(`Room ${this.id} already full`)
        this.players.set(player.id, player);
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
}
