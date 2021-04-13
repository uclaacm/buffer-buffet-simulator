/* eslint-disable */ 
import React from "react"

const Toolbar = ({clearProgram, stepProgram, runProgram, userInput, changeInput, codeName, getInput, getStringBytes}) => {
    const editParam = (event) => {
        changeInput(event.target.value);
    }

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
            <input type='text' placeholder={exampleInput}
                onChange={(e) => editParam(e)} value={userInput}
                id='userInput'
            >
            </input>
            <button className='debug-toolbar-btn' onClick={() => inputFunction()}>=&gt;</button>
            <button className='debug-toolbar-btn' onClick={runProgram}>Run</button>
            <button className='debug-toolbar-btn' onClick={clearProgram}> Clear </button>
            <button className='debug-toolbar-btn' onClick={stepProgram}> Step </button>
        </div>
    );
};

export default Toolbar;
