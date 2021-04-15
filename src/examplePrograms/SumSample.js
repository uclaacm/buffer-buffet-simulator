export const Sum= {
  id: 'sum',
  setup: [
    'mov $1, %edi',
    'mov $5, %esi',
  ],
  asm: [
    {
      address: 0,
      comment: '',
      command: 'add %edi, %esi',
    },
    {
      address: 0,
      comment: '',
      command: 'mov %esi, %eax',
    },
    {
      address: 0,
      comment: '',
      command: 'ret',
    },
  ],
};
