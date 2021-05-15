export const Switch = {
  id: 'switch',
  setup: [
    'mov $9, 0x3c',
    'mov $11, 0x40',
    'mov $12, 0x44',
    'mov $6, 0x48',
    'mov $6, 0x4C',
    // default parameters
    'mov $5, %edi',
  ],
  asm: [
    {
      address: 0,
      comment: '',
      command: 'mov $3, %eax',
    },
    {
      address: 1,
      comment: '/* check for default */',
      command: 'cmp $1, %edi',
    },
    {
      // default case
      address: 2,
      comment: '',
      command: 'jl (0x3c)',
    },
    {
      address: 3,
      comment: '',
      command: 'cmp $4, %edi',
    },
    {
      // default case
      address: 4,
      comment: '',
      command: 'jg (0x3c)',
    },
    {
      // jump to jump table location
      address: 5,
      comment: '/* access jump table */',
      command: 'jmp (0x3c, %edi, 4)',
    },
    {
      // case 2 and case 4
      address: 6,
      comment: ' /* case 3 and case 4 */',
      command: 'mov $34, %eax',
    },
    {
      address: 7,
      comment: '',
      command: 'add %edi, %eax',
    },
    {
      address: 8,
      comment: '',
      command: 'ret',
    },
    {
      // default case
      address: 9,
      comment: ' /* default case */',
      command: 'mov $0, %eax',
    },
    {
      address: 10,
      comment: ' ',
      command: 'ret',
    },
    {
      // Address + 1
      address: 11,
      comment: ' /* case 1 */',
      command: 'add %edi, %eax',
    },
    {
      // Address + 2
      address: 12,
      comment: ' /* case 2 */',
      command: 'sub $2, %eax',
    },
    {
      address: 13,
      comment: '',
      command: 'ret',
    },
  ],
};
