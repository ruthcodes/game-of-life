import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
      width: 40,
      height: 40,
      valBoard: [],
      timerRunning: false,
      generation: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.neighbours = this.neighbours.bind(this);
    this.aliveOrDead = this.aliveOrDead.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
  }

  componentDidMount(){
    var gridVal = [];
    var rowVal = [];
    for (let i=0; i<this.state.height; i++){
      for (let x=0; x<this.state.width; x++){
        //20% chance of cell being 'alive' at initiation
        let boo = (Math.random()*100) < 20;
        rowVal.push(boo)
      }
      gridVal.push(rowVal);
      rowVal = [];
    }
    this.startTimer();
    this.setState({
      valBoard: gridVal,
      timerRunning: true,
    })

  }

  handlePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  startTimer(){
    if (!this.state.timerRunning){
      console.log("starting a timer")
      this.timerId = setInterval(()=>{
          this.aliveOrDead();
      }, 200);
      this.setState({
        timerRunning: true,
      })
    }

  }

  stopTimer(){
    clearInterval(this.timerId);
    this.setState({
      timerRunning: false,
      generation: 0,
    })
  }

  pauseTimer(){
    clearInterval(this.timerId);
    this.setState({
      timerRunning: false,
    })
  }

  componentWillUnmount(){
    this.stopTimer();
    console.log("unmounted")
  }

  clearAll(){
    this.stopTimer();
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

  neighbours(n,j){
    let x = [];
    let b = this.state.valBoard;

    //bottom right corner
    if ((n === 39) && (j === 39)){
      x = [b[38][38],b[38][39],b[38][0],b[39][38],b[39][0],b[0][38],b[0][39],b[0][0]];
    //bottom left corner
    } else if ((n === 39) && (j === 0)){
      x = [b[38][0], b[38][1], b[38][39], b[39][39], b[39][1], b[0][0], b[0][1], b[0][39]];
    //top right corner
    } else if ((n === 0) && (j === 39)){
      x = [b[39][38], b[39][39], b[39][0], b[0][38], b[0][0], b[1][38], b[1][39], b[1][0]];
    //top left corner
    } else if ((n === 0) && (j === 0)){
      x = [b[39][0], b[39][1], b[39][39], b[0][1], b[0][39], b[1][0], b[1][1], b[1][39]];
    //rightmost
    } else if (j === 39){
      x = [b[n-1][39], b[n-1][38], b[n-1][0], b[n+1][39], b[n+1][38], b[n+1][0], b[n][38], b[n][0]];
    //leftmost
    } else if (j === 0){
      x = [b[n-1][0], b[n-1][1], b[n-1][39], b[n+1][0], b[n+1][1], b[n+1][39], b[n][1], b[n][39]];
    //bottom
    } else if (n === 39){
      x = [b[38][j-1], b[38][j], b[38][j+1], b[0][j-1], b[0][j], b[0][j+1], b[39][j-1], b[39][j+1]];
    //top
    } else if (n === 0){
      x = [ b[39][j-1], b[39][j], b[39][j+1], b[1][j-1], b[1][j], b[1][j+1], b[0][j-1], b[0][j+1]];
    // any non-edge
    } else {
      x = [b[n-1][j-1], b[n-1][j], b[n-1][j+1], b[n][j-1], b[n][j+1], b[n+1][j-1], b[n+1][j], b[n+1][j+1]];
    }

    let livingNeighbours = x.filter(Boolean);
    //console.log(livingNeighbours.length);
    return livingNeighbours.length;
  }

  aliveOrDead(){
    //need to push to separate rows
    //console.log('running alive or dead')
    let newStatus = [];
    let newRow = [];
    let boardCopy = this.state.valBoard.slice();
    boardCopy.forEach((nested, x) =>{
      nested.forEach((element, i) =>{
        let neigh = this.neighbours(x,i);
        if (element){
          if ((neigh > 1) && (neigh < 4)){
            newRow.push(true);
          } else {
            newRow.push(false);
          }
        } else {
          if (neigh === 3){
            newRow.push(true);
          } else {
            newRow.push(false)
          }
        }
      })
      newStatus.push(newRow);
      newRow = [];
    })
    this.setState({
      valBoard: newStatus,
      generation: this.state.generation + 1,
    })
  }


  handleClick(e){
    let col = parseInt(e.target.getAttribute('data-key'),10);
    let row = parseInt(e.target.getAttribute('data-row'),10);
    //this.neighbours(row,col)
    //this.aliveOrDead();
    e.preventDefault();
    let board = this.state.valBoard.slice();
    board[row][col] = true;
    this.setState({
      valBoard: board,
    });

  }

  render() {
    return (
      <div className="container">
        <h1>{"Conway's Game of Life"}</h1>
        <button onClick={this.handlePopup}>Huh?</button>
        <Grid board={this.state.valBoard} handleClick={this.handleClick} />
        <div className="information">
          <button onClick={this.clearAll}>Clear All</button>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.pauseTimer}>Pause</button>
          <p className="generation">Generation: {this.state.generation}</p>
        </div>
        {this.state.showPopup ?
          <Popup handlePopup={this.handlePopup}/>
          : null
        }
      </div>
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
      </div>
  )
}

function Popup(props) {
    return (
      <div className='popup'>
        <div className='popup_inner'>
            <div className="popRowOne">
              <div className="popHead"><h2>{"Conway's Game of Life"}</h2></div>
            </div>
            <div>
              <p>{"The 'Game of Life' is an example of cellular automation devised by mathematician John Conway."}
                  {"There are no players, but you can click on a cell to bring it to life and affect the automation."}
                  {"Each cell is 'alive' (blue) or 'dead' (white)."}
                  {"Every iteration, a living cell stays alive if it has 2 or 3 living neighbours."}
                  {"A dead cell will come to life if it has exactly 3 neighbours."}
              </p>
              <button onClick={props.handlePopup}>OK</button>
            </div>
        </div>
      </div>
    );
}



export default App;
