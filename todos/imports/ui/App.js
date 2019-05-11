import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Lists } from '../api/tasks.js';
import Task from './Task.js';


 
// App component - represents the whole app

 class App extends Component {
	 handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 	if(text == ''){
		alert('Заполните поле с задачей!');
	} else{
		Lists.insert({
      text,
      createdAt: new Date(), // current time
    });
	}
    
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
	 
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (<div>
      <div className="list__header">
	 <h1>Список дел</h1>
</div>
<div className="list__add">
<form className="new-task"  onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Задача ..."
            />
			<input
			type="submit"
			ref="textSubmit"
			value="Добавить"
			
				/>
          </form>
</div>
<div className="list__show">
	<h2>Добавленные задачи</h2>
	<ul>
          {this.renderTasks()}
        </ul>
</div>
</div>
    );
  }
}


export default withTracker(() => {
  return {
    tasks: Lists.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);