import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({clearProgram, stepProgram, runProgram, userInput,
  changeInput, codeName, getInput, getStringBytes}) => {
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

  const editParam = (event) => {
    changeInput(event.target.value);
  };

  // input depends on type of program running
  let exampleInput;
  let inputFunction;
  if (codeName === 'buffer1' || codeName === 'buffer2') {
    inputFunction = getStringBytes;
  } else {
    inputFunction = getInput;
  }
  useEffect(() => {
    if (codeName === 'sum' || codeName === 'if-else') {
      exampleInput = 'param1, param2';
    } else if (codeName === 'for-loop' || codeName === 'switch') {
      exampleInput = 'parameter';
    } else {
      exampleInput = 'gets input';
      document.getElementById('userInput').disabled = true;
      document.getElementById('inputBtn').disabled = true;
    }
  }, [codeName]);

  return (
    <div className='debug-toolbar-panel'>
      <input type='text' placeholder={exampleInput}
        onChange={(e) => editParam(e)} value={userInput}
        id='userInput'
      >
      </input>
      <button className='debug-toolbar-btn' id='inputBtn' onClick={(e) => inputFunction(e)}>=&gt;</button>
      <button className='debug-toolbar-btn' id='runBtn' onClick={(e) => runProgram(e)}>Run</button>
      <button className='debug-toolbar-btn' onClick={(e) => clearProgram(e)}> Clear </button>
      <button className='debug-toolbar-btn' id='stepBtn' onClick={(e) => stepProgram(e)}> Step </button>
    </div>
  );
};

export default Toolbar;
