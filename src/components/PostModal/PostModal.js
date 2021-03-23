import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from '@material-ui/core';

import './PostModal.scss';

const PostModal = ({
    isOpen,
    titleValue,
    bodyValue,
    changeBody,
    changeTitle,
    action,
    onClose,
    buttonTitle
}) => {
    return (
        <Modal 
            open={isOpen} 
            onClose={onClose}
            className="app-modal">
            <div className="app-modal__inner">
                <input className="app-modal__inner__input" value={titleValue} onChange={changeTitle}/>
                <input className="app-modal__inner__input" value={bodyValue} onChange={changeBody}/>
                <Button variant="contained" color="primary" onClick={action} title={buttonTitle}>
                    {buttonTitle}
                </Button>
            </div>
        </Modal>
    )
}
PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    titleValue: PropTypes.string.isRequired,
    bodyValue: PropTypes.string.isRequired,
    changeBody: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

export default PostModal
