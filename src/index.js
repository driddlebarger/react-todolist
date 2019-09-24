import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

// define initial state 
const initialState = {
	todos: [{
        task: 'do some stuff',
        id: 1,
        completed: false
        },{
        task: 'testing stuff',
        id: 2,
        completed: true
    	}]
    }


// reducer function -- takes in current state, action, returns new state
function reducer(state = initialState, action) {
	//console.log('reducer', state, action) 
	
	switch(action.type) {
		case 'ADD_TODO':
			return Object.assign({}, state, {		
			// need to use object.assign and return a new object, since it can't manipulate state directly
				todos: [...state.todos, 
				{
					task: action.task,
					id: action.id,
					completed: action.completed
				}
				]})
		
		case 'REMOVE_TODO':
			return Object.assign({}, state, {
				todos: state.todos.filter(e => e.id !== action.id)
			})
		
		case 'TOGGLE_TODO':
			return Object.assign({}, state, {		// "clone" the current state into an empty object
				todos: state.todos.map((e) => {   	// map over todos array, e={task:, id:, completed:}
					if (e.id === action.id) {	  	// look at each element 'e' to see whether the todo id = the action id
						return Object.assign({}, e, {
							completed: !e.completed  //set completed equal to its opposite
						})
					}
					return e;						//return the remainder of the array being mapped 
				})
			})

		default:
			return state;
	}
}

// define redux store
const store = createStore(reducer);	

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, 
	document.getElementById('root'));


