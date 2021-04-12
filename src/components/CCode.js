/* eslint-disable */ 
import React from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';

const CCode = ({setCodeName}) =>{

    CCode.propTypes = {
        setCodeName: PropTypes.func,
    };

    const handleChange = (selectedOption) => {
        setCodeName(selectedOption.value);
    };

    const options = [
        { value: 'sum', label: 'Sum' },
        { value: 'for-loop', label: 'For Loop' },
        { value: 'if-else', label: 'If-Else' },
        { value: 'switch', label:'Switch'}
    ];

    return(
        <div className="debug-c-panel">
            <div className="debug-c-panel-header">
                <h2>C-Program</h2>
                <Select options={options} 
                        onChange={handleChange}
                        defaultValue={{ value: 'sum', label: 'Sum' }}
                />
            </div>
            
            <div className='debug-c-srcCode'>
                C- Source Code
            </div>
        </div>
    );
}

export default CCode;