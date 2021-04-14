import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './AsmCode.css';
const InstrRow = ({instrID, command, toggleBreakPt}) => {
  InstrRow.propTypes = {
    instrID: PropTypes.number,
    command: PropTypes.string,
    toggleBreakPt: PropTypes.func,
  };

  const [isToggeled, togglePt] = useState(false);

  const emit= (e) => {
    togglePt(!isToggeled);
    toggleBreakPt(e);
  };

  return (
    <div className='debug-asm-row'>
      {/* <label> */}
      {/* <input type='checkbox' instrID={instrID} onChange={toggleBreakPt}></input> */}
      {/* </label> */}

      {/* <div className='debug-asm-addr'>
        {instrID}
      </div> */}

      <div className='debug-asm-instr'>
        <span className={isToggeled ? 'debug-asm-breakpts-inactive' : 'debug-asm-breakpts-active'}
          instrID={instrID} onClick={emit}></span>
        {command}
      </div>
    </div>
  );
};

const AsmCode = ({instrList, toggleBreakPt}) => {
  AsmCode.propTypes = {
    instrList: PropTypes.arrayOf(PropTypes.string),
    toggleBreakPt: PropTypes.func,
  };

  const instrDisplay =
        instrList.map((command, id) => {
          return <InstrRow key={id} instrID={id} toggleBreakPt={toggleBreakPt} command={command}/>;
        });

  return (
    <div className="debug-asm-panel">
      <div className="debug-asm-header">
        Assembly
      </div>
      <div className='debug-asm-body'>
        {instrDisplay}
      </div>
    </div>

  );
};

export default AsmCode;
