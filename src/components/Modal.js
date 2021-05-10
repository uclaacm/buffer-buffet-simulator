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
    <div className='modal-container'>
      <div className = "modal-black"></div>
      <div className = "modal-popupContainer">
        <div className = "modal-popup">
          <div className = "modal-closeContainer">
            <img className = "modal-close" alt = "close" src = {Close} onClick={closeModal}></img>
          </div>
          <h2 className = "modal-instructions">Instructions</h2>
          <p>
            These C programs have been broken down into assembly.
            Step through these programs to help you understand assembly and buffer overflow!
          </p>
          <label>Toolbar:</label>
          <ul>
            <li>
              Input:
              <ul>
                <li>For non-buffer programs, enter parameters to given function.</li>
                <li>For buffer programs, enter <nobr>&#39;\[hex]...&#39;</nobr> to load buffer.</li>
              </ul>
            </li>
            <li>Run: Run program until the end.</li>
            <li>Clear: Reset and bring program back to beginning.</li>
            <li>Step: Go through program, 1 assembly instruction at a time.</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Modal;
