export const Buffer2 = {
  id: 'buffer2',
  setup: ['mov 0x60, %esp', 'mov 7, %eip'],
  asm: [
    // func1 ADDRESS = 0
    {
      address: 0,
      comment: '/* <func1> */',
      command: 'sub 0x14, %esp',
    },
    {
      address: 1,
      comment: '',
      command: 'lea 0x14(%esp), %edi',
    },
    {
      address: 2,
      comment: '',
      command: 'call <gets>',
    },
    {
      address: 3,
      comment: '/* breakpoint */',
      command: 'mov $0, %eax',
    },
    {
      address: 4,
      comment: '',
      command: 'ret',
      // check stack
      // get return address into eip
      // check return address SEGFAULT
    },
    // func2 ADDRESS = 5
    // pop if it hits func2
    {
      address: 5,
      comment: '/* <func2> */',
      command: 'mov $0x64, %eax',
    },
    {
      address: 6,
      comment: '',
      command: 'ret',
    },
    // main func ADDRESS = 7
    {
      address: 7,
      comment: '/* <main> */',
      command: 'mov $1, %eax',
    },
    {
      address: 8,
      comment: '',
      command: 'push %eax',
    },
    {
      address: 9,
      comment: '',
      command: 'call <func1>',
    },
    {
      address: 10,
      comment: '',
      command: 'pop %eax',
    },
    {
      address: 11,
      comment: '',
      command: 'ret',
    },

  ],
};
