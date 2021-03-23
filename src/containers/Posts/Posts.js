import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPosts, createPost, loadMorePosts } from '../../store/actions/app';

import fbService from 'api/fbService';

import Post from 'components/Post/Post';
import PostModal from 'components/PostModal/PostModal';

import loadingGif from 'assets/loading.gif';
import { Button } from '@material-ui/core';
import './Posts.scss'; 

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

    componentDidMount() {
        if(!this.props.posts) {
            fbService.getPosts(this.state.start, this.limit)
            .then(data => {
                this.props.setPosts(data);
                if(data.length < this.limit) {
                    this.setState({
                        hasMore: false
                    })
                }
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
        fbService.updatePost()
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
            this.props.createPost(data)
            this.toggleModal();
        })
    }
    
    loadMore = () => {
        const newStart = this.state.start + this.limit + 1;
        this.setState({
            start: newStart,
            loading: true
        }, 
        () => 
        fbService.getPosts(this.state.start, newStart+this.limit)
        .then(data => {          
            const newLimit = this.limit;
            this.props.loadMorePosts(data)
            this.setState({
                hasMore: data.length < this.limit ? false : true,
                loading: false
            })
        })
        .catch(err => {
            this.setState({
                hasMore: false,
                loading: false
            })
        }))
    }

    removePost = (id) => {
        fbService.removePost(id)
        .then(data => {
            this.props.setPosts(data)
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
                const { posts, user } = this.props
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
                                                        user={user}
                                                    />
                                        })
                                    }
                                </div> 
                                {hasMore ?
                                    <div className="app-posts__button-container">
                                        <Button className="app-posts__button" variant="contained" onClick={this.loadMore} disabled={loading}>
                                            {loading ? <img src={loadingGif} alt="loading-gif" className="button-loading" /> :'Load more'}
                                        </Button>
                                    </div>
                                   :
                                null}
                            </div> :
                            <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" />
                        }
                        <div className="app-posts__create">
                            <Button className="app-posts__button" variant="contained" onClick={this.toggleModal}>Create Post</Button>
                        </div>
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
    }
}

const mapStateToProps = state => {
    return {
        user: state.app.user,
        posts: state.app.posts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPosts: (posts) => dispatch(setPosts(posts)),
        createPost: (postData) => dispatch(createPost(postData)),
        loadMorePosts: (data) => dispatch(loadMorePosts(data))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

