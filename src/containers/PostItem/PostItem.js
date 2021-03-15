import React, { Component } from 'react';
import { Modal, Button } from '@material-ui/core';

import service from 'api/service';
import Post from 'components/Post/Post';

import './PostItem.scss';
import loadingGif from 'assets/loading.gif';
import fbService from 'api/fbService';
import { actionTypes } from 'context/actionTypes';
import { AppContext } from 'context/AppContext';
import PostModal from 'components/PostModal/PostModal';


class PostItem extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.postId);
        this.state = {
            postItem: null,
            isModalOpen: false,
            titleValue: '',
            bodyValue: '',
        }
    }
    static contextType = AppContext

    componentDidMount() {
        service.getPost(this.props.match.params.postId)
            .then(data => {
                this.setState({
                    postItem: data,
                    titleValue: data.title,
                    bodyValue: data.body
                })
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }

    savePost = () => {
        fbService.updatePost({
            ...this.state.postItem,
            title: this.state.titleValue,
            body: this.state.bodyValue
        })
        .then(res => {
            const updatedPost = {
                ...this.state.postItem,
                title: this.state.titleValue,
                body: this.state.bodyValue
            }
            this.setState({
                postItem: updatedPost,
                isModalOpen: false
            });
            const {state: {posts}} = this.context;
            if(posts && posts.find(el => el.id === this.state.post.id)) {
                this.context.dispatch({type: actionTypes.UPDATE_POST, payload: {post: updatedPost}})
            }
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
        const { postItem, isModalOpen, titleValue, bodyValue } = this.state;
        if(!postItem) {
            return <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" /> 
        } 
         return (
            <div className="app-post-item">
                <Post post={postItem} edit={this.toggleModal}/>
                <PostModal 
                    action={this.savePost}
                    bodyValue={bodyValue}
                    titleValue={titleValue}
                    changeTitle={this.changeTitle}
                    changeBody={this.changeBody}
                    onClose={this.toggleModal}
                    isOpen={isModalOpen}
                    buttonTitle="Save"
                />
            </div>
        )
    }
}

export default PostItem
