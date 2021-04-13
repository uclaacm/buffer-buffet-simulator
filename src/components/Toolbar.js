/* eslint-disable */ 
import React, {useState} from "react"

const Toolbar = ({clearProgram, stepProgram, runProgram, hasInput, paramInput, changeParams, codeName, getInputParam}) => {
    const [isRunning, setStatus] = useState(false);

    const editParam = (event) => {
        changeParams(event.target.value);
    }

    let exampleInput;
    if (codeName === 'sum' || codeName === 'if-else') {
        exampleInput = 'param1, param2';
    } else {
        exampleInput = 'parameter';
    }

    return (
        <div className='debug-toolbar-panel'>
            <input type='text' placeholder={exampleInput}
                onChange={(e) => editParam(e)} value={paramInput}
                id='paramInput'
            >
            </input>
            <button className='debug-toolbar-btn' onClick={getInputParam}>=&gt;</button>
            <button className='debug-toolbar-btn' onClick={runProgram}>Run</button>
            <button className='debug-toolbar-btn' onClick={clearProgram}> Clear </button>
            <button className='debug-toolbar-btn' onClick={stepProgram}> Step </button>
        </div>
    );
};

export default Toolbar;