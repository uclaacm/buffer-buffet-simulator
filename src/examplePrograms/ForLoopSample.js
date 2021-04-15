export const ForLoop = {
  id: 'for-loop',
  setup: [
    'mov $5, %edi',
  ],
  asm: [
    {
      address: 0,
      comment: '',
      command: 'mov $0, %eax',
    },
    {
      address: 1,
      comment: '',
      command: 'mov $0,  %r11D',
    },
    {
      address: 2,
      comment: '/* compare counter */',
      command: 'cmp %r11D, %edi',
    },
    {
      address: 3,
      comment: '/* exit loop */',
      command: 'jle 0x07',
    },
    {
      address: 4,
      comment: '',
      command: 'add %r11D, %eax',
    },
    {
      address: 5,
      comment: '/* increment counter */',
      command: 'add $1, %r11D',
    },
    {
      address: 6,
      comment: '',
      command: 'jmp 0x02',
    },
    {
      address: 7,
      comment: '',
      command: 'ret',
    },
  ],
};
