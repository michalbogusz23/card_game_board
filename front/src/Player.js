import React from 'react';
import { CardPile } from './Card';

export class Player extends React.Component {
  render() {
    const cards = this.props.cards;
    const canCollect = this.props.canCollect;
    return (
      <div className="player">
        <div className="player-cards">
          <CardPile 
            cards={cards} 
            clickable={this.props.clickable ? this.props.clickable : null}
            onClick={(i) => this.props.onCardClick(i)}
          />
        </div>
        <div className="player-button">
          <button onClick={() => this.props.onClick()} disabled={canCollect}>DRAW</button>
        </div>
      </div>

    );
  }
}
