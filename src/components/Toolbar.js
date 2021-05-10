import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';
import Next from '../assets/next.svg';
import Run from '../assets/run.svg';
import Stop from '../assets/stop.svg';

const Toolbar = ({clearProgram, stepProgram, runProgram, userInput, changeInput,
  codeName, getInput, getStringBytes, canInput, allowInput}) => {
  Toolbar.propTypes = {
    clearProgram: PropTypes.func,
    stepProgram: PropTypes.func,
    runProgram: PropTypes.func,
    userInput: PropTypes.string,
    changeInput: PropTypes.func,
    codeName: PropTypes.string,
    getInput: PropTypes.func,
    getStringBytes: PropTypes.func,
    canInput: PropTypes.bool,
    allowInput: PropTypes.func,
  };

  const editParam = (event) => {
    changeInput(event.target.value);
  };

  // input depends on type of program running
  let exampleInput;
  let inputFunction;
  if (codeName === 'buffer1' || codeName === 'buffer2') {
    inputFunction = getStringBytes;
    exampleInput = '\\0x00...';
  } else if (codeName === 'sum' || codeName === 'if-else') {
    inputFunction = getInput;
    exampleInput = '1, 5';
  } else if (codeName === 'sum' || codeName === 'if-else') {
    inputFunction = getInput;
    exampleInput = '20, 20';
  } else {
    inputFunction = getInput;
    exampleInput = '5';
  }

  // decides if input is allowed on program selection
  useEffect(() => {
    if (codeName === 'sum' || codeName === 'if-else') {
      allowInput(true);
    } else if (codeName === 'for-loop' || codeName === 'switch') {
      allowInput(true);
    } else {
      allowInput(false);
    }
  }, [codeName]);

  // disables run/step buttons
  let canRun;
  if (codeName.includes('buffer') && canInput === true) {
    canRun = false;
  } else {
    canRun = true;
  }

  return (
    <div className='debug-toolbar-panel'>
      <h2 className='debug-toolbar-title'>Toolbar</h2>
      <input type='text' className='debug-toolbar-input' placeholder={exampleInput}
        onChange={(e) => editParam(e)} value={userInput}
        id='userInput' disabled={!canInput}
      />
      <button className='debug-toolbar-input-btn' onClick={(e) => inputFunction(e)} disabled={!canInput}>
        &gt;
      </button>
      <button className='debug-toolbar-btn' onClick={(e) => runProgram(e)} disabled={!canRun}>
        <img alt = "run" src={Run}></img>
        Run
      </button>
      <button className='debug-toolbar-btn' onClick={(e) => clearProgram(e)}>
        <img alt = "clear" src={Stop}></img>
        Clear
      </button>
      <button className='debug-toolbar-btn' onClick={(e) => stepProgram(e)} disabled={!canRun}>
        <img alt = "step" src={Next}></img>
        Step
      </button>
    </div>
  );
};

export default Toolbar;
