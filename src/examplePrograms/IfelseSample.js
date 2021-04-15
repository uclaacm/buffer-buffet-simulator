export const IfElse = {
  id: 'if-else',
  setup: [
    'mov $20, %edi',
    'mov $20, %esi',
  ],
  asm: [
    {
      address: 0,
      comment: '/* compare parameters */',
      command: 'cmp %edi, %esi',
    },
    {
      address: 1,
      comment: '',
      command: 'jg $4',
    },
    {
      address: 2,
      comment: '',
      command: 'mov %edi, %eax',
    },
    {
      address: 3,
      comment: '',
      command: 'ret',
    },
    {
      address: 4,
      comment: '',
      command: 'mov %esi, %eax',
    },
    {
      address: 5,
      comment: '',
      command: 'ret',
    },
  ],
};
