import React from 'react';
import './Info.css';
import TopBar from './TopBar';
const Info = () => {
  return (
    <div className="page-info-view">
      <TopBar></TopBar>
      <div className="page-info">
        <div className="info-panel">
          <div className="info-header">
                Assembly Instructions
          </div>
          <ul className="info-list">
            {/* https://www.cs.virginia.edu/~evans/cs216/guides/x86.html */}
            <li>
              <div className="info-subheading">add — Integer Addition</div>
              <div className="info-desc">
                The add instruction adds together its two operands,
                storing the result in its second operand. <br/>
                Note, whereas both operands may be registers,
                at most one operand may be a memory location.
                <br/>
                add a, b -&gt; b = a + b
              </div>
            </li>
            <li>
              <div className="info-subheading">sub — Integer Subtraction</div>
              <div className="info-desc">
                The sub instruction stores in the value of its second operand the result of subtracting <br/>
                the value of its first operand from the value of its second operand. As with add <br/>
                sub a, b -&gt; b = b - a
              </div>
            </li>
            <li>
              <div className="info-subheading">cmp - Compare</div>
              <div className="info-desc">
                Compare the values of the two specified operands,
                setting the condition codes in the machine <br/>
                status word appropriately. This instruction is equivalent to the sub <br/>
                instruction, except the result of the subtraction is discarded.<br/>
                Look into flags if you want to learn more.
                cmp a, b -&gt; NULL
              </div>
            </li>
            <li>
              <div className="info-subheading">jmp — Jump</div>
              <div className="info-desc">
                Transfers program control flow to the instruction at the memory location indicated by the operand.
              </div>
            </li>
            <li>
              <div className="info-subheading">j<i>conditional</i></div>
              <div className="info-desc">
                These instructions are conditional jumps that are based on the status of a set of condition codes <br/>
                that are stored in a special register called the machine status word.
                The j<i>conditional</i> are often used after a cmp function. <br/>
                Look into the flags for more information.<br/>
                jle -&gt; jump if less than or equal<br/>
                jge -&gt; jump if greater than or equal<br/>
                jz -&gt; jump if zero (or identical)<br/>
                jg -&gt; jump if greater<br/>
                jl -&gt; jump if less than<br/>
              </div>
            </li>
            <li>
              <div className="info-subheading">lea  — Load effective address</div>
              <div className="info-desc">
              The lea instruction places the address specified by its first operand into the register
              specified by its second operand.<br/>
              </div>
            </li>
            <li>
              <div className="info-subheading">call, ret — Subroutine call and return</div>
              <div className="info-desc">
                These instructions implement a subroutine call and return.<br/>
                The ret instruction implements a subroutine return mechanism.<br/>
              </div>
            </li>
            <li>
              <div className="info-subheading">push — Push stack</div>
              <div className="info-desc">
                The push instruction places its operand onto the top of the hardware supported stack in memory.
              </div>
            </li>
            <li>
              <div className="info-subheading">pop — Pop stack</div>
              <div className="info-desc">
                The pop instruction removes the 4-byte data element from the top of the hardware-supported <br/>
                stack into the specified operand (i.e. register or memory location).
              </div>
            </li>
          </ul>
        </div>
        <div className="info-panel">
          <div className="info-header">
                Registers
          </div>
          {/* https://practicalmalwareanalysis.com/2012/04/03/all-about-ebp/ */}
          <ul>
            <li>
              <div className="info-subheading">ebp — Base pointer</div>
              <div className="info-desc">
                    EBP was designed to provide a “Base Pointer” for the current function so that all parameters
                    and local <br/> variables would be at a fixed offset from the base pointer.
              </div>
            </li>
            <li>
              <div className="info-subheading">esp — Stack pointer</div>
              <div className="info-desc">
                    The first is the stack pointer (ESP) which stores the current top of the stack. <br/>
                    Function arguments and local variables are stored at an offset from where the stack
                    is when the function starts.
              </div>
            </li>
            <li>
              <div className="info-subheading">eip — Instruction Poitner</div>
              <div className="info-desc">
                    EIP stands for extended instruction pointer for the stack. <br/>
                    It tells the computer which command to execute next and control the flow of the program.
              </div>
            </li>
            <li>
              <div className="info-subheading">eax — Return Register</div>
              <div className="info-desc">
                      EAX is primarily used to store the return value of a function. <br/>
                      At times, it can also be used for special calculation.
              </div>
            </li>
            <li>
              <div className="info-subheading">edi, esi, edx, ecx, r8D, r9D - Arguments Register</div>
              <div className="info-desc">
                      The above registers are used to store the parameters when doing a function call <br/>
                      in that respective order. For example, calling sample(a, b) will first store the value of <br/>
                      a into edi and b into esi before calling the function.
              </div>
            </li>
            <li>
              <div className="info-subheading">r10D - r13D </div>
              <div className="info-desc">
                    The remaining registers are used for general purposes. <br/>
                    This includes doing calculation or holding temporary values.
              </div>
            </li>
            <li>
              <div className="info-subheading">Flags</div>
              <div className="info-desc">
                    The conditional flags are set upon calling the cmp function. For example, <br/>
                    the ZF flag will be set to 1 if the two operands are identical or the difference is zero. <br/>
                <a href="https://en.wikipedia.org/wiki/FLAGS_register">More info here</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
