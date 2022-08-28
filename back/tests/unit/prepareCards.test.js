import {DeckGenerator} from "../../DeckGenerator";
const deckGenerator = new DeckGenerator;

test("Test for correct generated deck", () => {
  expect(Array.isArray(deckGenerator.prepareCards(2, 5))).toBe(true)
});
