import { CREATE_TODO } from '../types/todos';
import { GET_TODOS } from '../types/todos';
import { UPDATE_TODO } from '../types/todos';


export const getTodos = (todos) => {
    return {
        type: GET_TODOS,
        payload: todos
    }
}

export const createTodo = (todo) => {
    return {
        type: CREATE_TODO,
        payload: todo
    }
}

export const updateTodo = (todo) => {
    return {
        type: UPDATE_TODO,
        payload: todo
    }
}