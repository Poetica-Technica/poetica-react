import React, { Component } from 'react'
import RenderPoegramJSON from './RenderPoegramJSON.js'
import './poegram.css'

export default class RenderPoegram extends Component {
  
  render() {

    const format = this.props.format;
    const poegram = this.props.poegram;

    return (
      <div>
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
        <>
        <p>Cmon image</p>
        {/* { console.log('poegram is', poegram) } */}
        <img src={ poegram } alt='poegram' />
        </>
      }

      { format === 'tweet' &&
        <p>@PoeticaTechnica sent a tweet!</p>
      }

      { format === 'tweetimage' &&
        <p>@PoeticaTechnica tweeted an image!</p>
      }
    </div>
    )
  }
}
