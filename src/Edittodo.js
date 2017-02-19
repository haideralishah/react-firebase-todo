import React, { Component } from 'react';
import * as firebase from 'firebase';

class Edittodo extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.saveEditedTodo = this.saveEditedTodo.bind(this);
    }

    saveEditedTodo(ev) {
        ev.preventDefault();
        console.log(this.refs.editedTodo.value, '++++++++++++++');
        console.log(this.props.editObj.id);
        firebase.database().ref('todos/' + this.props.editObj.id).set({
            todo: this.refs.editedTodo.value
        });
        return this.props.editingHandler();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.saveEditedTodo}>
                    <input type="text" defaultValue={this.props.editObj.todo} ref='editedTodo' />
                    <button>Save</button>
                </form>

            </div>

        )
    }
}


export default Edittodo;
