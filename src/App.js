import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      alive: false,
      width: 40,
      height: 40,
      board: [],
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    this.setState({
      alive: !this.state.alive,
    });
    console.log(this.state.alive);
  }

  render() {
    return (
        <Grid height={this.state.height} width={this.state.width} handleClick={this.handleClick}/>
    );
  }
}

function Cell(props) {
    return (
      <div className="cell" onClick={props.handleClick}></div>
    )
}

function Grid(props){
    var myGridArray = [];
    var myRows = [];
    for (let i=0; i<props.height; i++){
      for (let x=0; x<props.width; x++){
        myRows.push(<Cell key={i+x} handleClick={props.handleClick}/>)
      }
      myGridArray.push(myRows);
      myRows = [];
    }

    return(
      <div className="gridContainer">{myGridArray}</div>
    )
  }




export default App;
