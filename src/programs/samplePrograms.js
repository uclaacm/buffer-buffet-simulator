// Contains all the sample code
// includes id, assembly, and set up code

// sampleCode1
// features a basic variable assignment/addition
export const sampleCode1= {
  id: 1,
  asm: [
    'add %edi, %esi',
    'mov %esi, %eax',
    'ret',
  ],
  setup: [
    'mov $1, %edi',
    'mov $5, %esi',
  ],
};
