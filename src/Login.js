import React, { Component } from 'react'
import request from 'superagent';
import { URL } from './api.js';
import './Login.css';


export default class TodoListLogin extends Component {
    state = {
        username: '',
        password: '',
        loginError: ''
    }

    handleLogin = async () => {
        try {
            const login = await request.post(`${URL}/auth/login`, {
                username: this.state.username,
                password: this.state.password
            }).withCredentials();
            localStorage.setItem('user', JSON.stringify(login.body));
            this.props.setUser(login.body);
            this.props.history.push('/');
        } catch(e) {
            console.error(e)
            this.setState({ loginError: e.response.body.message })
        }
    }

    handleSignUp = async () => {
        try {
            const signUp = await request.post(`${URL}/auth/signup`, {
                username: this.state.username,
                password: this.state.password,
            }).withCredentials();
            localStorage.setItem('user', JSON.stringify(signUp.body));
            this.props.setUser(signUp.body);
            this.props.history.push('/');
        } catch(e) {
            console.error(e)
            this.setState({ loginError: e.response.body.message })
        }
    }

    handleLogout = async () => {
        try {
            localStorage.clear();
            this.props.setUser(null);
            this.props.history.push('/');
        } catch(e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div className='login'>
                <h4>Login</h4>
                <input placeholder='Username' value={ this.state.username } onChange={(e) => this.setState({ username: e.target.value})} />
                <input placeholder='Password' type='password' value={ this.state.password } onChange={(e) => this.setState({ password: e.target.value})} />

                <button onClick={ this.handleLogin }>Login</button>
                <button onClick={ this.handleSignUp }>Sign up</button>
                { this.state.loginError && <p className='login-error'>{this.state.loginError}</p> }
                <p className="html-equiv">API equivalents: 
                <br />
                <code>POST https://poegram.herokuapp.com/auth/login</code>
                <br />
                <code>POST https://poegram.herokuapp.com/auth/signup</code>
                <br />
                <br />
                </p>
                <p className='api-note'>Include "username" and "password" key/value pairs in your JSON-formatted body.</p>
                <br />
                <button onClick={ this.handleLogout }>Logout</button>
   
            </div>
        )
    }
}