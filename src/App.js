import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './actions';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
       value: ''
    //   todos: [{
    //     task: 'do some stuff',
    //     id: 1,
    //     completed: false
    //     },{
    //     task: 'blah blah blah',
    //     id: 2,
    //     completed: true
    //   }]
    }

    //bind methods to the constructor
    this.addTodo = this.addTodo.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  //method to add todo list to todos array
  addTodo(e) {
    e.preventDefault();
    this.props.dispatch({ 
      type: ADD_TODO,
      task: this.state.value,
      id: new Date(),
      completed: false
    });
    this.setState({value: ''}) //clear the form input when done

    // const newTodo = {
    //   task: this.state.value,
    //   id: new Date(),
    //   completed: false
    // };
    // this.setState({
    // todos: [...this.state.todos, newTodo],
    // value: ''
    // })
  }

  // method to handle form input
  // keep using local state for this, no need for redux
  handleOnChange(e){
    this.setState({
      value: e.target.value
    })
  }

  //method to remove a todo item from todos array
  removeTodo(todo) {
    this.props.dispatch({ 
      type: REMOVE_TODO,
      id: todo.item.id,
    });
    // this.setState({
    //   todos: this.state.todos.filter(e => e !== todo.item)
    // })
  }

  // method to toggle todo state
  toggleTodo(todo) {
    console.log(todo)
    this.props.dispatch({
      type: TOGGLE_TODO,
      id: todo.id
    })


    // const i = this.state.todos.indexOf(todo) // figure out index of the item being toggled
    // let items = [...this.state.todos]; //copy state array, set to a variable (so we aren't manipulating state directly)
    // let item = items[i] // another placeholder variable for specific index
    //   item.completed = !todo.completed //update the property to opposite value (T to F, F to T)
    // items[i] = item // put new value back into copy of state array
    // // finally, update state with updated array
    // this.setState({
    //   todos: items
    // })
  }

  render() {
    
    return (
      <div className="container">
        <h1>Todo List:</h1>
        
        <List items={this.props.todos} removeTodo={this.removeTodo} toggleTodo={this.toggleTodo} />

        <form onSubmit={this.addTodo}>
        <input 
          type="text" 
          placeholder="What do you need to do?" 
          className="inputbox" 
          value={this.state.value}
          onChange={this.handleOnChange}
        /> <br />
        <input type="submit" className="button" value="Add!" />
        </form>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    todos: state.todos
  }
}

//export default App;
export default connect(mapStatetoProps)(App);
