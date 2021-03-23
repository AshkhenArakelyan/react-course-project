import {combineReducers} from 'redux';
import todosReducer from './todos';
import appReducer from './app';

const allReducers = combineReducers({
    todos: todosReducer,
    app: appReducer
})

export default allReducers;