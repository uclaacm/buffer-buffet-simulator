import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({clearProgram, stepProgram, runProgram, userInput,
  changeInput, codeName, getInput, getStringBytes, canInput, allowInput}) => {
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
    exampleInput = 'gets input';
  } else if (codeName === 'sum' || codeName === 'if-else') {
    inputFunction = getInput;
  } else {
    inputFunction = getInput;
    exampleInput = 'parameter';
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
      <input type='text' placeholder={exampleInput}
        onChange={(e) => editParam(e)} value={userInput}
        id='userInput' disabled={!canInput}
      >
      </input>
      <button className='debug-toolbar-btn' id='inputBtn' onClick={(e) => inputFunction(e)} disabled={!canInput}>
        =&gt;
      </button>
      <button className='debug-toolbar-btn' id='runBtn' onClick={(e) => runProgram(e)} disabled={!canRun}>
        Run
      </button>
      <button className='debug-toolbar-btn' onClick={(e) => clearProgram(e)}>
        Clear
      </button>
      <button className='debug-toolbar-btn' id='stepBtn' onClick={(e) => stepProgram(e)} disabled={!canRun}>
        Step
      </button>
    </div>
  );
};

export default Toolbar;
