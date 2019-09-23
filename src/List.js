import React from 'react';
import './App.css';


class List extends React.Component {

	// this method is like a callback function to the higher component's removeTodo function
	removeItem(item) {
		this.props.removeTodo(item)
	}

	// callback function to pass state back up to parent component
	toggleItem(item) {
		this.props.toggleTodo(item)
	}

	render() {
		return(
			<div>
			<ul>
			{this.props.items.map((item, index) => (
				<li key={index}>
					<input type="checkbox" checked={item.completed} onChange={() => {this.toggleItem(item)}} />
					<span style={{textDecoration: item.completed ? 'line-through': 'none' }} >
					{item.task}
					</span>
					<button 
					className="button-close" 
					onClick={
						() => {this.removeItem({item})}
					}>X</button>
				</li>
			))}
			</ul>
			</div>
		)
	}
}

export default List;