export const Buffer1 = {
  id: 'buffer1',
  setup: ['mov 0x60, %esp'],
  asm: [
    // {
    //   address: 0,
    //   hex: '00 00 00 00 00',
    //   command: 'push %ebp',
    // },
    // {
    //   address: 2,
    //   hex: '00 00 00 00 00',
    //   command: 'mov %esp, %ebp',
    // },
    {
      address: 3,
      hex: '00 00 00 00 00',
      command: 'sub 0x28, %esp',
    },
    {
      address: 4,
      hex: '00 00 00 00 00',
      command: 'call <gets>',
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'lea 0x14(%esp), %edi',
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'call <printf>',
    },
    {
      address: 6,
      hex: '00 00 00 00 00',
      command: 'mov $1, %eax',
    },
    {
      address: 7,
      hex: '00 00 00 00 00',
      command: 'ret',
    },
  ],
};
