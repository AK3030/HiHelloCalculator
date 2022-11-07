
import CalcButton from "./CalcButton";
import React, { useState } from 'react';

const buttonRows = [
    [1, 2, 3, '+'],
    [4, 5, 6, '-'],
    [7, 8, 9, 'x'],
    ['AC', '+/-', '%', '÷']
]

const operations = {
    'x': (a, b) => a*b,
    '÷': (a, b) => a/b,
    '-': (a, b) => a-b,
    '+': (a, b) => a+b
}

// Bugs/todos
// todo: till need seperate operations for 'C' and 'AC'
// make results immutable
// fix '.' input (number inputs do not accept '.')
// 0 button does not scale correctly
// weird scroll behavior on mobile
// todo: split code into utility functions or hooks
// input values overflow
// chaining operations does not work without '=' in between
// incorrect order of operation
// button animations/highlight selected math operation
// organize class names better (BEM?)

function Calculator() {
    const [output, setOutput] = useState('');
    const [prevOutput, setPrevOutput] = useState('');
    const [currentOp, setCurrentOp] = useState(null);

    const executeOp = () => {
        let res = operations[currentOp](parseFloat(prevOutput), parseFloat(output));
        setOutput(res);
        setPrevOutput(null);
        setCurrentOp(null);
    }

    const onButtonClick = (val) => {
        if (val === 'AC') {
            setOutput(null);
        }
        else if (val === '+/-') {
            setOutput(prev => parseFloat(prev) * -1);
        }
        else if (val === '%') {
            setOutput(prev => parseFloat(prev)/100);
        }
        else if (val === '=') {
            executeOp();
        }
        else if (operations[val]) {
            if (currentOp) {
                executeOp()
            }
            setCurrentOp(val);
        }
        else if (typeof val === 'number' || val === '.') {
            if (currentOp && !prevOutput) {
                setPrevOutput(output);
                setOutput(val);
            } else {
                setOutput(prev => (prev?.toString() || '') + val);
            }
        }
    }

    return (
        <div id="calculator">
            <div className="button-row">
                <div className="left">
                    <CalcButton
                    val={0}
                    onClick={() => onButtonClick(0)} 
                    />
                </div>
                <div className="right">
                    <CalcButton
                    val="."
                    onClick={() => onButtonClick(".")} 
                    />
                    <CalcButton
                    val="="
                    onClick={() => onButtonClick("=")} 
                    />
            </div>

            </div>
            {buttonRows.map((row, index) => (
                <div key={index} className="button-row">
                    {
                        row.map(buttonVal => (
                            <CalcButton 
                            key={buttonVal} 
                            onClick={() => onButtonClick(buttonVal)} 
                            val={buttonVal}/>
                        ))
                    }
                </div>
            ))}

            <input 
            type="number" 
            onChange={(e) => setOutput(e.target.value)} 
            value={output || '0'}/>
        </div>
    );
}

export default Calculator;