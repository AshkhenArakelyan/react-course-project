import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getTodos, createTodo, updateTodo } from '../../store/actions/todos';
import fbService from 'api/fbService';

import ToDo from 'components/ToDo/ToDo';
import ToDoModal from 'components/ToDoModal/ToDoModal';

import { Button } from '@material-ui/core';
import loadingGif from 'assets/loading.gif';
import './Todos.scss';

const Todos = (props) => {
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [todo, setTodo] = useState({
        text: '',
        done: false,
        userId: 1
    })
    const [action, setAction] = useState('')
    
    useEffect(() => {
        fbService.getAllToDos()
            .then(data => {
                props.getTodos(data);
                setLoading(false)
        });
      },[]);
  
    const updateTodo = () => {
        fbService.updateToDo(todo)
        .then(resJson => {
            props.updateTodo(resJson)
            setIsModalOpen(!isModalOpen)
        })
    }
    const createTodo = () => {
        fbService.createTodo(todo)
        .then(data => {
            props.createTodo(data)
            toggleModal();
        })
    }

    const removeTodo = (id) => {
        fbService.removeTodo(id)
        .then(data => {
            props.getTodos(data)
        })
    }
    const toggleModal = (action, todo) => {
        setAction(action)

        if(action == 'update') {
            setTodo(todo)
        }

        setIsModalOpen(!isModalOpen)
    }

    const toggleTodo = (todo) => {
        todo.done = !todo.done

        fbService.updateToDo(todo)
        .then(resJson => {
            props.updateTodo(resJson)
        })
    }

    const changeText = (e) => {
        setTodo({
            ...todo,
            text: e.target.value
        })
    }
    return (
        <>
        <Button className="app-create-button" variant="contained" onClick={() => toggleModal('create')}>Create</Button>
        {!loading ? 
            <>
            <div className="app-todos">
                {
                props.todos.map((todo, i) => {
                return <ToDo
                            key={i}
                            todo={todo}
                            className="app-todos__container__todo"
                            link={true}
                            remove={() => removeTodo(todo.id)}
                            user={props.user}
                            action={action}
                            toggleModal={toggleModal}
                            toggleTodo={toggleTodo}
                />
                })
                }
            </div>
            <ToDoModal 
                create={createTodo}
                update={updateTodo}
                todo={todo}
                changeText={changeText}
                onClose={toggleModal}
                isOpen={isModalOpen}
                action={action}
            />
            </>
         : <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.app.user,
        todos: state.todos.todos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodos: (todos) => dispatch(getTodos(todos)),
        createTodo: (todo) => dispatch(createTodo(todo)),
        updateTodo: (todo) => dispatch(updateTodo(todo)),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Todos);