module.exports = class Peer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getPlayerInfo() {
        return {
            "id": this.id,
            "name": this.name
        }
    }
}
