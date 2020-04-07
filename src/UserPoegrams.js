
import React from 'react';
import SearchBar from './Search.js';
import TranslationList from './PoegramList.js';
import { searchTranslations } from './api.js';


export default class UserTranslations extends React.Component {

  state={translations:[], searchQuery:''}
  componentDidMount= async() => {
    const user=JSON.parse(localStorage.getItem('user'));
    const data=await searchTranslations(user.id, this.state.searchQuery);
    this.setState({translations:data.body});
  }

  handleSearch=async(tag_id, e) => {
    e.preventDefault()
    console.log(tag_id)
   const user=JSON.parse(localStorage.getItem('user'));
   const data=await searchTranslations(user.id, tag_id)
   this.setState({translations:data.body});
  }

  handleChange=e => {this.setState({searchQuery:e.target.value})}

  updateTranslations=async() => {
    const user=JSON.parse(localStorage.getItem('user'));
    const data=await searchTranslations(user.id, this.state.searchQuery);
    this.setState({translations:data.body});
  }

  render() {
    console.log(this.state.translations)

    return (
        <div>
            <SearchBar handleSearch={this.handleSearch} handleChange={this.handleChange} searchQuery={this.state.searchQuery}/>
            <TranslationList translations={this.state.translations} updateTranslations = {this.updateTranslations}/>
        </div>
    );
  }
}