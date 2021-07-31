import React from 'react';

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

  const cardClassName = props.card.chosen ? "card active": "card"
  return (
    <div className={cardClassName} onClick={() => props.onCardClick()}>
      <div><span className="card-values">{props.card.value}</span></div>
      <div><span className="card-values" style={color}>{suit}</span></div>
    </div>
  );
}


export function CardPile(props) {
  const cardPile = props.cards.map((card, index) => {
    return (
      <Card 
        key={index} 
        card={card}
        onCardClick={() => props.onCardClick(index)}
      />
  )});
  return cardPile
}
// Do michała paluśkiewicz do projektu cafe Kuba Sowa, Marek Wawreniuk ma być nowy typ od zarządzania