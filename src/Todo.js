import React, { Component } from 'react';
// import * as firebase from 'firebase';
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
    }

    deleteTodoHandler(ev) {
        console.log(ev.target.value);
        return this.props.deleteHandler(ev.target.value);
    }

    render() {
        return (
            <div>
                {this.props.todos.map((v, i) => {
                    return (
                        <h1 key={i}>{v.todo} <button value={v.id} onClick={this.deleteTodoHandler}>Delete</button></h1>

                    )
                })
                }
            </div>
        )

    }

}

export default Todo;