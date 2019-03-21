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
    const boxes = this.state.items.map(item => {
      return (<Item dragDisabled="true"
                    title={item.title}
                    url={item.url}
                    key={item.id}
                    x={item.positionX}
                    y={item.positionY}
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
