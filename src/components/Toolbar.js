/* eslint-disable */ 
import React, {useState} from "react"
import './Toolbar.css';

import Cont from "../assets/continue.svg"
import Next from "../assets/next.svg"
import Run from "../assets/run.svg"
import Stop from "../assets/stop.svg"

const Toolbar = ({clearProgram, stepProgram, runProgram, hasInput}) => {

    const [isRunning, setStatus] = useState(false);
    return(
        <div className='debug-toolbar-panel'>
            <h2 className='debug-toolbar-title'>Toolbar</h2>
            <button className='debug-toolbar-btn' onClick={runProgram}><img alt = "run" src={Run}></img>Run</button>
            <button className='debug-toolbar-btn' onClick={clearProgram}><img alt = "clear" src={Stop}></img> Clear </button>
            <button className='debug-toolbar-btn' onClick={stepProgram}><img alt = "step" src={Next}></img> Step </button>
        </div>
    );
};

export default Toolbar;