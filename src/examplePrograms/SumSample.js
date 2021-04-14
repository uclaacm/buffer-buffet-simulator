export const Sum= {
  id: 'sum',
  setup: [
    'mov $1, %edi',
    'mov $5, %esi',
  ],
  asm: [
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'add %edi, %esi',
    },
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'mov %esi, %eax',
    },
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'ret',
    },
  ],
};
