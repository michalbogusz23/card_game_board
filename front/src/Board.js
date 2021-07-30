import React from 'react';
import { CardPile } from './Card';

export class Board extends React.Component {
  render() {
    const top_player = this.props.cards[0];
    const bottom_player = this.props.cards[1];

    let collectButton = null;
    if (this.props.canCollect) {
      collectButton = <button onClick={this.props.onClick}>Collect</button>;
    }

    return (
      <div className="board">
        <div className="board-cards">
          <div className="board-card-row">
            <CardPile cards={top_player}/>
          </div>
          <div className="board-card-row">
            <CardPile cards={bottom_player}/>
          </div>
        </div>
        <div className="board-result">
          {collectButton}
        </div>
      </div>
    );
  }
}
