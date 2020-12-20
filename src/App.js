import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import ScientificMode from './components/ScientificMode';
import { ArrayToString, getLastInputAndSymbol, calculatorData } from './utils';

function App() {

  const [scientificMode, updateScientificMode] = useState(false);
  const [dark, setDark] = useState(false);
  const [stack, updateStack] = useState([]);
  const [intermediateResult, updateIntermediateResult] = useState(0);
  const [swapDisplay, updateSwapDisplay] = useState(null);
  const [displayResult, updateDisplayResult] = useState([]);

  const toggleScientificMode = () => {
    updateScientificMode(!scientificMode);
  }

  const toggle = (themeStatus) => {
    if (themeStatus === 'light') {
      const isDark = false;
      localStorage.setItem('dark', JSON.stringify(isDark));
      setDark(isDark);
    }
    else {
      const isDark = true;
      localStorage.setItem('dark', JSON.stringify(isDark));
      setDark(isDark);
    }
  }

  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    setDark(isDark);
  }, [dark])

  const themes = {
    dark: {
      backgroundColor: '#666',
      color: '#fff',
      pageColor: '#000'
    },
    light: {
      backgroundColor: '#f0f0f0',
      color: '#000',
      pageColor: '#fff'
    }
  }

  /**
   * Gets input onclick. Evaluates expression if any operator is clicked, else just pushes it into the stack
   */
  const getInput = (input) => {
    if (input === 'Add(+)') {
      if (stack[stack.length - 1] !== '+') {
        updateStack([...stack, '+']);
        let tempResult = ArrayToString(stack);
        updateDisplayResult([]);
        updateIntermediateResult(eval(tempResult));
      }
    }
    else if (input === 'Subtract(-)') {
      if (stack[stack.length - 1] !== '-') {
        updateStack([...stack, '-']);
        let tempResult = ArrayToString(stack);
        updateDisplayResult([]);
        updateIntermediateResult(eval(tempResult));
      }
    }
    else if (input === 'Multiply(*)') {
      if (stack[stack.length - 1] !== '*') {
        updateStack([...stack, '*']);
        let tempResult = ArrayToString(stack);
        updateDisplayResult([]);
        updateIntermediateResult(eval(tempResult));
      }
    }
    else if (input === 'Divide(/)') {
      if (stack[stack.length - 1] !== '/') {
        updateStack([...stack, '/']);
        let tempResult = ArrayToString(stack);
        updateDisplayResult([]);
        updateIntermediateResult(eval(tempResult));
      }
    }
    else if (input === '=') {
      if (stack.length) {
        let tempResult = ArrayToString(stack);
        if ((tempResult[tempResult.length - 1] === '+') || (tempResult[tempResult.length - 1] === '-') || (tempResult[tempResult.length] === '*') || (tempResult[tempResult.length] === '/')) {
          alert('Needs an operand!');
        }
        else {
          let sum = getLastInputAndSymbol(stack, intermediateResult, swapDisplay, 'finalResult');
          updateDisplayResult([]);
          updateIntermediateResult(eval(sum));
        }
      }
    }
    else if (input === 'Clear') {
      updateStack([]);
      updateIntermediateResult(0);
      updateDisplayResult([]);
      updateSwapDisplay(null);
    }
    else {
      updateStack([...stack, input])
      if (intermediateResult) {
        updateSwapDisplay(intermediateResult);
        updateIntermediateResult(null);
      }
      else if (displayResult) {
        updateIntermediateResult(null);
      }
      else {
        let tempResult = ArrayToString(stack);
        updateIntermediateResult(tempResult);
      }
      updateDisplayResult([...displayResult, input]);
    }

  }

  /**
   * Performs scientific operations and clears the stack.
   */
  const performScientificOperations = (input) => {
    if (input === '±') {
      if (displayResult.length) {
        let changedSign = parseInt(ArrayToString(displayResult)) * -1;
        updateDisplayResult([changedSign]);
        updateStack([]);
      }
      else {
        let changedSign = intermediateResult * -1;
        updateIntermediateResult(changedSign);
        updateStack([]);
      }
    }
    else if (input === 'square') {
      let squaredNumber;
      if (displayResult.length) {
        squaredNumber = parseInt(ArrayToString(displayResult));
        squaredNumber *= squaredNumber;
        updateDisplayResult([squaredNumber]);
        updateStack([])
      } else {
        squaredNumber = intermediateResult * intermediateResult;
        updateIntermediateResult(squaredNumber);
        updateStack([]);
      }
    }
    else {
      let squareRoot;
      if (displayResult.length) {
        squareRoot = Math.sqrt(parseInt(ArrayToString(displayResult))).toFixed(2);
        updateDisplayResult([squareRoot]);
        updateStack([]);
      }
      else {
        squareRoot = Math.sqrt(intermediateResult).toFixed(2);
        updateIntermediateResult(squareRoot);
        updateStack([]);
      }
    }

  }

  const theme = dark ? themes.dark : themes.light
  const themeDark = !dark ? themes.dark : themes.light

  return (
    <div className="container" style={{ backgroundColor: theme.pageColor, color: theme.color }}>

      <div>
        <button onClick={toggleScientificMode} style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>Scientifc Mode</button>

        <div className="toggle-theme-buttons" >
          <button className="toggle-button" onClick={() => toggle('light')} style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>Light</button>
          <button className="toggle-button" onClick={() => toggle('dark')} style={{ backgroundColor: themeDark.backgroundColor, color: themeDark.color }}>Dark</button>
        </div>

        <div className="calulator-wrapper result-display" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
            <div className="stack-display">
              {stack}
            </div>
            <div className="current-input">
            {displayResult}  {intermediateResult}
          </div>
        </div>

        <div className="calculator-wrapper">
          {calculatorData.map((item, key) => (
            <Button key={key} style={{ backgroundColor: theme.backgroundColor }} getInput={getInput}>
              {item}
            </Button>
          ))}
        </div>

        {
          scientificMode ?
            <ScientificMode style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
              calculations={{ performScientificOperations }}
            /> : null
        }
      </div>

    </div>
  );
}

export default App;