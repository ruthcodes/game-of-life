import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      alive: false,
      width: 20,
      height: 20,
      board: [],
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    console.log("clicked")
    this.setState({
      alive: true,
    });
    console.log(this.state.alive)
  }

  render() {
    return (
        <Grid height={this.state.height} width={this.state.width} handleClick={this.handleClick}/>
    );
  }
}

function Cell(props) {
    console.log(props)
    return (
      <div className="cell" onClick={props.handleClick}></div>
    )
}

function Grid(props){
    var myArray = [];
    for (let i=0; i<props.height; i++){
      for (let x=0; x<props.width; x++){
        myArray.push(<Cell />)
      }
    }
    return(
      <div className="gridContainer">{myArray}</div>
    )
  }




export default App;
