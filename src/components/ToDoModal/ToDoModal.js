import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from '@material-ui/core';

import './ToDoModal.scss';

const ToDoModal = ({
    isOpen,
    textValue,
    changeText,
    create,
    onClose,
    update,
    action,
    todo
}) => {
    return (
        <Modal 
            open={isOpen} 
            onClose={onClose}
            className="app-modal">
            <div className="app-modal__inner">
                <input className="app-modal__inner__input" value={action == 'create' ? textValue : todo.text} onChange={changeText}/>
                <Button variant="contained" color="primary" onClick={action == 'create' ? create : update}>
                    {action == 'create' ? 'create' : 'edit'}
                </Button>
            </div>
        </Modal>
    )
}

ToDoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    todo: PropTypes.object,
    changeText: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ])
}

export default ToDoModal
