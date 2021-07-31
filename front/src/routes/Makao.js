import React from "react";
import { Player } from "../Player";
import { prepareCards } from "../Deck.js";
import "./war.css";
import { MakaoBoard } from "./MakaoBoard";

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    let preparedCards = prepareCards(4, 5);
    const cardsOnTable = this.chooseCardOnTable(preparedCards[1])
    this.state = {
      player_cards: preparedCards[0],
      cardsOnTable: cardsOnTable[0],
      stack: cardsOnTable[1],
      rules: {
        whoseTurn: 0,
        demand: null,
        colorChange: null,
        penalty: 1,
        stop: null,
      },
    };
  }
  handleLayOutClick(player) {
    let player_cards = this.state.player_cards.slice();
    const stack = this.state.stack.slice();
    const cardsOnTable = this.state.cardsOnTable.slice();

    let cardsToDraw = player_cards[player].filter((card) => card.chosen);
    const cardsToStay = player_cards[player].filter((card) => !card.chosen);
    player_cards[player] = cardsToStay;
    cardsToDraw = cardsToDraw.map((card) => {
      card.chosen = false;
      return card;
    });
    this.setState({
      player_cards: player_cards,
      cardsOnTable: cardsToDraw,
      stack: stack.concat(cardsOnTable),
    });
    this.changeTurn(cardsToDraw.slice(-1)[0])
    this.applySpecialCards(cardsToDraw.slice(-1)[0])
  }
  handleCollectClick(player) {
    let playerCards = this.state.player_cards.slice()
    let stack = this.state.stack.slice()
    const cardToCollect = this.state.rules.penalty
    for(let i = 0; i < cardToCollect; i++) {
      playerCards[player].push(stack.pop())
    }
    this.setState({
      player_cards: playerCards,
      stack: stack
    })
    this.changeTurn()
  }
  handleCardClick(player, i) {
    const player_card = this.state.player_cards[player][i];
    const board_card = this.state.cardsOnTable.slice(-1)[0];
    if (this.canBePlayed(board_card, player_card)) {
      let player_cards = this.state.player_cards.slice();
      player_cards[player][i].chosen = !player_cards[player][i].chosen;
      this.setState({ player_cards: player_cards });
    } else {
      return undefined;
    }
  }
  applySpecialCards(card) {
    let rules = this.state.rules
    if(this.isPenalty(card)) {
      console.log('siema ściema')
      if(card.value === "K") {
        rules.penalty += 5
      }
      rules.penalty += parseInt(rules.penalty)
    } else if (card.value === "J") {
      ;
    } else if (card.value === "A") { 
      ;
    } else if (card.value === "4") {
      rules.stop += 1
    }
    this.setState({rules: rules})
  }
  changeTurn(card=null) {
    const currentTurn = this.state.rules.whoseTurn;
    const amountOfPlayers = this.state.player_cards.length;
    let turn;
    if(card && card.value === "K" && card.suit === "spades") {
      turn = currentTurn === 0 ? amountOfPlayers - 1 : currentTurn - 1
    } else {
      turn = currentTurn === amountOfPlayers - 1 ? 0 : currentTurn + 1
    }
    let rules = this.state.rules
    rules.whoseTurn = turn
    this.setState({rules: rules})
  }
  canBePlayed(board, player) {
    if (board.value === player.value || board.suit === player.suit) {
      if (
        (this.isPenalty(board) && !this.isPenalty(player)) ||
        (board.value === "4" && player.value !== "4")
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  isPenalty(card) {
    if (
      ["2", "3"].includes(card.value) ||
      (["hearts", "spades"].includes(card.suit) && card.value === "K")
    ) {
      return true;
    }
    return false;
  }
  chooseCardOnTable(cards) {
    let stack = cards
    const cardOnTable = new Array(stack.find(card => !["2","3","J","A","K"].includes(card.value)));
    return [cardOnTable, stack.filter(card => card !== cardOnTable[0])]
  }
  render() {
    return (
      <div className="table">
        <Player
          cards={this.state.player_cards[0]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(0)}
          onCollectClick={() => this.handleCollectClick(0)}
          onCardClick={(i) => this.handleCardClick(0, i)}
          rules={this.state.rules}
          playerNo={0}
        />
        <Player
          cards={this.state.player_cards[1]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(1)}
          onCollectClick={() => this.handleCollectClick(1)}
          onCardClick={(i) => this.handleCardClick(1, i)}
          rules={this.state.rules}
          playerNo={1}
        />
        <MakaoBoard
          stack={this.state.stack}
          cardsOnTable={this.state.cardsOnTable}
          rules={this.state.rules}
        />
        <Player
          cards={this.state.player_cards[2]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(2)}
          onCollectClick={() => this.handleCollectClick(2)}
          onCardClick={(i) => this.handleCardClick(2, i)}
          rules={this.state.rules}
          playerNo={2}
        />
        <Player
          cards={this.state.player_cards[3]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(3)}
          onCollectClick={() => this.handleCollectClick(3)}
          onCardClick={(i) => this.handleCardClick(3, i)}
          rules={this.state.rules}
          playerNo={3}
        />
      </div>
    );
  }
}
