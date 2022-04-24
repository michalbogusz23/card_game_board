import React from "react";

export function Card(props) {
  let suit;
  let color;
  if (props.card.suit === "spades") {
    suit = "♠";
  } else if (props.card.suit === "diamonds") {
    suit = "♦";
    color = { color: "red" };
  } else if (props.card.suit === "hearts") {
    suit = "♥";
    color = { color: "red" };
  } else if (props.card.suit === "clubs") {
    suit = "♣";
  }
  const onClick = props.onClick ? () => props.onClick() : undefined;
  const cardClassName = props.card.chosen ? "card active" : "card";
  return (
    <div className={cardClassName} onClick={onClick}>
      <div><span className="card-values">{props.card.value}</span></div>
      <div><span className="card-values" style={color}>{suit}</span></div>
    </div>
  );
}

export function CardPile(props) {
  const cardPile = props.cards.map((card, index) => {
    const onClick = props.onClick ? () => props.onClick(index) : undefined;
    return <Card key={index} card={card} onClick={onClick} />;
  });
  return cardPile;
}
