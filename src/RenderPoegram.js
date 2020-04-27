import React, { Component } from 'react'
import RenderPoegramJSON from './RenderPoegramJSON.js'
import './poegram.css'

export default class RenderPoegram extends Component {
  
  render() {

    const format = this.props.format;
    const poegram = this.props.poegram;
    const index = this.props.index;
    const length = this.props.length;

    return (
      <div>
      { length > 1 &&
        <h6>Object #{index + 1} of {length}</h6>
      }  
      
      { format === 'json' &&
        <RenderPoegramJSON poegram={poegram} />
      }

      { format === 'text' &&
        <p>{ poegram }</p>
      }

      { format === 'imagepath' &&
        <p>{ JSON.stringify(poegram) }</p>
      }

      { format === 'image' &&
        <img src={ poegram } alt='poegram' />
      }

      { format === 'tweet' &&
        <p>@PoeticaTechnica sent a tweet!</p>
      }

      { format === 'tweetimage' &&
        <p>@PoeticaTechnica tweeted an image!</p>
      }

      { (length > 1 && index + 1 !== length) &&
        <hr />
      }  

    </div>
    )
  }
}
