import React, { Component } from 'react';

import Post from 'components/Post/Post';
import service from 'api/service';

import './Posts.scss';

import { Button } from '@material-ui/core';

import loadingGif from 'assets/loading.gif';
import fbService from 'api/fbService';
import { AppContext } from 'context/AppContext';

class Posts extends Component {
    limit = 3;
    state = {
        start: 0,
        hasMore: true,
        loading: false
    }
   
    componentDidMount() {
        // console.log('hasMore: ', this.state.hasMore)

        // service.getPosts(this.state.start, this.limit)
        // service.getAllPosts()

        // .then(resJson => {
        //     this.setState({
        //         posts: resJson,
        //     })
        // })
        // .catch(err => {

        // })
        fbService.getPosts()
        .then(data => {
            this.setState({
                posts: data,
                // hasMore: data.length == 0 ? false : true
            })
        })
    }
    getPost = () => {
        fbService.getPost()
        .then(resJson => {
            this.setState({
                posts: [...this.state.posts, resJson] // two children with the same key
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
        // fbService.updatePost()
    }
    createPost = () => {
        fbService.createPost({
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
        // const newStart = this.state.start + this.limit;
        // this.setState({
        //     start: newStart,
        //     loading: true
        // })
        // service.getPosts(newStart)
        // .then(resJson => {
        //     console.log(resJson);
        //     this.setState({
        //         posts: [...this.state.posts, ...resJson],
        //         hasMore: resJson.length < this.limit ? false : true,
        //         loading: false
        //     })
        // })
        const newStart = this.state.start + this.limit + 1;
        this.setState({
            start: newStart,
            loading: true
        })
        fbService.getPosts(newStart, newStart+this.limit)
        .then(resJson => {            
            const newLimit = this.limit + 1;
            // console.log(newLimit);
            this.setState({
                posts: [...this.state.posts, ...resJson],
                hasMore: resJson.length < newLimit ? false : true,  ///// nayel
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
    
    render() {
        const { loading, hasMore, posts} = this.state;
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
                <Button variant="contained" onClick={this.createPost}>Create Post</Button>
            </div>
        )
    }
}

export default Posts;
