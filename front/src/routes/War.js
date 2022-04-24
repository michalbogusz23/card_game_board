import React from "react";
import "./war.css";
import { prepareCards } from "../Deck.js";
import { shuffle } from "../Deck";
import { WarPlayer } from "../Player";
import { Board } from "../Board";


export default class War extends React.Component {
  constructor(props) {
    super(props);
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });
    this.state = {
      player_cards: prepareCards(2),
      ingame_cards: Array.from(Array(2), () => new Array(0)),
      topIsNext: true,
      canCollect: false,
      isWar: false,
    };
  }

  handleClick() {
    if (this.state.topIsNext) {
      this.drawCard(0);
    } else {
      this.drawCard(1);
    }
    const length0 = this.state.ingame_cards[0].length;
    const length1 = this.state.ingame_cards[1].length;
    if (length0 === length1) {
      if (
        this.state.ingame_cards[0][length0 - 1].value !==
          this.state.ingame_cards[1][length1 - 1].value &&
        !this.state.isWar
      ) {
        this.setState({
          canCollect: true,
        });
      } else {
        this.setState({ isWar: !this.state.isWar });
      }
    }
  }

  handleCollectClick() {
    const length0 = this.state.ingame_cards[0].length;
    const length1 = this.state.ingame_cards[1].length;
    if (
      this.state.ingame_cards[0][length0 - 1].value >
      this.state.ingame_cards[1][length1 - 1].value
    ) {
      this.collectCards(0);
    } else {
      this.collectCards(1);
    }
  }

  drawCard(player) {
    const ingame_cards = this.state.ingame_cards.slice();
    const player_cards = this.state.player_cards.slice();
    ingame_cards[player].push(player_cards[player].pop());
    this.setState({
      ingame_cards: ingame_cards,
      player_cards: player_cards,
      topIsNext: !this.state.topIsNext,
    });
  }

  collectCards(player) {
    const ingame_cards = this.state.ingame_cards.slice();
    const player_cards = this.state.player_cards.slice();
    let cardsToCollect = ingame_cards[0].concat(ingame_cards[1]);
    shuffle(cardsToCollect);
    player_cards[player] = cardsToCollect.concat(player_cards[player]);
    this.setState({
      ingame_cards: Array.from(Array(2), () => new Array(0)),
      player_cards: player_cards,
      canCollect: false,
    });
  }

  render() {
    return (
      <div className="table">
        <WarPlayer
          cards={this.state.player_cards[0]}
          onClick={() => this.handleClick()}
          canCollect={this.state.canCollect}
        />
        <Board
          cards={this.state.ingame_cards}
          canCollect={this.state.canCollect}
          onClick={() => this.handleCollectClick()}
        />
        <WarPlayer
          cards={this.state.player_cards[1]}
          onClick={() => this.handleClick()}
          canCollect={this.state.canCollect}
        />
      </div>
    );
  }
}
