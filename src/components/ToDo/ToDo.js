import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import done from 'assets/done.png';

import './ToDo.scss';

const Todo = (props) => {
    const { todo, className = '', toggleModal = () => {}, remove = () =>{}, toggleTodo = () =>{}, user } = props;
    const removeHandler = (e) => {
        e.preventDefault();
        remove();
    }
        const todoClassName = `app-todo ${className}`;
        return (<div className={todoClassName}>
            { user ? 
            <>
            <h2 className="app-todo__text">{todo.text}</h2>
            <div className="app-todo__buttons">
                { todo.done ? 
                    <div className="app-todo__buttons__done" onClick={() => toggleTodo(todo)}>
                        <img className="app-todo__buttons__done__image" src={done} alt="done-image"/>
                    </div> : 
                    <div className="app-todo__buttons__progress" onClick={() => toggleTodo(todo)}></div>
                }
                <Button className="app-todo__buttons__button" variant="contained" color="primary" onClick={() => toggleModal('update', todo)}>
                    <EditIcon />
                </Button>
                <Button className="app-todo__buttons__button" variant="contained" className="app-todos__delete-button" onClick={removeHandler}>
                    <DeleteIcon />
                </Button> 
            </div>
                
            </> :
            <h2>{todo.text}</h2> }
        </div>)
    }

Todo.propTypes = {
    todo: PropTypes.exact({
        text: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userId: PropTypes.number,
        done: PropTypes.bool,
    }),
    className: PropTypes.string,
    edit: PropTypes.func,
    remove: PropTypes.func,
    toggleTodo: PropTypes.func,
}
export default withRouter(Todo)
