export const Buffer1 = {
  id: 'buffer1',
  setup: ['mov 0x60, %esp'],
  asm: [
    {
      address: 0,
      hex: '',
      command: 'sub 0x28, %esp',
    },
    {
      address: 1,
      hex: '/* breakpoint */',
      command: 'call <gets>',
    },
    {
      address: 2,
      hex: '',
      command: 'lea 0x14(%esp), %edi',
    },
    {
      address: 3,
      hex: '',
      command: 'call <printf>',
    },
    {
      address: 4,
      hex: '',
      command: 'mov $1, %eax',
    },
    {
      address: 5,
      hex: '',
      command: 'ret',
    },
  ],
};
