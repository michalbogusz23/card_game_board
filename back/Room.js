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
        const players = []
        this.players.forEach((player) => {
            players.push(player.getPlayerInfo())
        })
        return {
            "capacity": this.capacity,
            "game": this.game,
            "players": players
        }
    }
}
