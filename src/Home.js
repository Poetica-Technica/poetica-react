import React from 'react';
import { createPoegram, getRandomPoegram, getAllAuthors, getAllPoegrams, getMyPoegrams } from './api.js';
import RenderPoegram from './RenderPoegram.js'

export default class Home extends React.Component {
  state = {
    viewRandomFormat: 'json',
    author: 'random',
    format: 'json',
    sentFormat: '',
    allAuthorsData: [],
    data: [],
    dataArray: [],
    username: ''
  }

  componentDidMount = async () => {
    const allAuthors = await getAllAuthors();
    this.setState({ allAuthorsData: allAuthors });
    const userStr = localStorage.getItem('user');
    if (localStorage.getItem('user')) { 
      const userObj = JSON.parse(userStr);
      this.setState({ username: userObj.username })
    };
  }

  handleSubmit = async (e) => {    
    e.preventDefault();
    const createdPoegram = await createPoegram(this.state.author, this.state.format);
    this.setState({ data: [createdPoegram], sentFormat: this.state.format });
  }

  handleViewRandomSubmit = async (e) => {    
    e.preventDefault();

    const randomPoegram = await getRandomPoegram(this.state.viewRandomFormat);
    if (this.state.viewRandomFormat === 'image') {
      const imageUrl = URL.createObjectURL(randomPoegram);
      this.setState({ data: [imageUrl], sentFormat: this.state.viewRandomFormat });
    }
    else this.setState({ data: [randomPoegram], sentFormat: this.state.viewRandomFormat });
  }

  handleGetAll = async () => {    
    const allPoegrams = await getAllPoegrams();
    this.setState({ data: allPoegrams, sentFormat: 'json' });
  }
  
  handleGetMy = async () => {    
    const myPoegrams = await getMyPoegrams();
    this.setState({ data: myPoegrams, sentFormat: 'json' });
  }


  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h4>View a Random Poegram</h4>
            <div className="poegram-create">
              <form id="myForm" onSubmit={this.handleViewRandomSubmit}>

                <div className="radio-buttons">
                  <label>                    
                  <input
                    id="radio-view-random-json"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="json" 
                    defaultChecked />
                  JSON</label>

                  <label>
                  <input
                    id="radio-view-random-text"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="text" />
                  Text</label>

                  <label>
                  <input
                    id="radio-view-random-path"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="imagepath" />
                  Path</label>

                  <label>
                  <input
                    id="radio-view-random-image"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="image" />
                  Image</label>

                  <label>
                  <input
                    id="radio-view-random-tweet"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="tweet" />
                  Tweet</label>

                  <label>
                  <input
                    id="radio-view-random-tweetimage"
                    name="poegram-view-random"
                    type="radio"
                    onClick={(e) => this.setState({ viewRandomFormat: e.target.value })}
                    value="tweetimage" />
                  Tweet with image</label>

                </div>
                <button type="submit">View a Random Poegram</button>
                <p className="html-equiv">API equivalent: 
                <br/>
                <code>GET https://poegram.herokuapp.com
                  /api/v1/poegrams/random/?format={this.state.viewRandomFormat}</code></p>

              </form>
            </div>

            <hr />

            <h4>Create a Poegram</h4>
            <p><em>Authentication required.</em>
            <br />
            <em>Currently logged in as { this.state.username }</em></p>
            <div className="poegram-create">
              <form id="myForm" onSubmit={this.handleSubmit}>

                <select id='authorList' onChange={(e) => { this.setState({ author: e.target.value }) }} value={this.state.author}>
                  <option value='random'>Random Author</option>
                      {this.state.allAuthorsData.map((author, index) => <option key={index} value={author}>{author}</option>)}
                </select>

                <br />
                <div className="radio-buttons">
                  <label>
                  <input
                    id="radio-json"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="json" 
                    defaultChecked />
                  JSON</label>

                  <label>
                  <input
                    id="radio-text"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="text" />
                  Text</label>

                  <label>
                  <input
                    id="radio-path"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="imagepath" />
                  Path</label>

                  <label>
                  <input
                    id="radio-image"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="image" />
                  Image</label>

                  <label>
                  <input
                    id="radio-tweet"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="tweet" />
                  Tweet</label>

                  <label>
                  <input
                    id="radio-tweetimage"
                    name="poegram-create"
                    type="radio"
                    onClick={(e) => this.setState({ format: e.target.value })}
                    value="tweetimage" />
                  Tweet with image</label>

                </div>
                <button type="submit">Create a Poegram</button>
                <p className="html-equiv">API equivalent: 
                <br />
                <code>GET https://poegram.herokuapp.com
                  /api/v1/create/?author={this.state.author}&format={this.state.format}</code></p>

              </form>
              {/* <button onClick={this.handleGetMy}>Get My Poegrams</button> */}
            </div>

            <hr />

            <h4>View All Poegrams</h4>
            <p><em>JSON data only</em></p>
            <button type="submit">View all Poegrams</button>
            <p className="html-equiv">API equivalent: 
            <br />
            <code>GET https://poegram.herokuapp.com
              /api/v1/poegrams</code></p>
            <hr />

            <h4>View My Poegrams</h4>
            <p><em>JSON data only</em></p>
            <button onClick={ () => this.handleGetMy() }>View My Poegrams</button>
            <p className="html-equiv">API equivalent: 
            <br />
            <code>GET https://poegram.herokuapp.com
              /api/v1/poegrams/mine</code></p>
          </div>

          <div className="col-sm-7 offset-sm-1">
            <div className='results'>
              <h5>Results</h5>
              <hr />
                {/* <RenderPoegram poegram={this.state.data} format={this.state.sentFormat} /> */}
                { this.state.data.map((poegram, index) => <RenderPoegram key={index} poegram={poegram} format={this.state.sentFormat} /> )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
