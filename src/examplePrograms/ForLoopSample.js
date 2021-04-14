export const ForLoop = {
  id: 'for-loop',
  setup: [
    'mov $5, %edi',
  ],
  asm: [
    {
      address: 0,
      comment: '00 00 00 00 00',
      command: 'mov $0, %eax',
    },
    {
      address: 1,
      comment: '00 00 00 00 00',
      command: 'mov $0,  %r11D',
    },
    {
      address: 2,
      comment: '00 00 00 00 00',
      command: 'cmp %r11D, %edi',
    },
    {
      address: 3,
      comment: '00 00 00 00 00',
      command: 'jle 0x07',
    },
    {
      address: 4,
      comment: '00 00 00 00 00',
      command: 'add %r11D, %eax',
    },
    {
      address: 5,
      comment: '00 00 00 00 00',
      command: 'add $1, %r11D',
    },
    {
      address: 6,
      comment: '00 00 00 00 00',
      command: 'jmp 0x02',
    },
    {
      address: 7,
      comment: '00 00 00 00 00',
      command: 'ret',
    },
  ],
};
