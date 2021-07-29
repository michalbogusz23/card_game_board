import React from 'react';
import { Player } from '../Player';
import { Board } from '../Board';
import {prepareCards} from '../Deck.js'
import './war.css';

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_cards: prepareCards(4),
      ingame_cards: Array.from(Array(2), () => new Array(0)),
    };
  }
  render() {
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
