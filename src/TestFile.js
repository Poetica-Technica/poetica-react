// Enter new translation
import React from 'react';
import { createPoegram, getAllPoegrams, getMyPoegrams } from './api.js';
import RenderPoegram from './RenderPoegram.js'

export default class PoegramCreate extends React.Component {
  state = {
    author: 'Shakespeare',
    format: 'json',
    data: [],
  }

  componentDidMount = async () => {
    this.setState({});
  }

  handleSubmit = async (e) => {    
    e.preventDefault();
    const createdPoegram = await createPoegram(this.state.author, this.state.format);
    this.setState({ data: [createdPoegram] });
  }

  handleGetAll = async () => {    
    const allPoegrams = await getAllPoegrams();
    this.setState({ data: allPoegrams });
  }

  handleGetMy = async () => {    
    const myPoegrams = await getMyPoegrams();
    this.setState({ data: myPoegrams });
  }


  render() {
    return (
      <div className="container">
        <div className="poegram-create">
          <form id="myForm" onSubmit={this.handleSubmit}>
            Desired author:
            <input value={this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
            <br />
            <div className="radio-buttons">
              <input
                id="radio-json"
                name="poegram-create"
                type="radio"
                onClick={(e) => this.setState({ format: e.target.value })}
                value="json" 
                defaultChecked />
              <label htmlFor="radio-json">JSON</label>
              <input
                id="radio-image"
                name="poegram-create"
                type="radio"
                onClick={(e) => this.setState({ format: e.target.value })}
                value="image" />
              <label htmlFor="radio-image">Image</label>
              <input
                id="radio-path"
                name="poegram-create"
                type="radio"
                onClick={(e) => this.setState({ format: e.target.value })}
                value="imagepath" />
              <label htmlFor="radio-path">Path</label>
              <input
                id="radio-tweet"
                name="poegram-create"
                type="radio"
                onClick={(e) => this.setState({ format: e.target.value })}
                value="tweet" />
              <label htmlFor="radio-tweet">Tweet</label>
            </div>
            <button type="submit">Create a Poegram</button>
          </form>

          <br />
          <br />
          <button onClick={this.handleGetAll}>Get All Poegrams</button>
          <br />
          {/* <button onClick={this.handleGetMy}>Get My Poegrams</button> */}
        </div>
        <div>
          {this.state.data.map(poegram => <RenderPoegram key={poegram._id} poegram={poegram} />)}
        </div>
      </div>
    );
  }
}
