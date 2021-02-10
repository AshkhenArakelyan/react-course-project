import React, { Component } from 'react';

import Post from 'components/Post/Post';

import './Posts.scss';

class Posts extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(resJson => {
            this.setState({
                posts: resJson
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="app-posts">
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
