import React from 'react';

export class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chosen: false,
    };
  }

    render () {
      let suit;
      let color;
      if (this.props.suit === "spades") {
        suit = "♠";
      } else if (this.props.suit === "diamonds") {
        suit = "♦";
        color = { color: "red" };
      } else if (this.props.suit === "hearts") {
        suit = "♥";
        color = { color: "red" };
      } else if (this.props.suit === "clubs") {
        suit = "♣";
      }

      let chooseCard = null;
      if (this.props.clickable) {
        chooseCard = () => {
          console.log('Siemson');
          this.setState({chosen: !this.state.chosen})
        };
      }
      const cardClassName = this.state.chosen ? "card active": "card"
      return (
        <div className={cardClassName} onClick={chooseCard}>
          <div><span className="card-values">{this.props.value}</span></div>
          <div><span className="card-values" style={color}>{suit}</span></div>
        </div>
      );
    }
  
}

export function CardPile(props) {
  const cardPile = props.cards.map((card) => {
    const key = card.suit + card.value;
    return <Card key={key} value={card.value} suit={card.suit} clickable={props.clickable}/>;
  });
  return cardPile
}
// Do michała paluśkiewicz do projektu cafe Kuba Sowa, Marek Wawreniuk ma być nowy typ od zarządzania