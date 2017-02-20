import React, { Component } from 'react';
import * as firebase from 'firebase';
import Edittodo from './Edittodo.js';

class Todo extends Component {

    constructor(props) {
        super(props);
        this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
        this.editTodoHandler = this.editTodoHandler.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.state = {
            todos: [],
            editTodo: false,
            editObj: {}
        };
        firebase.database().ref('/todos').on('child_added', (data) => {
            let obj = data.val();
            obj.id = data.key;
            let currentTodos = this.state.todos;
            currentTodos.push(obj);
            this.setState({ todos: currentTodos })
            console.log(this.state.todos, 'obj');
        })
        firebase.database().ref('/todos').on('child_changed', (data) => {
            let obj = data.val();
            obj.id = data.key;
            let currentTods = this.state.todos;
            let indexRemove;
            for (var i = 0; i < currentTods.length; i++) {
                if (currentTods[i].id === obj.id) {
                    indexRemove = i;
                }
            }
            currentTods = currentTods.slice(0, indexRemove).concat(obj).concat(currentTods.slice(indexRemove + 1));

            // currentTodos.push(obj);
            this.setState({ todos: currentTods })
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
        // this.setState({ editTodo: true });
        this.toggleEdit();
        let editObj = {
            id: ev.target.dataset.id,
            todo: ev.target.dataset.todo
        }
        console.log(editObj, 'editObj');
        this.setState({ editObj: editObj });
    }
    toggleEdit() {
        this.setState({ editTodo: !this.state.editTodo });
    }

    render() {
        return (
            <div>
                {this.state.todos.map((v, i) => {
                    return (
                        <h1 key={i}>{v.todo} {(!this.state.editTodo) ? (<span><button data-id={v.id} onClick={this.deleteTodoHandler}>Delete</button> <button data-id={v.id} data-todo={v.todo} onClick={this.editTodoHandler}>Edit</button></span>) : ''}</h1>
                    )
                })
                }
                <br />   <br />

                {(this.state.editTodo) ? <Edittodo editObj={this.state.editObj} editingHandler={this.toggleEdit}></Edittodo> : ''}

            </div>
        )

    }

}

export default Todo;