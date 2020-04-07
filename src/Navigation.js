
import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    if (!this.props.user) {
      return null;
    }
    return (
        <div className="navigation">
            <Link to="/">Translate</Link>
            <Link to="/client">My Translations</Link>
            <Link to="/recent">Recent Translations</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
        </div>
    );
  }
}
