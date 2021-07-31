import React from 'react';
import { CardPile } from '../Card.js';

export function MakaoBoard(props) {
  const demand = props.rules.demand && "Demand of " + props.rules.demand;
  const colorChange = props.rules.colorChange && "Color changed to " + props.rules.colorChange
  return (
    <div className="makao-board">
      <div className="makao-board-dealt">
        <div className="makao-board-info">
          {demand}
          {colorChange}
        </div>
        <div className="makao-board-cards">
          <CardPile cards={props.cardsOnTable}></CardPile>
        </div>
      </div>
      <div className="makao-board-pile">
        <CardPile cards={props.stack}></CardPile>
      </div>
    </div>
  );
}
