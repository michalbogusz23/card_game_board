module.exports = class Peer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getPlayerInfo() {
        return {
            "name": this.name
        }
    }
}