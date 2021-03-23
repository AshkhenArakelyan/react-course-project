import { actionTypes } from '../types/app'

export const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    posts: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case actionTypes.REMOVE_USER:
            return {
                ...state,
                user: null
            }
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case actionTypes.LOAD_MORE_POSTS:
            return {
                ...state,
                posts: [ ...state.posts , ...action.payload.posts]
            }
        case actionTypes.UPDATE_POST:
            console.log(action);
            return {
                ...state,
                posts: state.posts.map(el => {
                    if(el.id === action.payload.post.id) {
                        return action.payload.post
                    }
                    return el;
                })
            }
        case actionTypes.CREATE_POST:
            console.log(action);
            return {
                ...state,
                posts: [ ...state.posts , action.payload.post]
            }
        default:
             return state;
    }
}
export default appReducer;
