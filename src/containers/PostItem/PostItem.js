import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

import service from 'api/service';
import Post from 'components/Post/Post';

import './PostItem.scss';
import loadingGif from 'assets/loading.gif';

class PostItem extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.postId);
        this.state = {
            postItem: null,
            isEditOpen: false,
            titleValue: '',
            bodyValue: '',
        }
    }

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

    toggleEditModal = () => {
        this.setState(prevState => ({
            isEditOpen: !prevState.isEditOpen
        }))
    }

    savePost = () => {
        service.updatePost(this.state.postItem.id, {
            ...this.state.postItem,
            title: this.state.titleValue,
            body: this.state.bodyValue
        })
        .then(res => {
            console.log(res)
            this.setState({
                postItem: {...this.state.postItem, title: this.state.titleValue, body: this.state.bodyValue},
                isEditOpen: false
            })
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
        const { postItem, isEditOpen, titleValue, bodyValue } = this.state;
        if(!postItem) {
            return <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" /> 
        } 
         return (
            <div className="app-post-item">
                <Post post={postItem} edit={this.toggleEditModal}/>
                <Modal 
                    open={isEditOpen} 
                    onClose={this.toggleEditModal}
                    className="app-post-item__edit-modal">
                    <div className="app-post-item__edit-modal__inner">
                        <input value={titleValue} onChange={this.changeTitle}/><br/>
                        <input value={bodyValue} onChange={this.changeBody}/>
                        <Button variant="contained" color="primary" onClick={this.savePost}>
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PostItem
