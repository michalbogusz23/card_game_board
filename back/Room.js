module.exports = class Room {
    constructor(roomId, capacity) {
        this.id = roomId;
        this.capacity = capacity
        this.players = new Map();
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }
}