import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';

import './Posts.scss';

import { Button } from '@material-ui/core';

import loadingGif from 'assets/loading.gif';
import fbService from 'api/fbService';
import { AppContext } from 'context/AppContext';
import { actionTypes } from 'context/actionTypes';
import PostModal from 'components/PostModal/PostModal';

class Posts extends Component {
    limit = 3;
    state = {
        start: 0,
        hasMore: true,
        loading: false,
        isModalOpen: false,
        titleValue: '',
        bodyValue: '',
    }

    static contextType = AppContext

    componentDidMount() {
        if(!this.context.state.posts) {
            fbService.getPosts(this.state.start, this.limit)
            .then(data => {
                this.context.dispatch({type: actionTypes.SET_POSTS, payload: { posts: data }})
            })
        }
    }
    getPost = () => {
        fbService.getPost()
        .then(resJson => {
            this.setState({
                posts: [...this.state.posts, resJson]
            })
        })
        .catch(err => {

        })
    }
    updatePost = () => {
        service.updatePost(1, { title: 'Updated Title' })
        .then(resJson => {
            const newPost = this.state.posts.map(elem => {
                if(elem.id === resJson.id) {
                    return resJson;
                } else {
                    return elem;
                }
            })
            this.setState({
                posts: newPost
            })
        })
    }
    createPost = () => {
        const createdPost = {
            title: this.state.titleValue,
            body: this.state.bodyValue,
            userId: 1
        }
        fbService.createPost(createdPost)
        .then(data => {
            this.context.dispatch({
                type: actionTypes.CREATE_POST,
                payload: {post: data}
            })
            this.toggleModal();
        })
    }
    
    deletePost = (id) => {
        service.deletePost(id)
        .then(data => {
            this.setState({
                posts: this.state.posts.filter((el) => {
                    return el.id !== id;
                })
            })
        })
    }
    loadMore = () => {
        const newStart = this.state.start + this.limit + 1;
        this.setState({
            start: newStart,
            loading: true
        })
        fbService.getPosts(newStart, newStart+this.limit)
        .then(data => {            
            const newLimit = this.limit + 1;
            this.context.dispatch({type: actionTypes.LOAD_MORE_POSTS, payload: {posts: data}})
            this.setState({
                hasMore: data.length < newLimit ? false : true,
                loading: false
            })
        })
        .catch(err => {

        })
    }

    removePost = (id) => {
        fbService.removePost(id)
        .then(data => {
            console.log(data);
            console.log(id);
            this.setState({
                posts: data
            })

        })
    }
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    changeTitle = (e) => {
        this.setState({
            titleValue: e.target.value
        })
    }

    changeBody = (e) => {
        this.setState({
            bodyValue: e.target.value
        })
    }
    render() {
        const { loading, hasMore, isModalOpen, bodyValue, titleValue} = this.state;
        const { state: {posts} } = this.context
        return (
        <AppContext.Consumer>
            {context => {
                const {state: {posts} } = context;
                return (
                    <div className="app-posts">
                        {posts ? 
                            <div>
                                <div className="app-posts__container">
                                    {
                                        posts.map(post => {
                                            return  <Post 
                                                        key={post.id}
                                                        post={post} 
                                                        className="app-posts__container__post"
                                                        link={true}
                                                        remove={() => this.removePost(post.id)}
                                                    />
                                        })
                                    }
                                </div> 
                                {hasMore ?  <Button variant="contained" onClick={this.loadMore} disabled={loading}>{loading ? <img src={loadingGif} alt="loading-gif" className="button-loading" /> :'Load more'}</Button>: null}
                            </div> :
                            <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" />
                        }
                        <Button variant="contained" onClick={this.toggleModal}>Create Post</Button>
                        <PostModal 
                            action={this.createPost}
                            bodyValue={bodyValue}
                            titleValue={titleValue}
                            changeTitle={this.changeTitle}
                            changeBody={this.changeBody}
                            onClose={this.toggleModal}
                            isOpen={isModalOpen}
                            buttonTitle="Create"
                        />
                    </div>
                )
            }}
        </AppContext.Consumer>
        )
    }
}

export default Posts;
