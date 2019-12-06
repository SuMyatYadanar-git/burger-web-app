import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const KmModal = props => {
    const { isOpen, contentLabel } = props;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius:'2rem ',
            maxWidth: 400,
        }
    };
    Modal.setAppElement('#root')
    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={this.afterOpenModal}
            // onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={"Example Modal"}
        // ariaHideApp={false}
        >
            {props.children}
        </Modal>
    )
}

export default KmModal;