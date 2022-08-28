const {Makao} = require("./Makao");
const {War} = require("./War");

class GameProvider {
  constructor(room, io, deckGenerator) {
    switch (room.game) {
      case "makao":
        return new Makao(room, io, deckGenerator);
      case "war":
        return new War(room, io, deckGenerator);
      default:
        throw new Error("Game name not correct");
    }
  }
}

module.exports = {
  GameProvider,
};
