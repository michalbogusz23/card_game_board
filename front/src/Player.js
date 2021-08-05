import React from "react";
import { CardPile } from "./Card";
import { Card } from "./Card";

export class Player extends React.Component {
  render() {
    const cards = this.props.cards;
    const cardsToLayOutAmount = cards.filter((card) => card.chosen).length;
    const penalty =
      this.props.rules.penalty &&
      "Collect " + this.props.rules.penalty + " cards";
    const isMyTurn = this.props.playerNo === this.props.rules.whoseTurn ? true : false
    const clickable = isMyTurn && this.props.clickable ? true : false

    const layOutBtn = cardsToLayOutAmount && isMyTurn ? (
      <button onClick={() => this.props.onLayOutClick()}>
        Lay out {cardsToLayOutAmount} cards
      </button>
    ) : undefined;

    const collectBtn = penalty && isMyTurn && (
      <button onClick={() => this.props.onCollectClick()}>{penalty}</button>
    );

    return (
      <div className="player">
        <div className="player-cards">
          <CardPile
            cards={cards}
            clickable={clickable}
            onClick={(i) => this.props.onCardClick(i)}
          />
        </div>
        <div className="player-button">
          {layOutBtn}
          {collectBtn}
        </div>
      </div>
    );
  }
}

export function WarPlayer(props) {
    const cards = props.cards;
    const canCollect = props.canCollect

    return (
        <div className="player">
            <div className="player-cards">
                <CardPile
                    cards={cards}
                />
            </div>
            <div className="player-button">
                <button onClick={() => props.onClick()} disabled={canCollect}>LAY OUT</button>
            </div>
        </div>

    )
}
