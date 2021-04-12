/* eslint-disable */ 
import React, {useState} from "react"

const Toolbar = ({clearProgram, stepProgram, runProgram, hasInput}) => {

    const [isRunning, setStatus] = useState(false);
    return(
        <div className='debug-toolbar-panel'>
            <button className='debug-toolbar-btn' onClick={runProgram}>Run</button>
            <button className='debug-toolbar-btn' onClick={clearProgram}> Clear </button>
            <button className='debug-toolbar-btn' onClick={stepProgram}> Step </button>
            
        </div>
    );
};

export default Toolbar;