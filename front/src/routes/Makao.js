import React from 'react';
import { Player } from '../Player';
import {prepareCards} from '../Deck.js'
import './war.css';

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    const preparedCards = prepareCards(4, 5)
    this.state = {
      player_cards: preparedCards[0],
      stack: preparedCards[1],
    };
  }
  render() {
    console.log(this.state.stack)
    return (
      <div className="table">
        <Player cards={this.state.player_cards[0]}/>
        <Player cards={this.state.player_cards[1]}/>
        <CardStacks/>
        <Player cards={this.state.player_cards[2]}/>
        <Player cards={this.state.player_cards[3]}/>
      </div>
    )
  }
}

function CardStacks(props) {
  return (
    <div className="stack">
      <div className="stack-drawed">
      </div>
      <div className="stack-todraw">
      </div>
    </div>
  )
}