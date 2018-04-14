import React, { Component } from 'react';
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

  componentDidMount(){
    var myGridArray = [];
    var myRows = [];
    for (let i=0; i<this.state.height; i++){
      for (let x=0; x<this.state.width; x++){
        myRows.push(<Cell key={i+x} handleClick={this.handleClick}/>)
      }
      myGridArray.push(myRows);
      myRows = [];
    }

    this.setState({
      board: myGridArray
    })

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
        <Grid board={this.state.board}/>
    );
  }
}

function Cell(props) {
    return (
      <div className="cell" onClick={props.handleClick}></div>
    )
}

function Grid(props){
    return(
      <div className="gridContainer">{props.board}</div>
    )
  }




export default App;
