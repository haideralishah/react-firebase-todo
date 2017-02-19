import React, { Component } from 'react';
import * as firebase from 'firebase';
// var fb = firebase.initializeApp({
//     apiKey: "AIzaSyAUTWn2F8u3Q7oeYrYHp8OwsDajPk_RB-A",
//     authDomain: "test-01-141907.firebaseapp.com",
//     databaseURL: "https://test-01-141907.firebaseio.com",
//     storageBucket: "test-01-141907.appspot.com",
//     messagingSenderId: "906558294346"
// });

class Todo extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.todos, 'haider');
        this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
        this.editTodoHandler = this.editTodoHandler.bind(this);
        this.state = { todos: [] };
        firebase.database().ref('/todos').on('child_added', (data) => {
            let obj = data.val();
            obj.id = data.key;
            let currentTodos = this.state.todos;
            currentTodos.push(obj);
            this.setState({ todos: currentTodos })
            console.log(this.state.todos, 'obj');
        })
    }

    deleteTodoHandler(ev) {
        // console.log(ev.target.value);
        // return this.props.deleteHandler(ev.target.value);
        let todoKey = ev.target.dataset.id;
        firebase.database().ref('todos/' + todoKey).remove()
            .then((v) => {
                let currentTodo = this.state.todos;
                let indexRemove;
                for (var i = 0; i < currentTodo.length; i++) {
                    if (currentTodo[i].id === todoKey) {
                        indexRemove = i;
                    }
                }
                currentTodo = currentTodo.slice(0, indexRemove).concat(currentTodo.slice(indexRemove + 1));
                this.setState({ todos: currentTodo });
            });
    }

    editTodoHandler(ev) {
        console.log(ev.target.dataset.id, '*********');
        console.log(ev.target.dataset.todo, '*********');
    }

    render() {
        return (
            <div>
                {this.state.todos.map((v, i) => {
                    return (
                        <h1 key={i}>{v.todo} <button data-id={v.id} onClick={this.deleteTodoHandler}>Delete</button>  <button data-id={v.id} data-todo={v.todo} onClick={this.editTodoHandler}>Edit</button></h1>

                    )
                })
                }
                <br />   <br />

                {(this.state.todos.length > 0) ? <h2>Hello World Bindaaaas</h2> : this.props.children}

            </div>
        )

    }

}

export default Todo;