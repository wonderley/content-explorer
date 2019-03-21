import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.onWheel = this.onWheel.bind(this);
  }
  render() {
    return (
      <div className="App" onWheel={this.onWheel}>
        <Canvas/>
      </div>
    );
  }
  onWheel(e, _) {
    const dX = e.deltaX,
          dY = e.deltaY;
    if (dX !== 0) console.log(`dX: ${dX}`);
    if (dY !== 0) console.log(`dY: ${dY}`);
    e.preventDefault();
  }
}

export default App;
