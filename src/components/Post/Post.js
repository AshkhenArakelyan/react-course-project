import React from 'react';
import PropTypes from 'prop-types';

import './Post.scss';

const Post = ({post, className=''}) => {
    return (
        <div className={`app-post ${className}`}>
            <h2 className="app-post__title">{post.title}</h2>
            <h5 className="app-post__body">{post.body}</h5>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.exact({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        userId: PropTypes.number
    }),
    className: PropTypes.string,
}
export default Post
