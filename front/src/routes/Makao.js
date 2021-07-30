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
        <Player cards={this.state.player_cards[0]}/>
        <Player cards={this.state.player_cards[1]}/>
        <CardStacks stack={this.state.stack} cardsOnTable={this.state.cardsOnTable}/>
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
        <CardPile cards={props.cardsOnTable}></CardPile>
      </div>
      <div className="stack-todraw">
        <CardPile cards={props.stack}></CardPile>
      </div>
    </div>
  )
}