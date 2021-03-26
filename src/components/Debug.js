import React, {useState} from 'react';
const Debug = () => {
  const code1 = [
    'mov $1, %eax',
    'mov $2, %edi',
    'add %edi, %eax',
  ];

  const [breakPts] = useState([]);

  const instrList =
        code1.map((instruction, i) => {
          const keyID = 1000 + i * 100;
          return <li key={keyID} > <button> {keyID} </button>{instruction}</li>;
        },
        );


  return (
    <div className='debugger'>
      <div className="debugger-program">
        {instrList}
      </div>
      <h4>{breakPts}</h4>
      <div className="debugger-toolbar">
        <button> Restart </button>
        <button> Step </button>
        <button> Continue </button>
        <button>Test me!</button>
      </div>
    </div>


  );
};

export default Debug;
