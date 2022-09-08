module.exports = class Player {
    constructor(id, name, index) {
        this.id = id;
        this.name = name;
        this.index = index;
    }

    getPlayerInfo() {
        return {
            "id": this.id,
            "name": this.name
        }
    }
}
