export const IfElse = {
  id: 'if-else',
  setup: [
    'mov $20, %edi',
    'mov $20, %esi',
  ],
  asm: [
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'cmp %edi, %esi',
    },
    {
      address: 1,
      comment: '00 00 00 00 00',
      command: 'jg $4',
    },
    {
      address: 2,
      comment: '00 00 00 00 00',
      command: 'mov %edi, %eax',
    },
    {
      address: 3,
      comment: '00 00 00 00 00',
      command: 'ret',
    },
    {
      address: 4,
      comment: '00 00 00 00 00',
      command: 'mov %esi, %eax',
    },
    {
      address: 5,
      comment: '00 00 00 00 00',
      command: 'ret',
    },
  ],
};
