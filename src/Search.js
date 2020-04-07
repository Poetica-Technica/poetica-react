// Search translations by tag 
// Stretch: by user on recents?
import React, { Component } from 'react'
import { getTags } from './api';



export default class SearchBar extends Component {

  state={tags:[], searchQuery:''}
  componentDidMount= async() => {
    const data=await getTags()
    this.setState({tags:data.body});
  }

    render() {
      console.log(this.props, 'props')
        return (
            <form onSubmit={(e) => this.props.handleSearch(this.props.searchQuery, e)}>
                <select onChange={this.props.handleChange}>
                  {this.state.tags.map(tag => 
                  <option value={tag.value}>
                  {tag.value}
                  </option>)}
                </select>
                <button>Search</button>
            </form>
        )
    }
}
