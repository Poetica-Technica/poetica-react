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
    username: '',
    loading: false
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

  handleCreateSubmit = async (e) => {    
    e.preventDefault();
    this.setState({ loading: true });
    const createdPoegram = await createPoegram(this.state.author, this.state.format);
    this.setState({ data: [createdPoegram], sentFormat: this.state.format, loading: false });
  }

  handleViewRandomSubmit = async (e) => {    
    e.preventDefault();

    this.setState({ loading: true });
    const randomPoegram = await getRandomPoegram(this.state.viewRandomFormat);
    if (this.state.viewRandomFormat === 'image') {
      const imageUrl = URL.createObjectURL(randomPoegram);
      this.setState({ data: [imageUrl], sentFormat: this.state.viewRandomFormat });
    }
    else this.setState({ data: [randomPoegram], sentFormat: this.state.viewRandomFormat, loading: false });
  }

  handleGetAll = async () => {    
    const allPoegrams = await getAllPoegrams();
    this.setState({ loading: true });
    this.setState({ data: allPoegrams, sentFormat: 'json', loading: false });
  }
  
  handleGetMy = async () => {    
    const myPoegrams = await getMyPoegrams();
    this.setState({ loading: true });
    this.setState({ data: myPoegrams, sentFormat: 'json', loading: false });
  }


  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h4>View a Random Poegram</h4>
            <form id="viewRandomForm" onSubmit={this.handleViewRandomSubmit}>

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

            <hr />

            <h4>Create a new Poegram</h4>
            <form id="createForm" onSubmit={this.handleCreateSubmit}>

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
              <p className="api-note">Note: Authentication required.
              <br />
              Currently logged in as <strong>{ this.state.username }</strong>.</p>

            </form>

            <hr />

            <h4>View multiple Poegrams</h4>
            <button onClick={ () => this.handleGetAll() }>View all Poegrams</button>
            <button onClick={ () => this.handleGetMy() }>View my Poegrams</button>
            <p className="html-equiv">API equivalent: 
            <br />
            <code>GET https://poegram.herokuapp.com
              /api/v1/poegrams/mine</code>
            <br />
            <code>---</code>
            <br />
            <code>GET https://poegram.herokuapp.com
              /api/v1/poegrams</code></p>
              <p className="api-note">Note: JSON data only</p>
          </div>

          <div className="col-sm-7 offset-sm-1">
            <div className="sticky-top">
            <div className='results'>
              <h5>Results</h5>
              <hr />
              { this.state.loading &&
                <div className='loading'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading" />
                </div>
              }
              { !this.state.loading &&
                this.state.data.map((poegram, index, arr) => <RenderPoegram key={index} poegram={poegram} format={this.state.sentFormat} index={index} length={arr.length} /> )
              }
              { this.state.sentFormat === '' && !this.state.loading &&
                  <p><em>View or create a Poegram from the buttons at left to see results here.</em></p>
              }
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
