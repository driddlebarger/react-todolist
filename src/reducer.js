import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions';
import {FETCH_TODOS_BEGIN, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE} from './fetchActions';

//define initial state 
const initialState = {
	todos: [],
    loading: false,
    error: null
    }

// reducer function -- takes in current state, action, returns new state
export default function reducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_TODOS_BEGIN:
		// update loading to true
			return {
				...state,
				loading: true,
				error: null
			}

		case FETCH_TODOS_SUCCESS:
		// update loading to false
		// put payload into store
			return {
				...state,
				loading: false,
				todos: action.payload.todos
			}

		case FETCH_TODOS_FAILURE: 
		// update loading to false
		// put error into store
			return {
				...state,
				loading: false,
				error: action.payload.error,
				todos: [] //if error, clear the data
			}

		case ADD_TODO:
			console.log(action)
			return Object.assign({}, state, {		
			// need to use object.assign and return a new object, since it can't manipulate state directly
				todos: [...state.todos, 
				{
					title: action.title,
					id: action.id,
					completed: action.completed
				}
				]})
		
		case REMOVE_TODO:
			return Object.assign({}, state, {
				todos: state.todos.filter(e => e.id !== action.id)
			})
		
		case TOGGLE_TODO:
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