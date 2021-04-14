import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

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
    {value: 'buffer1', label: 'Buffer 1'},
    {value: 'buffer2', label: 'Buffer 2'},
  ];

  let CProgram;
  switch (codeName) {
    case 'sum':
      CProgram = (
        <p>
          int addNum(int a, int b)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;int sum = a + b;
          <br/>&emsp;&emsp;return sum;
          <br/>&#x0007D;
        </p>
      );
      break;
    case 'if-else':
      CProgram = (
        <p>
          int getMax(int a, int b)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;if (b &#62; a)
          <br/>&emsp;&emsp;&emsp;&emsp;return b;
          <br/>&emsp;&emsp;else
          <br/>&emsp;&emsp;&emsp;&emsp;return a;
          <br/>&#x0007D;
        </p>
      );
      break;
    case 'for-loop':
      CProgram = (
        <p>
          int incrementAdd(int a)
          <br/>&#x0007B;
          <br/>&emsp;&emsp;int sum = 0;
          <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
          <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
          <br/>&emsp;&emsp;&#x0007D;
          <br/>&emsp;&emsp;return sum;
          <br/>&#x0007D;
        </p>
      );
      break;
    case 'switch':
      CProgram = (
        <p>
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
        </p>
      );
      break;
    case 'buffer1':
      CProgram = (
        <p>
          int getString()
          <br/>&#x0007B;
          <br/>&emsp;&emsp;struct Buffer &#x0007B;
          <br/>&emsp;&emsp;&emsp;char buff1[5];
          <br/>&emsp;&emsp;&emsp;char buff2[5];
          <br/>&emsp;&emsp;&#x0007D;
          <br/>&emsp;&emsp;gets(buff2);
          <br/>&emsp;&emsp;printf(&quot;%s&quot;, buff1);
          <br/>&emsp;&emsp;return 1;
          <br/>&#x0007D;
        </p>
      );
      break;
    case 'buffer2':
      CProgram = (
        <p>
          int func1()
          <br/>&#x0007B;
          <br/>&emsp;&emsp;char buff[5];
          <br/>&emsp;&emsp;gets(buff);
          <br/>&emsp;&emsp;return 0;
          <br/>&#x0007D;
          <br/>
          int func2()
          <br/>&#x0007B;
          <br/>&emsp;&emsp;return 100;
          <br/>&#x0007D;
          <br/>
          int main()
          <br/>&#x0007B;
          <br/>&emsp;&emsp;func1();
          <br/>&emsp;&emsp;return 1;
          <br/>&#x0007D;
        </p>
      );
      break;
  }

  return (
    <div className="debug-c-panel">
      <div className="debug-c-panel-header">
        <h2>C-Program</h2>
        <Select options={options}
          onChange={handleChange}
          defaultValue={{value: 'sum', label: 'Sum'}}
        />
      </div>

      <div className='debug-c-srcCode'>
        C- Source Code
        {CProgram}
      </div>
    </div>
  );
};

export default CCode;
