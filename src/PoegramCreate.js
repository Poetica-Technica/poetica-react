// Enter new translation
import React from 'react';
import './PoegramCreate.css'
import { getPoegram, savePoegram, getTags } from './api.js';

export default class PoegramCreate extends React.Component {
  state = {
    original_text: '',
    translated: '',
    tag: 1,
    tags: [],
    message: ''
  }

  componentDidMount = async () => {
    this.setState({ tags: JSON.parse((await getTags()).text) });
  }

  handleTranslate = async () => {
    const translatedText = await getPoegram(this.state.original_text);
    this.setState({ translated: translatedText.text, message: ''});
  }

  handleSave = async () => {
    if (this.state.original_text === '' || this.state.translated === '') {
      this.setState({ message: 'Null' });
      return;
    }
    await savePoegram(this.state.original_text, this.state.translated, this.state.tag);
    this.setState({ message: 'Poegram saved.' });
  }

  render() {
    return (
      <div className="translation-create">
        <textarea onChange={(e) => this.setState({ original_text: e.target.value })} >
          {this.state.original_text}
        </textarea>
        <br />
        <button id="translate-button" onClick={this.handleTranslate}>Translate</button>
        <p>
          {this.state.translated}
        </p>
        <select onChange={(e) => this.setState({tag: e.target.value})}>
          {this.state.tags.map(tag => <option value={tag.id}>
            {tag.value}
          </option>)}
        </select>
        <button onClick={this.handleSave}>Save</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
