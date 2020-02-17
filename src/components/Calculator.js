import React, { useState } from 'react';
import './calculator.css';

const CalculatorButton = props => (
    <div className='btn-container'>
        <button onClick={() => props.onClick(props.value)}>{props.value}</button>
    </div>
);

const Calculator = props => {
    const [displayString, setDisplayString] = useState({
        current: '0',
        last: ' ',
        displayResult: true
    });

    const [lastResult, setLastResult] = useState({
        operation: '',
        result: '0'
    });

    const formatCalculation = (calculation) => {
        return insertMultiplication(calculation);
    }

    const insertMultiplication = (calculation) => {
        // Regex for implicit multiplication with brackets
        const implicitMultiplication = /(\d+\(+(\-\d+|\d+))|(\)\()|(\d+\)+\d+)/g;
        let newCalc = calculation;
        while (newCalc.match(implicitMultiplication)) {
            // Insert '*' into expressions like this: 2(2) = 4, or 2(-2) = -4, or 2((2)*1) = 4
            newCalc = newCalc.replace(/(\d+)(\(+)(\-\d+|\d+)/g, '$1*$2$3');

            // Insert '*' into expressions like this: (2)2 = 4, or ((2))2 = 4. (2)-2 should SUBTRACT so it is left alone.
            newCalc = newCalc.replace(/(\d+)(\)+)(\d+)/g, '$1$2*$3');

            // Insert '*' into expressions like this: (2)(2) = 4
            newCalc = newCalc.replace(/(\)\()/g, ')*(');
        }
        return newCalc;
    }

    const selectBtn = (btnValue) => {
        // Error occurred, overwrite it with whatever we typed in
        if (lastResult.result === 'ERROR' && btnValue !== '=') {
            setLastResult({
                operation: '',
                result: ''
            });
            setDisplayString({
                current: btnValue + '',
                last: ' ',
                displayResult: false
            });
        }
        // User hits equal sign and we have some calculation typed in
        else if (btnValue === '=' && displayString.current.length > 0) {
            const operation = formatCalculation(displayString.current);
            let result;
            try {
                result = eval(operation);
                if (Number.isNaN(result)) {
                    result = 'ERROR'
                }
            } catch (error) {
                result = 'ERROR';
            }

            setLastResult({
                operation: operation,
                result: result + ''
            });
            setDisplayString({
                current: result + '',
                last: operation + ' = ',
                displayResult: true
            });
        }
        // User hits any key that is not '='
        else if (btnValue !== '=') {
            let newCurrent = displayString.current + btnValue;
            if (displayString.displayResult && !btnValue.match(/^\*|\/|\+|-/)) {
                newCurrent = btnValue;
            }

            // Don't allow user to add an operation or decimal twice in a row
            if (btnValue.match(/^\*|\/|\+|\-|\./) && displayString.current.length > 0 && btnValue === displayString.current.slice(-1)) {
                return;
            }

            // If we add an operation, and the last character was an operation, then we overwrite it.
            if (btnValue.match(/^\*|\/|\+|\-/) && displayString.current.match(/(\*|\/|\+|\-)$/)) {
                newCurrent = displayString.current.slice(0, -1) + btnValue;
            }

            // If we add an operation after a decimal we need to pad a zero
            if (!btnValue.match(/\d/) && displayString.current.match(/\.$/)) {
                newCurrent = displayString.current + '0' + btnValue;
            }

            setDisplayString({
                current: newCurrent + '',
                last: lastResult.result.length > 0 ? 'Ans = ' + lastResult.result : ' ',
                displayResult: false
            });
        }
    }

    const clearBtn = () => {
        setDisplayString({
            current: '0',
            last: ' ',
            displayResult: true
        });
        setLastResult({
            operation: '',
            result: '0'
        });
    }

    const backspaceBtn = () => {
        if (displayString.current.length > 0 && !displayString.displayResult) {
            let newValue = displayString.current.slice(0, -1);
            setDisplayString({
                ...displayString,
                current: newValue.length === 0 ? '0' : newValue + '',
            });
        }
    }

    return (
        <div className='calculator'>
            <div className='display-container'>
                <div className='calc-display'>
                    <p className='last-calculation'>{displayString.last}</p>
                    <p className='current-calculation'>{displayString.displayResult ? lastResult.result : displayString.current}</p>
                </div>
            </div>
            <div className="btn-row">
                <CalculatorButton onClick={selectBtn} value='(' />
                <CalculatorButton onClick={selectBtn} value=')' />
                <CalculatorButton onClick={backspaceBtn} value='CE' />
                <CalculatorButton onClick={clearBtn} value='C' />
            </div>
            <div className="btn-row">
                <CalculatorButton onClick={selectBtn} value='1' />
                <CalculatorButton onClick={selectBtn} value='2' />
                <CalculatorButton onClick={selectBtn} value='3' />
                <CalculatorButton onClick={selectBtn} value='+' />
            </div>
            <div className="btn-row">
                <CalculatorButton onClick={selectBtn} value='4' />
                <CalculatorButton onClick={selectBtn} value='5' />
                <CalculatorButton onClick={selectBtn} value='6' />
                <CalculatorButton onClick={selectBtn} value='-' />
            </div>
            <div className="btn-row">
                <CalculatorButton onClick={selectBtn} value='7' />
                <CalculatorButton onClick={selectBtn} value='8' />
                <CalculatorButton onClick={selectBtn} value='9' />
                <CalculatorButton onClick={selectBtn} value='*' />
            </div>
            <div className="btn-row">
                <CalculatorButton onClick={selectBtn} value='0' />
                <CalculatorButton onClick={selectBtn} value='.' />
                <CalculatorButton onClick={selectBtn} value='=' />
                <CalculatorButton onClick={selectBtn} value='/' />
            </div>
        </div>

    );
};

export default Calculator;