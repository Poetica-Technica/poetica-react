import React from 'react';
import { createPoegram, getRandomPoegram, getAllAuthors, getAllPoegrams, getMyPoegrams } from './api.js';
import RenderPoegram from './RenderPoegram.js'

export default class Home extends React.Component {
  state = {
    viewFormat: 'json',
    author: 'random',
    format: 'json',
    sentFormat: 'json',
    allAuthorsData: [],
    data: [],
  }

  componentDidMount = async () => {
    const allAuthors = await getAllAuthors();
    this.setState({ allAuthorsData: allAuthors });
  }

  handleSubmit = async (e) => {    
    e.preventDefault();
    const createdPoegram = await createPoegram(this.state.author, this.state.format);
    this.setState({ sentFormat: this.state.format });
    this.setState({ data: [createdPoegram] });
  }

  handleViewRandomSubmit = async (e) => {    
    e.preventDefault();
    const randomPoegram = await getRandomPoegram(this.state.format);
    this.setState({ sentFormat: this.state.viewFormat });
    this.setState({ data: [randomPoegram] });
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
        <div class="row">
          <div className="col-sm-4">
            <h4>View a Random Poegram</h4>
            <div className="poegram-create">
              <form id="myForm" onSubmit={this.handleViewRandomSubmit}>

                <div className="radio-buttons">
                  <input
                    id="radio-view-random-json"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="json" 
                    defaultChecked />
                  <label htmlFor="radio-view-random-json">JSON</label>

                  <input
                    id="radio-view-random-text"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="text" />
                  <label htmlFor="radio-view-random-text">Text</label>

                  <input
                    id="radio-view-random-path"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="imagepath" />
                  <label htmlFor="radio-view-random-path">Path</label>

                  <input
                    id="radio-view-random-image"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="image" />
                  <label htmlFor="radio-view-random-image">Image</label>

                  <input
                    id="radio-view-random-tweet"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="tweet" />
                  <label htmlFor="radio-view-random-tweet">Tweet</label>

                  <input
                    id="radio-view-random-tweetimage"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewFormat: e.target.value })}
                    value="tweetimage" />
                  <label htmlFor="radio-view-random-tweetimage">Tweet with image</label>

                </div>
                <button type="submit">View a Random Poegram</button>
                <p className="html-equiv">API equivalent: <code>GET https://poegram.herokuapp.com/api/v1/poegrams/ranodom/?format={this.state.viewFormat}</code></p>

              </form>
            </div>

            <hr />

            <h4>Create a Poegram</h4>
            <p><em>Authentication required</em></p>
            <div className="poegram-create">
              <form id="myForm" onSubmit={this.handleSubmit}>

                <select id='authorList' onChange={(e) => { this.setState({ author: e.target.value }) }} value={this.state.author}>
                  <option value='random'>Random Author</option>
                      {this.state.allAuthorsData.map((author, index) => <option key={index} value={author}>{author}</option>)}
                </select>

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
                    id="radio-text"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="text" />
                  <label htmlFor="radio-text">Text</label>

                  <input
                    id="radio-path"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="imagepath" />
                  <label htmlFor="radio-path">Path</label>

                  <input
                    id="radio-image"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="image" />
                  <label htmlFor="radio-image">Image</label>

                  <input
                    id="radio-tweet"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="tweet" />
                  <label htmlFor="radio-tweet">Tweet</label>

                  <input
                    id="radio-tweetimage"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="tweetimage" />
                  <label htmlFor="radio-tweetimage">Tweet with image</label>

                </div>
                <button type="submit">Create a Poegram</button>
                <p className="html-equiv">API equivalent: <code>GET https://poegram.herokuapp.com/api/v1/create/?author={this.state.author}&format={this.state.format}</code></p>

              </form>
              {/* <button onClick={this.handleGetMy}>Get My Poegrams</button> */}
            </div>

            <hr />

            <h4>View All Poegrams</h4>
            <p><em>JSON data only</em></p>
            <button type="submit">View all Poegrams</button>
            <p className="html-equiv">API equivalent: <code>GET https://poegram.herokuapp.com/api/v1/poegrams</code></p>
            <p><a href="./AllPoegrams">Render all</a></p>
          </div>

          <div className="col-sm-7 offset-sm-1">
            <div className='results'>
              <h4>Results</h4>
              {this.state.data.map((poegram, index) => <RenderPoegram key={index} poegram={poegram} format={this.state.sentFormat} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
