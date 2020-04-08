import React from 'react';
import './app.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import About from './About.js';
import Login from './Login.js';
import Navigation from './Navigation.js';
import TestFile from'./TestFile.js';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
  componentDidMount = () => {
    //if theres a user in local storage put it in state
    if (localStorage.getItem('user')){this.setState({user:localStorage.getItem('user')})};
  }
  state={user: null}
  setUser= (user) => {
    this.setState({user:user})
  }
  render() {
    return (
      <div className="App">
        <header>
          <h3>Poegram</h3>
        </header>
        <BrowserRouter>
        <Navigation user={this.state.user}/>
          <Switch>
            <Route exact path='/' render={() =>
              isLoggedIn()
                ? <TestFile />
                : <Redirect to='login' />
            } />
            <Route path='/about' component={About} />
            <Route exact path="/login" render={(props) => <Login {...props} setUser={ this.setUser } user={this.state.user }/>} />
            {/* <Route path='/client' component={UserPoegrams} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
