import { GET_TODOS } from '../types/todos';
import { CREATE_TODO } from '../types/todos';
import { UPDATE_TODO } from '../types/todos';


const initialState = {
    todos: null
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS: 
        return {
            ...state,
            todos: action.payload
        }
        case CREATE_TODO:
            return {
                ...state,
                todos: [ ...state.todos , action.payload]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(el => {
                    if(el.id === action.payload.id) {
                        return action.payload
                    }
                    return el;
                })
            }
        default:
             return state;
    }
}

export default todosReducer;