import React from 'react';
import { Player } from '../Player';
import { prepareCards } from '../Deck.js'
import { CardPile } from '../Card.js'
import './war.css';

export default class Makao extends React.Component {
  constructor(props) {
    super(props);
    let preparedCards = prepareCards(4, 5)
    console.log(preparedCards[1].pop())
    const cardOnTable = new Array(preparedCards[1].pop())
    this.state = {
      player_cards: preparedCards[0],
      cardsOnTable: cardOnTable,
      stack: preparedCards[1],
    };
  }
  render() {
    console.log(this.state.cardsOnTable)
    return (
      <div className="table">
        <Player cards={this.state.player_cards[0]} clickable={true}/>
        <Player cards={this.state.player_cards[1]} clickable={true}/>
        <MakaoBoard stack={this.state.stack} cardsOnTable={this.state.cardsOnTable}/>
        <Player cards={this.state.player_cards[2]} clickable={true}/>
        <Player cards={this.state.player_cards[3]} clickable={true}/>
      </div>
    )
  }
}

function MakaoBoard(props) {
  return (
    <div className="makao-board">
      <div className="makao-board-dealt">
        <CardPile cards={props.cardsOnTable}></CardPile>
      </div>
      <div className="makao-board-pile">
        <CardPile cards={props.stack}></CardPile>
      </div>
    </div>
  )
}