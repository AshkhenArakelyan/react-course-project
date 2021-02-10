import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';

import './Posts.scss';

class Posts extends Component {

    state = {
        posts: [],
    }
   
    componentDidMount() {
        service.getAllPosts()
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
    render() {
        return (
            <div className="app-posts">
                <button onClick={this.getPost}>Get post</button>
                <button onClick={this.createPost}>Create Post</button>
                <button onClick={this.updatePost}>Update Post</button>
                {
                    this.state.posts.map(post => {
                        return <Post 
                                    key={post.id}
                                    post={post} 
                                    className="app-posts__post"
                                />
                    })
                }
            </div>
        )
    }
}

export default Posts;
