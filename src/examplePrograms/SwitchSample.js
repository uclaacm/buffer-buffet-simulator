export const Switch = {
  id: 'switch',
  setup: [
    'mov $9, 0x3c',
    'mov $6, 0x40',
    'mov $6, 0x44',
    'mov $11, 0x48',
    'mov $12, 0x4C',
    'mov $5, %edi',
  ],
  asm: [
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'mov $3, %eax',
    },
    {
      address: 1,
      comment: '00 00 00 00 00',
      command: 'cmp $1, %edi',
    },
    {
      // default case
      address: 2,
      comment: '00 00 00 00 00',
      command: 'jl (0x3c)',
    },
    {
      address: 3,
      comment: '00 00 00 00 00',
      command: 'cmp $4, %edi',
    },
    {
      // default case
      address: 4,
      comment: '00 00 00 00 00',
      command: 'jg (0x3c)',
    },
    {
      // jump to jump table location
      address: 5,
      comment: '00 00 00 00 00',
      command: 'jmp (0x3c, %edi, 4)',
    },
    {
      // case 2 and case 4
      address: 6,
      comment: '00 00 00 00 00',
      command: 'mov $34, %eax',
    },
    {
      address: 7,
      comment: '00 00 00 00 00',
      command: 'add %edi, %eax',
    },
    {
      address: 8,
      comment: '00 00 00 00 00',
      command: 'ret',
    },
    {
      // default case
      address: 9,
      comment: '00 00 00 00 00',
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
      comment: '',
      command: 'add %edi, %eax',
    },
    {
      // Address + 2
      address: 12,
      comment: '',
      command: 'sub $2, %eax',
    },
    {
      address: 13,
      comment: '',
      command: 'ret',
    },
  ],
};
