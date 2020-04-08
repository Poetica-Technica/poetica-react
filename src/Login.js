import React, { Component } from 'react'
import request from 'superagent';
import './Login.css';

const URL='http://localhost:7890';

export default class TodoListLogin extends Component {
    state = {
        username: '',
        password: '',
    }

    handleLogin = async () => {
        //wrapping this function in a try catches them with an error so it doesnt go to the big error
        // try catch:
        try {
            const login = await request.post(`${URL}/api/v1/users/login`, {
                username: this.state.username,
                password: this.state.password
            }).withCredentials();
            console.log('login response: ', login);
            localStorage.setItem('user', JSON.stringify(login.body));
            this.props.setUser(login.body);
            this.props.history.push('/');
        } catch(e) {
            console.error(e)
        }
    }

    handleSignUp = async () => {
        try {
            const signUp = await request.post(`${URL}/api/v1/users/signup`, {
                username: this.state.username,
                password: this.state.password,
            })
            localStorage.setItem('user', JSON.stringify(signUp.body));
            this.props.setUser(signUp.body);
            this.props.history.push('/');
        } catch(e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div className="login">
                <input placeholder="Username" value={ this.state.username} onChange={(e) => this.setState({ username: e.target.value})} />
                <input placeholder="Password" value={ this.state.password} onChange={(e) => this.setState({ password: e.target.value})} />

                <button onClick={ this.handleSignUp }>Sign up</button>
                <button onClick={ this.handleLogin }>Login</button>
   
            </div>
        )
    }
}