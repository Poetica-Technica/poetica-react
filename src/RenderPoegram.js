import React, { Component } from 'react'
import './poegram.css'

export default class RenderPoegram extends Component {
  render() {
    return (
      <div className="poegram background-1">
        <p className="poem">{ this.props.poegram.poemId.lines }</p>
        <p className="author">— { this.props.poegram.poemId.author }, from <em>{ this.props.poegram.poemId.title }</em></p>
      </div>
    )
  }
}
