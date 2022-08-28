import {Makao} from "../../games/Makao";
import {DeckGenerator} from "../../DeckGenerator";

const room = {
  "id": "185027",
  "capacity": 2,
  "game": "makao",
  "players": new Map()
}
room.players.set("Boo9xA_Mc3bUMWcBAAAH", {"id": "Boo9xA_Mc3bUMWcBAAAH", "name": "Michal"})
room.players.set("ny2yJAc90eByQsbbAAAJ", {"id": "ny2yJAc90eByQsbbAAAJ", "name": "Michas"})
const deckGenerator = new DeckGenerator()
const makao = new Makao(room, {}, deckGenerator);

test("Test for correct generated deck", () => {
  expect(Array.isArray(deckGenerator.prepareCards(2, 5))).toBe(true)
});
