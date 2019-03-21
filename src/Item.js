import React, { Component } from 'react';
import './Item.css';
import Utils from './Utils';
let Draggable = require('react-draggable');

class Item extends Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  render() {
    const thumbnailUrl = Utils.ytThumbnailUrlForUrl(this.props.data.url);
    return (
      <Draggable onStart={this.onDragStart}
                 onStop={this.onDragStop}
                 onDrag={this.onDrag}
                 onMouseDown={this.onMouseDown}
                 onMouseUp={this.onMouseUp}
                 disabled={false}>
        <div className="box" style={{
          left: this.props.data.positionX,
          top: this.props.data.positionY,
        }} onClick={this.onClick}>
          <img alt="thumbnail"
               src={thumbnailUrl} 
               className="thumbnail"
               draggable="false"/>
          {this.props.data.title}
        </div>
      </Draggable>
    );
  }
  onDragStart(e, _) {
    e.stopPropagation();
    return true;
  }
  onDragStop(e, _) {
    // TODO
    // fetch('./item-write.json', {
    //   method: 'post',
    //   body: JSON.stringify(this.props.data),
    // });
  }
  onDrag(e, _) {
  }
  onMouseDown(e) {
    this.setState({
      mouseDownClientX: e.clientX,
      mouseDownClientY: e.clientY,
    });
  }
  onClick(e, _) {
    e.stopPropagation();
    if (e.clientX !== this.state.mouseDownClientX
     || e.clientY !== this.state.mouseDownClientY) {
      // Something's getting dragged
      return;
    }
    window.open(this.props.url, '_blank');
  }
}

export default Item;
