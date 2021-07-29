import React from 'react';
import { Card } from './Card';

export class Board extends React.Component {
  render() {
    const top_player = this.props.value[0];
    const bottom_player = this.props.value[1];

    const top_cards = top_player.map((card) => {
      return Card(card);
    });
    const bottom_cards = bottom_player.map((card) => {
      return Card(card);
    });

    let collectButton = null;
    if (this.props.canCollect) {
      collectButton = <button onClick={this.props.onClick}>Collect</button>;
    }

    return (
      <div className="board">
        <div className="board-cards">
          <div className="board-card-row">
            {top_cards}
          </div>
          <div className="board-card-row">
            {bottom_cards}
          </div>
        </div>
        <div className="board-result">
          {collectButton}
        </div>
      </div>
    );
  }
}
