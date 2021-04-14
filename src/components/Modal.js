import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({setModal}) => {
  Modal.propTypes = {
    setModal: PropTypes.func,
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className='modal-container'>
      <div className='modal-blackBG'></div>
      <div className='modal-header'>Instruction</div>
      <div className='modal-body'>
        <div className='modal-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Sit amet tellus cras adipiscing enim eu. Lacinia quis
                    vel eros donec ac odio tempor orci dapibus.
        </div>
        <button onClick={closeModal}> Close me!</button>
      </div>

    </div>
  );
};

export default Modal;
