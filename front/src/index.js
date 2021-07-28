import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_cards: [
        Array.from(Array(10)).map(x=>Math.floor(Math.random() * 11)),
        Array.from(Array(10)).map(x=>Math.floor(Math.random() * 11))
      ],
      ingame_cards: Array.from(Array(2), () => new Array(0)),
      topIsNext: true,
    };
  }
  handleClick() {
    if(this.state.topIsNext) {
      this.drawCard(0);
    } else {
      this.drawCard(1);
    }
  }
  drawCard(player) {
    const ingame_cards = this.state.ingame_cards.slice();
    const player_cards = this.state.player_cards.slice();
    ingame_cards[player].push(player_cards[player].pop());
    this.setState({
      ingame_cards: ingame_cards,
      player_cards: player_cards,
      topIsNext: !this.state.topIsNext
    });
  }

  render() {
    return (
      <div className="table">
        <Player 
          value={this.state.player_cards[0]}
          onClick={() => this.handleClick()}/>
        <Board
          value={this.state.ingame_cards}/>
        <Player 
          value={this.state.player_cards[1]}
          onClick={() => this.handleClick()}/>
      </div>
    )
  }
}


class Player extends React.Component {
  render() {
    const values = this.props.value;
    const cards = values.map((card) =>  {
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
          <button onClick={() => this.props.onClick()}>OK</button>
        </div>
      </div>
      
    )
  }
}


class Board extends React.Component {
  render() {
    const top_player = this.props.value[0];
    const bottom_player = this.props.value[1];

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

