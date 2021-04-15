import React from 'react';
import PropTypes from 'prop-types';
import './MemoryDisplay.css';

const MemoryDisplay = ({registerDict}) => {
  MemoryDisplay.propTypes = {
    registerDict: PropTypes.objectOf(PropTypes.number),
  };

  return (
    <div className='memory-display-container'>
      <div className='memory-display-header'>Memory Display</div>
      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          Pointer Registers
        </div>
        <ul className='memory-display-list'>
          <li>ebp (base pointer): {registerDict['%ebp']}</li>
          <li>esp (stack pointer): {registerDict['%esp']}</li>
          <li>eip (instruction pointer): {registerDict['%eip']}</li>
        </ul>
      </div>

      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          Return Register
        </div>
        <ul className='memory-display-list'>
          <li>eax (result register): {registerDict['%eax']}</li>
        </ul>
      </div>

      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          Argument Registers (in order)
        </div>
        <ul className='memory-display-list'>
          <li>edi: {registerDict['%edi']}</li>
          <li>esi: {registerDict['%esi']}</li>
          <li>edx: {registerDict['%edx']}</li>
          <li>ecx: {registerDict['%ecx']}</li>
          <li>r8D: {registerDict['%r8D']}</li>
          <li>r9D: {registerDict['%r9D']}</li>
        </ul>
      </div>

      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          General Purposes
        </div>
        <ul className='memory-display-list'>
          <li>r10D: {registerDict['%r10D']}</li>
          <li>r11D: {registerDict['%r11D']}</li>
          <li>r12D: {registerDict['%r12D']}</li>
          <li>r13D: {registerDict['%r13D']}</li>
        </ul>
      </div>

      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          Flags
        </div>
        <ul className='memory-display-list'>
          <li>CF: {registerDict['CF']}</li>
          <li>PF: {registerDict['PF']}</li>
          <li>ZF: {registerDict['ZF']}</li>
          <li>SF: {registerDict['SF']}</li>
          <li>OF: {registerDict['OF']}</li>
          <li>AF: {registerDict['AF']}</li>
        </ul>
      </div>

      <div className='memory-display-panel'>
        <div className='memory-display-panel-header'>
          Heap Memory
        </div>
        <ul className='memory-display-list'>
          <li>0x60: {registerDict['0x60']}</li>
          <li>0x5C: {registerDict['0x5C']}</li>
          <li>0x58: {registerDict['0x58']}</li>
          <li>0x54: {registerDict['0x54']}</li>
          <li>0x50: {registerDict['0x50']}</li>
          <li>0x4C: {registerDict['0x4C']}</li>
          <li>0x48: {registerDict['0x48']}</li>
          <li>0x44: {registerDict['0x44']}</li>
          <li>0x40: {registerDict['0x40']}</li>
          <li>0x3C: {registerDict['0x3C']}</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoryDisplay;
