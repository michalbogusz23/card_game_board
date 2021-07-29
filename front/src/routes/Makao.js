import React from 'react';
import { Player } from '../Player';
import { Board } from '../Board';
import {prepareCards} from '../Deck.js'
import './war.css';

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    const preparedCards = prepareCards(4, 5)
    this.state = {
      player_cards: preparedCards[0],
      ingame_cards: Array.from(Array(4), () => new Array(0)),
      stack: preparedCards[1],
    };
  }
  render() {
    console.log(this.state.stack)
    return (
      <div className="table">
        <Player cards={this.state.player_cards[0]}/>
        <Player cards={this.state.player_cards[1]}/>
        <Board value={this.state.ingame_cards}/>
        <Player cards={this.state.player_cards[2]}/>
        <Player cards={this.state.player_cards[3]}/>
      </div>
    )
  }
}
