import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';

import Link from 'components/Link/Link';
import './Post.scss';

const Post = ({post, className = '', link = false, edit = () => {} }) => {
    const Wrapper =({ children }) => {
        const postClassName = `app-post ${className}`;
        return link ?
        <Link to={`/posts/${post.id}`} className={postClassName}>
            {children}
        </Link> :
        <div className={postClassName}>
            {children}
            <Button variant="contained" color="primary" onClick={edit}>
                <EditIcon />
            </Button>
           
        </div>
    }
    return (
        <Wrapper>
            <h2 className="app-post__title">{post.title}</h2>
            <h5 className="app-post__body">{post.body}</h5>
        </Wrapper>
    )
}

Post.propTypes = {
    post: PropTypes.exact({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userId: PropTypes.number,
        edit: PropTypes.func
    }),
    className: PropTypes.string,
}
export default withRouter(Post)
