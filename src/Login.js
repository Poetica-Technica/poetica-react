import React, { Component } from 'react'
import request from 'superagent';
import './Login.css';

export default class TodoListLogin extends Component {
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    // You could move these to api.js:

    handleSignIn = async () => {
        //wrapping this function in a try catches them with an error so it doesnt go to the big error
        // try catch:
        try{
        const signIn = await request.post(`https://serene-springs-71594.herokuapp.com/api/auth/signin`, {
            email: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        });
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.setUser(signIn.body);
        this.props.history.push('/');
    } catch(e) {
        console.error(e)
    }
    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://serene-springs-71594.herokuapp.com/api/auth/signup`, {
            email: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })

        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.setUser(signUp.body);
        this.props.history.push('/');
         console.log(this.props.history);
    }

    render() {
        return (
            <div className="login">
                <img className="shakespeare-portrait" src="shakespeare.jpg" alt="Shakespeare" />
                <input placeholder="Username" value={ this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value})} />
                <input placeholder="Password" value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                <button onClick={ this.handleSignUp }>Sign up</button>
                <button onClick={ this.handleSignIn }>Sign in</button>
   
            </div>
        )
    }
}