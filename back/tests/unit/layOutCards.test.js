import {DeckGenerator} from "../../DeckGenerator";
import Room from "../../Room";
import {Makao} from "../../games/Makao";
//test for laying out cards

test("lay out cards", () => {
  const deckGenerator = new DeckGenerator()
  const room = new Room("1", 2, "makao");
  room.addPlayer("123", "kiwi");
  room.addPlayer("abc", "apple");
  const makao = new Makao(room, {to: () => { return {emit: () => null}}}, deckGenerator)
  const id = room.getPlayerIndex("123")
  console.log(makao.playersCards)
  const playerCard = makao.playersCards["123"][0]
  makao.layOutCards("123", [playerCard])
  expect(!makao.playersCards["123"].includes(playerCard)).toBe(true)
  expect(makao.board[0] === playerCard).toBe(true)
})
