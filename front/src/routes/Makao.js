import React from "react";
import { Player } from "../Player";
import { prepareCards } from "../Deck.js";
import "./war.css";
import { MakaoBoard } from "./MakaoBoard";

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    let preparedCards = prepareCards(4, 5);
    const cardOnTable = new Array(preparedCards[1].pop());
    this.state = {
      player_cards: preparedCards[0],
      cardsOnTable: cardOnTable,
      stack: preparedCards[1],
      rules: {
        whoseTurn: 0,
        demand: null,
        colorChange: null,
        penalty: null,
        stop: null,
      },
    };
  }
  handleLayOutClick(i) {
    let player_cards = this.state.player_cards.slice();
    const stack = this.state.stack.slice();
    const cardsOnTable = this.state.cardsOnTable.slice();

    let cardsToDraw = player_cards[i].filter((card) => card.chosen);
    const cardsToStay = player_cards[i].filter((card) => !card.chosen);
    player_cards[i] = cardsToStay;
    cardsToDraw = cardsToDraw.map((card) => {
      card.chosen = false;
      return card;
    });
    this.setState({
      player_cards: player_cards,
      cardsOnTable: cardsToDraw,
      stack: stack.concat(cardsOnTable),
    });
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
    )
      return true;
    return false;
  }
  render() {
    return (
      <div className="table">
        <Player
          cards={this.state.player_cards[0]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(0)}
          onCollectClick={() => this.handleCollectCklick(0)}
          onCardClick={(i) => this.handleCardClick(0, i)}
          rules={this.state.rules}
        />
        <Player
          cards={this.state.player_cards[1]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(1)}
          onCollectClick={() => this.handleCollectCklick(1)}
          onCardClick={(i) => this.handleCardClick(1, i)}
          rules={this.state.rules}
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
          onCollectClick={() => this.handleCollectCklick(3)}
          onCardClick={(i) => this.handleCardClick(2, i)}
          rules={this.state.rules}
        />
        <Player
          cards={this.state.player_cards[3]}
          clickable={true}
          onLayOutClick={() => this.handleLayOutClick(3)}
          onCollectClick={() => this.handleCollectCklick(3)}
          onCardClick={(i) => this.handleCardClick(3, i)}
          rules={this.state.rules}
        />
      </div>
    );
  }
}
