class Node {
    constructor(name, accept, transitions) {
        this.name = name;
        this.transitions = {};
        this.accept = accept;

        if (transitions != null) {
            this.transitions[transitions[0]] = transitions;
        }
    }
    addTransition(node) {
        this.transitions[Object.keys(node.transitions)[0]] = node.transitions[Object.keys(node.transitions)[0]];
    }
}

class Tape {
    constructor(string, blank) {
        this.blank = blank;
        this.cells = string.split('');
        this.currIndex = 0;
    }
    moveLeft() {
        this.currIndex--
        if (this.currIndex < 0) {
            this.currIndex++;
            this.cells.unshift(this.blank);
        }
    }
    moveRight() {
        this.currIndex++
        if (this.currIndex > this.cells.length - 1) {
            this.cells.push(this.blank);
        }
    }
    transition(read, write, direction, currentNode, nextNode) {
        if (this.cells[this.currIndex] === read) {
            this.cells[this.currIndex] = write;
            direction === 'R' ? this.moveRight() : this.moveLeft();
            return nextNode;
        }
        return currentNode;
    }
}

class TuringMachine {
    constructor(nodeArray, start, blank, string) {
        this.nodes = nodeArray;
        this.current = start;
        this.blank = blank;
        this.string = string;
        this.tape = new Tape(string, blank);
    }
    runTuringMachine() {
        while (true) {
            console.log(`Current Node: ${this.current.name}`);
            console.log(`Tape: ${this.tape.cells}`);
            console.log(`      ${'  '.repeat(this.tape.currIndex)}^`);
            if (Object.keys(this.current.transitions).includes(this.tape.cells[this.tape.currIndex])) {
                this.current = this.tape.transition(this.tape.cells[this.tape.currIndex],
                    this.current.transitions[this.tape.cells[this.tape.currIndex]][1], this.current.transitions[this.tape.cells[this.tape.currIndex]][2],
                    this.current, this.nodes[this.current.transitions[this.tape.cells[this.tape.currIndex]][3]]);
            } else {
                break;
            }

        }
        this.checkAccept();
    }
    checkAccept() {
        if (this.current.accept === true) {
            console.log(`Your String, ${this.string}, is ACCEPTED`);
        } else {
            console.log(`Your String, ${this.string}, is NOT ACCEPTED`);
        }
    }
}

function parseDescription(line) {
    return descArray = line.split(/START=|;ACCEPT=|;BLANK=/).filter(element => element != '');
}

function parseTransition(line) {
    let nodeDesc = line.split(/[:,]|->/);
    return new Node(nodeDesc[0], false, nodeDesc.slice(1));
}

async function simulateTuringMachine() {
    const read = require('readline');
    const readline = read.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let description;
    let descriptionRead = false;
    let nodes = {};
    let start;

    for await (const line of readline) {
        if (!descriptionRead && line != '') {
            description = parseDescription(line);
            descriptionRead = true;
        } else if (line != '') {
            if (parseTransition(line).name in nodes) {
                nodes[parseTransition(line).name].addTransition(parseTransition(line));
            } else {
                nodes[parseTransition(line).name] = parseTransition(line);
            }
        }
    }
    let blank = description[2];
    description[1].split(',').forEach(acceptState => {
        if (acceptState in nodes) {
            nodes[acceptState].accept = true;
        } else {
            nodes[acceptState] = new Node(acceptState, true, null)
        }
        start = nodes[description[0]]
    })

    let turingMachine = new TuringMachine(nodes, start, blank, process.argv[2]);
    turingMachine.runTuringMachine();
}

simulateTuringMachine();

