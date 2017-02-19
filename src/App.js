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
    this.state = { todos: [] };
    // fb.database().ref('/todos').on('child_added', (data) => {
    //   let obj = data.val();
    //   obj.id = data.key;
    //   let currentTodos = this.state.todos;
    //   currentTodos.push(obj);
    //   this.setState({ todos: currentTodos })
    //   console.log(this.state.todos, 'obj');
    // })
  }

  addTodo(ev) {
    ev.preventDefault();
    fb.database().ref('todos/').push({ todo: this.refs.todo.value })
      .then((v) => {

      })
    this.refs.todo.value = '';
  }
  // deleteTodo(todoKey) {
  //   fb.database().ref('todos/' + todoKey).remove()
  //     .then((v) => {
  //       let currentTodo = this.state.todos;
  //       let indexRemove;
  //       for (var i = 0; i < currentTodo.length; i++) {
  //         if (currentTodo[i].id === todoKey) {
  //           indexRemove = i;
  //         }
  //       }
  //       currentTodo = currentTodo.slice(0, indexRemove).concat(currentTodo.slice(indexRemove+1));
  //       this.setState({ todos: currentTodo });
  //     });
  // }
  render() {
    return (
      <div className="App">
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
