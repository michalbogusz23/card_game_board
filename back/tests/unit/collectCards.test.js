import {DeckGenerator} from "../../DeckGenerator";
import Room from "../../Room";
import {Makao} from "../../games/Makao";

// test for collecting cards
test("collect cards", () => {
  const deckGenerator = new DeckGenerator()
  const room = new Room("1", 2, "makao");
  room.addPlayer("123", "kiwi");
  room.addPlayer("abc", "apple");
  const makao = new Makao(room, {to: () => { return {emit: () => null}}}, deckGenerator)
  expect(makao.playersCards["123"].length).toBe(5)
  expect(makao.stack.length).toBe(41)
  expect(makao.amountOfCardsToCollect).toBe(1)
  makao.collectCards("123")
  expect(makao.playersCards["123"].length).toBe(6)
  expect(makao.stack.length).toBe(40)
  expect(makao.amountOfCardsToCollect).toBe(1)
})
