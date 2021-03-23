import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

import Link from 'components/Link/Link';

import './Post.scss';

const Post = (props) => {
    const { post, className = '', link = false, edit = () => {}, remove = () =>{}, user } = props;
    const removeHandler = (e) => {
        e.preventDefault();
        remove();
    }

    const Wrapper =({ children }) => {
        const postClassName=`app-post ${className}`;
        return link ?
        <Link to={`/posts/${post.id}`} className={postClassName}>
            {children}
            { user ? 
                <Button variant="contained" className="app-posts__delete-button" onClick={removeHandler}>
                    <DeleteIcon />
                </Button> :
                null
            }
        </Link> :
        <div className={postClassName}>
            {children}
            { user ? 
            <Button variant="contained" color="primary" onClick={edit}>
                <EditIcon />
            </Button> :
            null }
        </div>
    }
    return (
        <Wrapper>
            <div className="app-post__text">
                <h2 className="app-post__title">{post.title}</h2>
                <h5 className="app-post__body">{post.body}</h5>
            </div>
        </Wrapper>
    )
}

Post.propTypes = {
    post: PropTypes.exact({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userId: PropTypes.number,
    }),
    className: PropTypes.string,
    edit: PropTypes.func,
    remove: PropTypes.func,

}
export default withRouter(Post)
