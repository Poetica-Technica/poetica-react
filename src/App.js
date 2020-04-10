import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from './Login.js';
import Navigation from './Navigation.js';
import Home from'./Home.js';
import About from'./About.js';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {

  componentDidMount = () => {
    //if theres a user in local storage put it in state
    if (localStorage.getItem('user')){this.setState({user:localStorage.getItem('user')})};
  }
  
  state = { user: null }
  setUser = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <header>
          <h3><a href="/">Poegram Demo</a></h3>
          <Navigation user={this.state.user}/>
        </header>
          <Switch>
            <Route exact path='/' render={() =>
              isLoggedIn()
                ? <Home />
                : <Redirect to='login' />
            } />
            <Route exact path="/login" render={(props) => <Login {...props} setUser={ this.setUser } user={this.state.user }/>} />
            <Route exact path="/about" render={(props) => <About {...props} setUser={ this.setUser } user={this.state.user }/>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
