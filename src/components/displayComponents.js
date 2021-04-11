import React, {useState} from 'react';
import PropTypes from 'prop-types';

import cont from '../assets/continue.svg';
import next from '../assets/next.svg';
import run from '../assets/run.svg';
import stop from '../assets/stop.svg';
import close from '../assets/close.svg';

/**
* Assembly individual row
* @param {*} props -LIST PROPS HERE-
* @return {DOM} Row HTML
*/
export const Row = ({address, content, command, parameters}) => {
  return (
    <div className = {'row'}>
      <label className = "container">
        <input type="checkbox" id="1"></input>
        <span className="checkmark"></span>
      </label>
      <div>
        &emsp;&emsp;{address}:&emsp;&emsp;&emsp;&emsp;
        {content}&emsp;&emsp;&emsp;&emsp;{command}&emsp;&emsp;
        {parameters}
      </div>
    </div>
  );
};

// Row prop typecasting
Row.propTypes = {
  address: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  command: PropTypes.string.isRequired,
  parameters: PropTypes.string.isRequired,
};

/**
* Modal Component
* @return {DOM} Modal info
*/
export const Modal = ({showModal, setModal}) => {
  /**
  * Closes Modal
  */
  const handleClose = () => {
    console.log('Modal');
    setModal(false);
  };

  /**
  * Modal render
  * @return {DOM} HTML for Modal
  */
  if (showModal) {
    return (
      <div>
        <div className = "black"></div>
        <div className = "popupContainer">
          <div className = "popup">
            <div className = "closeContainer grid-container">
              <img className = "close" alt = "close" src = {close} onClick={() => (handleClose())} ></img>
            </div>
            <h2 className = "instructions">Instructions</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Sit amet tellus cras adipiscing enim eu. Lacinia quis vel eros donec ac odio tempor orci dapibus.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
};

/**
* Toolbar Component
* @return {DOM} HTML for Toolbar
*/
export const Toolbar = ({runCommand, clearMemory}) => {
  const [isRunning, toggleRun] = useState(false);
  /**
  * stop button
  * @param {event} event event of the click
  */
  const handleButton = (event) => {
    const val = event.target.id;
    console.log(val);
    if (run) {
      toggleRun(true);
    }
    if (val === 'stop') {
      console.log('im pressing stop');
      toggleRun(false);
    }
    // console.log(this.state);
  };
  return (
    <div className = "toolbar grid-container">
      <h2>Toolbar</h2>
      <button className="toolButton" disabled={isRunning} onClick={(e) => handleButton(e)} id = "run">
        <img className = "btn" alt = "run" src = {run}></img>
        Run
      </button>
      <button className="toolButton" disabled={!isRunning} onClick={(e) => handleButton(e)} id = "stop">
        <img className = "btn" alt = "stop" src = {stop}></img> Stop</button>
      <button className="toolButton" disabled={!isRunning} onClick={(e) => handleButton(e)} id = "next">
        <img className = "btn" alt = "next" src = {next}></img>
        Next
      </button>
      <button className="toolButton" disabled={!isRunning} onClick={(e) => handleButton(e)} id = "cont">
        <img className = "btn" alt = "cont" src = {cont}></img>
        Continue
      </button>
    </div>
  );
};

Toolbar.propTypes = {
  runCommand: PropTypes.func.isRequired,
  clearMemory: PropTypes.func.isRequired,
};
