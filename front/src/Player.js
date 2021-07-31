import React from "react";
import { CardPile } from "./Card";

export class Player extends React.Component {
  render() {
    const cards = this.props.cards;
    const cardsToLayOutAmount = cards.filter((card) => card.chosen).length;
    const penalty =
      this.props.rules.penalty &&
      "Collect " + this.props.rules.penalty + " cards";
    const layOutBtn = cardsToLayOutAmount ? (
      <button onClick={() => this.props.onLayOutClick()}>
        Lay out {cardsToLayOutAmount} cards
      </button>
    ) : undefined;
    const collectBtn = penalty && (
      <button onClick={() => this.props.onCollectClick()}>{penalty}</button>
    );
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
          {layOutBtn}
          {collectBtn}
        </div>
      </div>
    );
  }
}
