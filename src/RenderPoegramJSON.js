import React, { Component } from 'react'
import './poegram.css'

export default class RenderPoegramJSON extends Component {
  
  render() {

    const poegram = this.props.poegram;
    const divStyle = {
      backgroundImage: `radial-gradient(circle at top right, ${poegram.colors[0]}, ${poegram.colors[1]})`
    };

    return (
      <div>
          <div className="poegram-code">
            <code><pre>{ JSON.stringify(poegram, null, 2) }</pre></code>
          </div>
          <hr />
          <p>Rendered in HTML/CSS:</p>
          <div className="poegram background-1" style={divStyle}>
            <p className="poem">{ poegram.poemId.lines }</p>
            <p className="author">— { poegram.poemId.author }, from <em>{ poegram.poemId.title }</em></p>
          </div>
      </div>
    )
  }
}
