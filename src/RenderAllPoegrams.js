import React, { Component } from 'react'
import './poegram.css'

export default class RenderPoegram extends Component {
  
  render() {

    const format = this.props.format;
    const poegram = this.props.poegram;
    const divStyle = {
      backgroundImage: `radial-gradient(circle at top right, ${poegram.colors[0]}, ${poegram.colors[1]})`
    };

    return (
      <div>
      { format === 'json' &&
        <div>
          <div className="poegram background-1" style={ divStyle }>
            <p className="poem">{ poegram.poemId.lines }</p>
            <p className="author">— { poegram.poemId.author }, from <em>{ poegram.poemId.title }</em></p>
          </div>
        </div>
      }

      { format === 'text' &&
        <p>{ poegram }</p>
      }

      { format === 'imagepath' &&
        <p>{ JSON.stringify(poegram) }</p>
      }

      { format === 'image' &&
        <>poegram</>
      }

      { format === 'tweet' &&
        <p>@xyz sent a tweet!</p>
      }

      { format === 'tweetimage' &&
        <p>@xyz tweeted an image!</p>
      }
    </div>
    )
  }
}
