import React, { Component } from 'react';
import './Canvas.css';
import { items } from './items';
import Item from './Item';
let Draggable = require('react-draggable');

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
    };
  }
  render() {
    let x = 0;
    let y = 0;
    const boxes = this.state.items.map(item => {
      x += 50;
      y += 50;
      return (<Item dragDisabled="true"
                    title={item.title}
                    url={item.url}
                    key={item.id}
                    x={x}
                    y={y}
              />);
    });
    return (
      <Draggable>
        <div className="Canvas">
          {boxes}
        </div>
      </Draggable>
    );
  }
}

export default Canvas;
