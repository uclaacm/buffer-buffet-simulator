import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Close from '../assets/close.svg';

const Modal = ({setModal}) => {
  Modal.propTypes = {
    setModal: PropTypes.func,
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    // <div>
    //   <div className='modal-blackBG'></div>
    //   <div className='modal-header'>Instruction</div>
    //   <div className='modal-body'>
    //     <div className='modal-text'>
    //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //                 sed do eiusmod tempor incididunt ut labore et dolore magna
    //                 aliqua. Sit amet tellus cras adipiscing enim eu. Lacinia quis
    //                 vel eros donec ac odio tempor orci dapibus.
    //     </div>
    //     <button onClick={closeModal}> Close me!</button>
    //   </div>
    // </div>
    <div className='modal-container'>
      <div className = "modal-black"></div>
      <div className = "modal-popupContainer">
        <div className = "modal-popup">
          <div className = "modal-closeContainer">
            <img className = "modal-close" alt = "close" src = {Close} onClick={closeModal}></img>
          </div>
          <h2 className = "modal-instructions">Instructions</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Sit amet tellus cras adipiscing enim eu. Lacinia quis
             vel eros donec ac odio tempor orci dapibus. </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
