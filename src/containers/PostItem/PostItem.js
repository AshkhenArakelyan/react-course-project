import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost } from '../../store/actions/app';

import service from 'api/service';
import fbService from 'api/fbService';

import Post from 'components/Post/Post';

import PostModal from 'components/PostModal/PostModal';
import loadingGif from 'assets/loading.gif';
import './PostItem.scss';

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postItem: null,
            isModalOpen: false,
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

            if(this.props.posts && this.props.posts.find(el => el.id === this.props.posts.id)) {
                this.props.updatePost(updatedPost)
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
                <Post post={postItem} edit={this.toggleModal} user={this.props.user} />
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

const mapStateToProps = state => {
    return {
        posts: state.app.posts,
        user: state.app.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePost: (posts) => dispatch(updatePost(posts)),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);