import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import * as HomeActions from './../../store/actions/HomeActions';
import Details from './../../components/Chart/components/Details';

import './Modal.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function ReactModal({isOpen,dispatch}) {
  

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        dispatch(HomeActions.openCloseModal(false))
    }

    return (
        <div className="modal-container">
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <Details />
            </Modal>
        </div>
    );
}

export default connect(state => ({ isOpen: state.HomeRedurces.isModalOpen }))(ReactModal)