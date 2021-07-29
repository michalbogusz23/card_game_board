import React from 'react';
import { Card } from './Card';

export class Player extends React.Component {
  render() {
    const cards = this.props.cards;
    const cards_display = cards.map((card) => {
      return Card(card);
    });
    const canCollect = this.props.canCollect;

    return (
      <div className="player">
        <div className="player-cards">
          {cards_display}
        </div>
        <div className="player-button">
          <button onClick={() => this.props.onClick()} disabled={canCollect}>DRAW</button>
        </div>
      </div>

    );
  }
}
