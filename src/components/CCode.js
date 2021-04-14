import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './CCode.css';
const CCode = ({setCodeName, codeName}) => {
  CCode.propTypes = {
    setCodeName: PropTypes.func,
    codeName: PropTypes.string,
  };

  const handleChange = (selectedOption) => {
    setCodeName(selectedOption.value);
  };

  const options = [
    {value: 'sum', label: 'Sum'},
    {value: 'if-else', label: 'If-Else'},
    {value: 'for-loop', label: 'For Loop'},
    {value: 'switch', label: 'Switch'},
  ];

  let CProgram;
  switch (codeName) {
    case 'sum':
      CProgram = (
        <div>
          int addNum(int a, int b)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;int sum = a + b;
          <br/>&emsp;&emsp;return sum;
          <br/>&#x0007D;
        </div>
      );
      break;
    case 'if-else':
      CProgram = (
        <div>
          int getMax(int a, int b)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;if (b &#62; a)
          <br/>&emsp;&emsp;&emsp;&emsp;return b;
          <br/>&emsp;&emsp;else
          <br/>&emsp;&emsp;&emsp;&emsp;return a;
          <br/>&#x0007D;
        </div>
      );
      break;
    case 'for-loop':
      CProgram = (
        <div>
          int incrementAdd(int a)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;int sum = 0;
          <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
          <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
          <br/>&emsp;&emsp;&#x0007D;
          <br/>&emsp;&emsp;return sum;
          <br/>&#x0007D;
        </div>
      );
      break;
    case 'switch':
      CProgram = (
        <div>
          int switchTable(int n)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;int sum = 3;
          <br/>&emsp;&emsp;switch (n) &#x0007B;
          <br/>&emsp;&emsp;&emsp;&emsp;case 1:
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum += n;
          <br/>&emsp;&emsp;&emsp;&emsp;case 2:
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum -= 2;
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
          <br/>&emsp;&emsp;&emsp;&emsp;case 3:
          <br/>&emsp;&emsp;&emsp;&emsp;case 4:
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 34 + n;
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
          <br/>&emsp;&emsp;&emsp;&emsp;default:
          <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 0;
          <br/>&emsp;&emsp;&#x0007D;
          <br/>&emsp;&emsp;return sum;
          <br/>&#x0007D;
        </div>
      );
      break;
  }

  const customStyles = {

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007054' : '#f3f2f1',
      // padding: 20,
      '&:hover': {
        backgroundColor: state.isSelected ? '#007054' : '#AEDACF',
      }
    }),

    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
      fontSize: 16,
      // padding: 20,
    }),

    control: (provided, state) =>({
      ...provided,
      backgroundColor: '#f3f2f1',
      fontSize: 16,
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
         border: state.isFocused ? 0 : 0
      }
    }),

    // control: () => ({
    //   // width: width,
      
    // }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {...provided, opacity, transition};
    },
  };


  return (
    <div className="debug-c-panel">
      <div className="debug-c-panel-header">
        <div className="debug-c-panel-title">C</div>
        <div className="debug-c-select">
          <Select options={options}
          onChange={handleChange}
          defaultValue={{value: 'select', label: 'Select Program'}}
          styles={customStyles}
          menuColor='#292a2f'
        />
        </div>
      </div>

      <div className='debug-c-srcCode'>
        {CProgram}
      </div>
    </div>
  );
};

export default CCode;
