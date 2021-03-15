import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import PropTypes, { string } from 'prop-types';

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
                <input value={titleValue} onChange={changeTitle}/><br/>
                <input value={bodyValue} onChange={changeBody}/>
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
