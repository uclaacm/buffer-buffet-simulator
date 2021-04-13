export const IfElse = {
  id: 'if-else',
  setup: [
    'mov $20, %edi',
    'mov $20, %esi',
  ],
  asm: [
    {
      address: 0,
      hex: '00 00 00 00 00',
      command: 'cmp %edi, %esi'
    },
    {
      address: 1,
      hex: '00 00 00 00 00',
      command: 'jg $4'
    },
    {
      address: 2,
      hex: '00 00 00 00 00',
      command: 'mov %edi, %eax'
    },
    {
      address: 3,
      hex: '00 00 00 00 00',
      command: 'ret'
    },
    {
      address: 4,
      hex: '00 00 00 00 00',
      command: 'mov %esi, %eax'
    },
    {
      address: 5,
      hex: '00 00 00 00 00',
      command: 'ret'
    }
  ],
};