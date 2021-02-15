import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';

import './Posts.scss';

import loadingGif from 'assets/loading.gif';

class Posts extends Component {
    limit = 12;
    state = {
        posts: null,
        start: 0,
        hasMore: true,
        loading: false
    }
   
    componentDidMount() {
        service.getPosts(this.state.start, this.limit)
        .then(resJson => {
            this.setState({
                posts: resJson,
            })
        })
        .catch(err => {

        })
    }
    getPost = () => {
        service.getPost(1)
        .then(resJson => {
            this.setState({
                posts: [...this.state.posts, resJson] // two children with the same key
            })
        })
        .catch(err => {

        })
    }
    createPost = () => {
        service.createPost({
            title: 'My post title',
            body: 'My post body',
            userId: 1
        })
        .then(resJson => {
            this.setState({
                posts: [...this.state.posts, resJson]
            })
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
        const newStart = this.state.start + this.limit;
        this.setState({
            start: newStart,
            loading: true
        })
        service.getPosts(newStart)
        .then(resJson => {
            console.log(resJson);
            this.setState({
                posts: [...this.state.posts, ...resJson],
                hasMore: resJson.length < this.limit ? false : true,
                loading: false
            })
        })
        .catch(err => {

        })
    }
    render() {
        const { loading, hasMore, posts} = this.state;
        return (
            <div className="app-posts">
                {posts ? 
                    <>
                        <div className="app-posts__container">
                            {
                                posts.map(post => {
                                    return  <Post 
                                                key={post.id}
                                                post={post} 
                                                className="app-posts__container__post"
                                            />
                                })
                            }
                        </div> 
                        {hasMore ?  <button onClick={this.loadMore} disabled={loading}>{loading ? <img src={loadingGif} alt="loading-gif" className="button-loading" /> :'Load more'}</button>: null}
                    </> :
                    <img src={loadingGif} alt="loading-gif" className="app-posts__loading-image" />
                }
                <button onClick={this.getPost}>Get post</button>
                <button onClick={this.createPost}>Create Post</button>
                <button onClick={this.updatePost}>Update Post</button>
                <button onClick={() => this.deletePost(2)}>Delete Post</button>
            </div>
        )
    }
}

export default Posts;
