import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top_cards: Array.from(Array(10)).map(x=>Math.floor(Math.random() * 11)),
      bot_cards: Array.from(Array(10)).map(x=>Math.floor(Math.random() * 11)),
      top_ingame_cards: [],
      bot_ingame_cards: [],
      topIsNext: true,
    };
  }
  handleClick() {
    if(this.state.topIsNext) {
      const top_ingame_cards = this.state.top_ingame_cards.slice();
      const top_cards = this.state.top_cards.slice();
      top_ingame_cards.push(top_cards.pop())
      this.setState({
        top_ingame_cards: top_ingame_cards,
        top_cards: top_cards,
        topIsNext: !this.state.topIsNext
      })
    } else {
      const bot_ingame_cards = this.state.bot_ingame_cards.slice();
      const bot_cards = this.state.bot_cards.slice();
      bot_ingame_cards.push(bot_cards.pop())
      this.setState({
        bot_ingame_cards: bot_ingame_cards,
        bot_cards: bot_cards,
        topIsNext: !this.state.topIsNext
      })
    }
  }
  render() {
    return (
      <div className="table">
        <Player 
          value={this.state.top_cards}
          onClick={() => this.handleClick()}/>
        <Board
          top={this.state.top_ingame_cards}
          bot={this.state.bot_ingame_cards}/>
        <Player 
          value={this.state.bot_cards}
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
    const top_player = this.props.top;
    const bottom_player = this.props.bot;

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

