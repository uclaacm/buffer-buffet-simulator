export const Buffer2 = {
  id: 'buffer2',
  setup: ['mov 0x60, %esp', 'mov 7, %eip'],
  asm: [
    // func1 ADDRESS = 0
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'sub 0x14, %esp',
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'lea 0x14(%esp), %edi',
    },
    {
      address: 4,
      hex: '00 00 00 00 00',
      command: 'call <gets>',
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'mov $0, %eax',
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'ret',
      // check stack
      // get return address into eip
      // check return address SEGFAULT
    },
    // func2 ADDRESS = 5
    // pop if it hits func2
    {
      address: 6,
      hex: '00 00 00 00 00',
      command: 'mov $0x64, %eax',
    },
    {
      address: 7,
      hex: '00 00 00 00 00',
      command: 'ret',
    },
    // main func ADDRESS = 7
    {
      address: 0,
      hex: '00 00 00 00 00',
      command: 'mov $1, %eax',
    },
    {
      address: 0,
      hex: '00 00 00 00 00',
      command: 'push %eax',
    },
    {
      address: 0,
      hex: '00 00 00 00 00',
      command: 'call <func1>',
    },
    {
      address: 3,
      hex: '00 00 00 00 00',
      command: 'pop %eax',
    },
    {
      address: 3,
      hex: '00 00 00 00 00',
      command: 'ret',
    },

  ],
};
