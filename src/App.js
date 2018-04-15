import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: 40,
      height: 40,
      valBoard: [],
    };
    this.handleClick = this.handleClick.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  componentDidMount(){
    var gridVal = [];
    var rowVal = [];
    for (let i=0; i<this.state.height; i++){
      for (let x=0; x<this.state.width; x++){
        //10% chance of cell being 'alive' at initiation
        let boo = (Math.random()*100) < 10;
        rowVal.push(boo)
      }
      gridVal.push(rowVal);
      rowVal = [];
    }

    this.setState({
      valBoard: gridVal
    })

  }

  componentDidUpdate(){
    console.log(this.state.valBoard)
  }

  clearAll(){
    var gridVal = [];
    var rowVal = [];
    for (let i=0; i<this.state.height; i++){
      for (let x=0; x<this.state.width; x++){
        rowVal.push(false)
      }
      gridVal.push(rowVal);
      rowVal = [];
    }

    this.setState({
      valBoard: gridVal
    })


  }

  handleClick(e){
    let col = e.target.getAttribute('data-key');
    let row = e.target.getAttribute('data-row');
    e.preventDefault();

    e.target.setAttribute('data-value', true);
    let board = this.state.valBoard.slice();
    board[row][col] = true;
    this.setState({
      valBoard: board,
    });

  }

  render() {
    return (
        <Grid board={this.state.valBoard} clearAll={this.clearAll} handleClick={this.handleClick}/>
    );
  }
}

function Cell(props) {
    return (
      <div className="cell" onClick={props.handleClick} data-value={props['data-value']} data-row={props['data-row']} data-key={props['data-key']}></div>
    )
}

function Grid(props){
  return(
    <div className="gridContainer">
      {props.board.map((nested, x) => nested.map((element, i) => <Cell key={i+x} data-row={x} data-key={i} handleClick={props.handleClick} data-value={element}/>))}
      <button onClick={props.clearAll}>Clear All</button>
    </div>
  )
}




export default App;
