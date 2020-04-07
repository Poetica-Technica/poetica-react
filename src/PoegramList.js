// List of translations
import React from 'react';
import './TranslationList.css';
import { getTranslations, deleteTranslation } from './api.js';

export default class TranslationList extends React.Component {
    state={translations:[]}

  
    componentDidMount = async () => {
      this.setState({ tags: JSON.parse((await getTranslations()).text) });
    }


render () {
        return (
          <ul className="transaction-list">
            {this.props.translations.map((translation, index) => (
              <li key={index} item={translation}>
              <button onClick={async () => { 
                await deleteTranslation(translation.id)
                this.props.updateTranslations()
                }}>X</button>
                <div id="translated-text">{translation.translated}</div>
                <div id="username">{translation.user}</div>
              </li>
            ))}
          </ul>
    );
            };
          }
  
