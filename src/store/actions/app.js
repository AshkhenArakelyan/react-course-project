import { actionTypes } from '../types/app'

export const setPosts = (posts) => {
    return {
        type: actionTypes.SET_POSTS,
        payload: { posts }
    }
}

export const createPost = (postData) => {
    return {
        type: actionTypes.CREATE_POST,
        payload: {post: postData}
    }
}

export const updatePost = (postData) => {
    return {
        type: actionTypes.UPDATE_POST,
        payload: {post: postData}
    }
}

export const loadMorePosts = (data) => {
    return {
        type: actionTypes.LOAD_MORE_POSTS,
         payload: {posts: data}
        }
}

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {user} 
    }
}

export const removeUser = (user) => {
    return {
        type: actionTypes.REMOVE_USER,
        payload: {user: null} 
    }
}