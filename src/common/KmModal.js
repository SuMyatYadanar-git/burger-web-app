import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const KmModal = props => {
    const { isOpen, style, contentLabel } = props;
    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={this.afterOpenModal}
            // onRequestClose={onRequestClose}
            style={style}
            contentLabel={contentLabel}
            // ariaHideApp={false}
        >
            {props.children}
        </Modal>
    )
}

export default KmModal;