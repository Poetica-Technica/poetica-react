import React, { Component } from 'react'
import './poegram.css'

export default class RenderPoegram extends Component {
  
  render() {

    const divStyle = {
      backgroundImage: `radial-gradient(circle at top right, ${this.props.poegram.colors[0]}, ${this.props.poegram.colors[1]})`
    };

    return (
      <div className="poegram background-1" style={divStyle}>
        <p className="poem">{ this.props.poegram.poemId.lines }</p>
        <p className="author">— { this.props.poegram.poemId.author }, from <em>{ this.props.poegram.poemId.title }</em></p>
      </div>
    )
  }
}
