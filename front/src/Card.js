import React from 'react';

export function Card(props) {
  let suit;
  let color;
  if (props.suit === "spades") {
    suit = "♠";
  } else if (props.suit === "diamonds") {
    suit = "♦";
    color = { color: "red" };
  } else if (props.suit === "hearts") {
    suit = "♥";
    color = { color: "red" };
  } else if (props.suit === "clubs") {
    suit = "♣";
  }
  const key = props.suit + props.value;
  return (
    <div key={key} className="card">
      <div><span className="card-values">{props.value}</span></div>
      <div><span className="card-values" style={color}>{suit}</span></div>
    </div>
  );
}
