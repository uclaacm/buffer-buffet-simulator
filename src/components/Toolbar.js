import React from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';
import Next from '../assets/next.svg';
import Run from '../assets/run.svg';
import Stop from '../assets/stop.svg';

const Toolbar = ({clearProgram, stepProgram, runProgram, userInput, changeInput,
  codeName, getInput, getStringBytes}) => {
  const editParam = (event) => {
    changeInput(event.target.value);
  };
  Toolbar.propTypes = {
    clearProgram: PropTypes.func,
    stepProgram: PropTypes.func,
    runProgram: PropTypes.func,
    userInput: PropTypes.string,
    changeInput: PropTypes.func,
    codeName: PropTypes.string,
    getInput: PropTypes.func,
    getStringBytes: PropTypes.func,
  };
  // input depends on type of program running
  let exampleInput;
  let inputFunction;
  if (codeName === 'sum' || codeName === 'if-else') {
    exampleInput = 'param1, param2';
    inputFunction = getInput;
  } else if (codeName === 'for-loop' || codeName === 'switch') {
    exampleInput = 'parameter';
    inputFunction = getInput;
  } else {
    exampleInput = 'gets input';
    inputFunction = getStringBytes;
  }

  return (
    <div className='debug-toolbar-panel'>
      <h2 className='debug-toolbar-title'>Toolbar</h2>
      <input type='text' className='debug-toolbar-input' placeholder={exampleInput}
        onChange={(e) => editParam(e)} value={userInput}
        id='userInput'
      />
      <button className='debug-toolbar-input-btn' onClick={() => inputFunction()}>&gt;</button>
      <button className='debug-toolbar-btn' onClick={runProgram}><img alt = "run" src={Run}></img>Run</button>
      <button className='debug-toolbar-btn' onClick={clearProgram}><img alt = "clear" src={Stop}></img> Clear </button>
      <button className='debug-toolbar-btn' onClick={stepProgram}><img alt = "step" src={Next}></img> Step </button>
    </div>
  );
};

export default Toolbar;
