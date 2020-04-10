import React from 'react';
import { getAllPoegrams } from './api.js';
// import RenderPoegram from './RenderPoegram.js'
import RenderAllPoegrams from './RenderAllPoegrams.js'

export default class AllPoegrams extends React.Component {
  state = {
    author: 'random',
    format: 'json',
    data: [],
  }

  componentDidMount = async () => {
    const allPoegrams = await getAllPoegrams();
    this.setState({ data: allPoegrams });
  }

  render() {
    return (
      <div className="container">
        <h4>All Poegrams</h4>
        <div className='results'>
          {this.state.data.map((poegram, index) => <RenderAllPoegrams key={index} poegram={poegram} format={this.state.format} />)}
        </div>
      </div>
    );
  }
}
