
import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    if (!this.props.user) {
      return null;
    }
    return (
        <div className="navigation">
            <Link to="/about">What is a Poegram?</Link>
            <span> | </span>
            <Link to="/login">Login</Link>
        </div>
    );
  }
}
