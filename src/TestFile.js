// Enter new translation
import React from 'react';
import { createPoegram, getAllPoegrams } from './api.js';
import RenderPoegram from './RenderPoegram.js'

export default class PoegramCreate extends React.Component {
  state = {
    author: 'Shakespeare',
    data: [],
  }

  componentDidMount = async () => {
    this.setState({});
  }

  handleCreate = async () => {    
    const createdPoegram = await createPoegram(this.state.author);
    this.setState({ data: createdPoegram });
  }

  handleGetAll = async () => {    
    const allPoegrams = await getAllPoegrams();
    this.setState({ data: allPoegrams });
  }


  render() {
    return (
      <div className="container">
        <div className="poegram-create">
          Desired author:
          <input value={this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
          <br />
          <button onClick={this.handleCreate}>Create a Poegram</button>
          <hr />
          <button onClick={this.handleGetAll}>Get All Poegrams</button>
          <hr />
        </div>
        <div>
          {this.state.data.map(poegram => <RenderPoegram key={poegram._id} poegram={poegram} />)}
        </div>
      </div>
    );
  }
}
