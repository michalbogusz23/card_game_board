import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {prepareCards} from './deck.js'
import { Card } from './Card';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_cards: prepareCards(2),
      ingame_cards: Array.from(Array(2), () => new Array(0)),
      topIsNext: true,
      canCollect: false,
      isWar: false
    };
  }
  handleClick() {
    if(this.state.topIsNext) {
      this.drawCard(0);
    } else {
      this.drawCard(1);
    }
    const length0 = this.state.ingame_cards[0].length
    const length1 = this.state.ingame_cards[1].length
    if(length0 === length1) {
      if(this.state.ingame_cards[0][length0 - 1].value !== this.state.ingame_cards[1][length1 - 1].value && !this.state.isWar) {
        this.setState({
          canCollect: true,
        });
      } else {
        this.setState({isWar: !this.state.isWar})
      }
    }
  }
  handleCollectClick() {
    const length0 = this.state.ingame_cards[0].length
    const length1 = this.state.ingame_cards[1].length
    if(this.state.ingame_cards[0][length0 - 1].value > this.state.ingame_cards[1][length1 - 1].value) {
      this.collectCards(0);
    } else {
      this.collectCards(1);
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
  collectCards(player) {
    const ingame_cards = this.state.ingame_cards.slice();
    const player_cards = this.state.player_cards.slice();
    let cardsToCollect = ingame_cards[0].concat(ingame_cards[1])
    shuffleArray(cardsToCollect)
    player_cards[player] = cardsToCollect.concat(player_cards[player])
    this.setState({
      ingame_cards: Array.from(Array(2), () => new Array(0)),
      player_cards: player_cards,
      canCollect: false
    });
  }

  render() {
    console.log(this.state.player_cards)
    return (
      <div className="table">
        <Player 
          cards={this.state.player_cards[0]}
          onClick={() => this.handleClick()}
          canCollect={this.state.canCollect}
        />
        <Board
          value={this.state.ingame_cards}
          canCollect={this.state.canCollect}
          onClick={() => this.handleCollectClick()}
        />
        <Player 
          cards={this.state.player_cards[1]}
          onClick={() => this.handleClick()}
          canCollect={this.state.canCollect}
        />
      </div>
    )
  }
}

class Player extends React.Component {
  render() {
    const cards = this.props.cards;
    const cards_display = cards.map((card) =>  {
      return Card(card)
    });
    const canCollect = this.props.canCollect
    
    return (
      <div className="player">
        <div className="player-cards">
          {cards_display}
        </div>
        <div className="player-button">
          <button onClick={() => this.props.onClick()} disabled={canCollect}>DRAW</button>
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
      return Card(card)
    });
    const bottom_cards = bottom_player.map((card) =>  {
      return Card(card)
    });

    let collectButton = null
    if(this.props.canCollect) {
      collectButton = <button onClick={this.props.onClick}>Collect</button>
    }

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
          {collectButton}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);

