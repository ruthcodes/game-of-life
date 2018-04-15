import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: 40,
      height: 40,
      board: [],
      valBoard: [],
    };
    this.handleClick = this.handleClick.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  componentDidMount(){
    var myGridArray = [];
    var myRows = [];

    var gridVal = [];
    var rowVal = [];
    for (let i=0; i<this.state.height; i++){
      for (let x=0; x<this.state.width; x++){
        //let ranNum = Math.round((Math.random()));
        let boo = (Math.random()*100) < 10;
        myRows.push(<Cell key={i+x} handleClick={this.handleClick} data-value={boo}/>)
        rowVal.push(ranNum)
      }
      myGridArray.push(myRows);
      myRows = [];
      gridVal.push(rowVal);
      rowVal = [];
    }

    this.setState({
      board: myGridArray,
      valBoard: gridVal
    })

  }

  componentDidUpdate(){
    console.log(this.state.valBoard)
    //console.log(this.state.board[0][1].props.value);
  }

  clearAll(){

  }

  handleClick(e){
    e.preventDefault();
    console.log("value before:" + e.target.getAttribute('data-value'));
    e.target.setAttribute('data-value', true);
    let board = this.state.board.slice();
    this.setState({
      board: board,
    });
    console.log("value after: " + e.target.getAttribute('data-value'));
  }

  render() {
    return (
        <Grid board={this.state.board} clearAll={this.clearAll}/>
    );
  }
}

function Cell(props) {
    return (
      <div className="cell" onClick={props.handleClick} data-value={props['data-value']}></div>
    )
}

function Grid(props){
    return(
      <div className="gridContainer">
      {props.board}
      <button onClick={props.clearAll}>Clear All</button>
      </div>

    )
  }




export default App;
