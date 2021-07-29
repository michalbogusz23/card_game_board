import React from 'react';
import ReactDOM from 'react-dom';
import './war.css';

class Table extends React.Component {
  render() {
    return (
      <div className="table">
        hello world
      </div>
    )
  }
}


ReactDOM.render(
  <Table />,
  document.getElementById('root')
);
