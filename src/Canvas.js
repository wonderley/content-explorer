import React, { Component } from 'react';
import './Canvas.css';
import { items } from './items';
import Item from './Item';
let Draggable = require('react-draggable');

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch('./items.json')
    .then(res => res.json())
    .then(result => {
      this.setState({
        isLoaded: true,
        items: result.items,
      });
    }, (error) => {
      console.error(error);
      this.setState({
        isLoaded: true,
        error,
      });
    });
  }
  render() {
    let boxes = [];
    if (this.state.isLoaded) {
      boxes = items.map(item => {
        return (<Item dragDisabled={false}
                      data={item}
                />);
      });
    }
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
