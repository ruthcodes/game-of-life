import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      alive: false,
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    console.log("clicked")
    this.setState = ({
      alive: true,
    });
    console.log(this.state.alive)
  }

  render() {
    return (
        <Cell handleClick={this.handleClick}/>
    )
  }
}

function Cell(props) {
    console.log(props)
    return (
      <div className="cell" onClick={props.handleClick}></div>
    )
}



export default App;
