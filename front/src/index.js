import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  render() {
    return (
      <div className="table">
        <Player/>
        <Board/>
        <Player/>
      </div>
    )
  }
}
class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardsValues: Array(9).fill(1),
    }
  }

  renderCard(i) {
    return (
      <div className="player-card"></div>
    );
  }
  render() {
    const cardsValues = this.state.cardsValues;

    const cards = cardsValues.map((step, card) =>  {
      return (
        <div>{card}</div>
      )
    })
    return (
      <div className="player">
        <div className="player-cards">
          {cards}
        </div>
        <div className="player-button">

        </div>
      </div>
      
    )
  }
}
class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="board-cards">
          <div className="board-card-row">

          </div>
          <div className="board-card-row">

          </div>
        </div>
        <div className="board-result">

        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);

