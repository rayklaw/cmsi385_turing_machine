# Turing Machine
This repository contains a Turing Machine Simulator coded in Javascript. This program is to be run in the console and accepts a `.txt file` to `stdin` and a `string` as a `console argument`. It makes use of the Node runtime enviroment to read lines from the text file. 

### To Run in the Console:
``` node TuringMachine.js {STRING TO BE PARSED} < {TEXT FILE DESCRIPTION OF TURING MACHINE} ```

Example:

``` node TuringMachine.js 000111 < input.txt ```

### Text File Description of Turing Machine
The description of a Turing Machine must be in the following format to be guarenteed to work.
*The current input.txt file is a description of a Turing Machine that accepts L={0<sup>n</sup> 1<sup>n</sup>}, the language where the number of 0's and 1's are equal*
```
START=q0;ACCEPT=q2,q1;BLANK=B

q0:a->b,R,q1
q1:a->c,L,q2
q0:b->b,R,q0
```
The first line provides a description of a Turing Machine and requires a START, ACCEPT, and BLANK. 

START denotes the starting Node of the Turing Machine. 

ACCEPT denotes the accepted Nodes of the Turing Machine.

BLANK denotes the blank symbol for the Tape of the Turing Machine.

``` q0:a->b,R,q1 ```
The following lines provides a description for each Node in the Turing Machine. 

q0 is the name of the Node. 

a is the symbol to be read from the Tape. 

b is the symbol to be written to the Tape.

R or L are the directions to scroll the Tape.

q1 is the Node that this transition moves to. 
