import React, { Component } from 'react';
import logo from './logo.svg';
import Todo from './Todo.js';
import './App.css';
import * as firebase from 'firebase';
var fb = firebase.initializeApp({
  apiKey: "AIzaSyAUTWn2F8u3Q7oeYrYHp8OwsDajPk_RB-A",
  authDomain: "test-01-141907.firebaseapp.com",
  databaseURL: "https://test-01-141907.firebaseio.com",
  storageBucket: "test-01-141907.appspot.com",
  messagingSenderId: "906558294346"
});

class App extends Component {

  constructor(props) {
    super(props);
    // this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signin = this.signin.bind(this);
    this.state = { todos: [] };
  }

  addTodo(ev) {
    ev.preventDefault();
    fb.database().ref('todos/').push({ todo: this.refs.todo.value })
      .then((v) => {
        this.refs.todo.value = '';
      })

  }

  signUp(ev) {
    ev.preventDefault();
    console.log(this.refs.email.value);
    console.log(this.refs.password.value);
    firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value)
      .then((user) => {
        let userDetails = {
          email: user.email,
          uid: user.uid,
          cell: '03413542800'
        }
        firebase.database().ref('users/' + user.uid).set(userDetails)

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, 'errorCode');
        console.log(errorMessage, 'errorMessage');
        // ...
      });
  }
  signin(ev) {
    ev.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value)
      .then((user) => {
        console.log(user, 'signed in user');
      })

      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, 'errorCode');
        console.log(errorMessage, 'errorMessage');
      });
  }

  render() {
    return (
      <div className="App">

        <div>
          <form onSubmit={this.signUp}>
            <input type="email" ref='email' />
            <input type="password" ref='password' />
            <button>Signup</button>
          </form>
        </div>


        <div>
          <form onSubmit={this.signin}>
            <input type="email" ref='email' />
            <input type="password" ref='password' />
            <button>Signin</button>
          </form>
        </div>

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <br /><br />
        <form onSubmit={this.addTodo}>
          <input type="text" ref='todo' />
          <button>Add Todo</button>
        </form>
        <br /><br />
        <Todo ></Todo>
      </div>
    );
  }
}

export default App;
