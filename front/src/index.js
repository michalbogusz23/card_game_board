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

  render() {
    const cardsValues = this.state.cardsValues;

    const cards = cardsValues.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });
    return (
      <div className="player">
        <div className="player-cards">
          {cards}
        </div>
        <div className="player-button">
          <button>OK</button>
        </div>
      </div>
      
    )
  }
}
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top_player: [1],
      bottom_player: [2]
    }
  }
  
  render() {
    const top_player = this.state.top_player;
    const bottom_player = this.state.bottom_player;

    const top_cards = top_player.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });
    const bottom_cards = bottom_player.map((card) =>  {
      return (
        <div>{card}</div>
      )
    });

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

        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);

