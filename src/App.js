import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import About from './About.js';
import RecentTranslations from './RecentTranslations.js';
import UserTranslations from './UserTranslations.js';
import Login from './Login.js';
import Translate from './Translate.js';
import Navigation from './Navigation.js';

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
          <h3>Bard of Avon</h3>
        </header>
        <BrowserRouter>
        <Navigation user={this.state.user}/>
          <Switch>
            <Route exact path='/' render={() =>
              isLoggedIn()
                ? <Translate />
                : <Redirect to='login' />
            } />
            <Route path='/about' component={About} />
            <Route exact path="/login" render={(props) => <Login {...props} setUser={ this.setUser } user={this.state.user }/>} />
            <Route path='/recent' component={RecentTranslations} />
            <Route path='/client' component={UserTranslations} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
