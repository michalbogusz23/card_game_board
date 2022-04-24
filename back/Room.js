module.exports = class Room {
    constructor(roomId, capacity, io) {
        this.id = roomId;
        this.capacity = capacity
        this.players = new Map();
        this.io = io;
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }
}