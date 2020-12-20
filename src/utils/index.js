const calculatorData = [
    1,
    2,
    3,
    'Add(+)',
    4,
    5,
    6,
    'Subtract(-)',
    7,
    8,
    9,
    'Multiply(*)',
    'Clear',
    0,
    '=',
    'Divide(/)',
  ];
  
  const scientificData = ['square', 'square root', '±'];
  
  const ArrayToString = (array) => {
    let convertedString = array.join('');
    return convertedString;
  }
  /**
   * Takes an array, the latest symbol & the intermediateResult stored up to the previous evaluation
   * @returns 'sum' after perform necessary type conversions
   */
  const CalCulateFinalResult = (finalNumber, symbol, intermediateResult) => {
    let finalNumberToArray = finalNumber.split('');
    let finalNumberArrayToString = finalNumberToArray.reverse();
    finalNumber = finalNumberArrayToString.join('');
    let sum = intermediateResult + symbol + finalNumber;
    return sum;
  }
  
  /**
   * Runs a loop to get the latest symbol and the digit, to perform the final calculation on hitting '='
   */
  const getLastInputAndSymbol = (array, intermediateResult, swapDisplay, operation) => {
    let stack = ArrayToString(array);
    let symbol;
    let lastNumber = "";
    let foundSymbol = false;
    for (let i = stack.length - 1; i !== 0; i--) {
      if (stack[i] === '+') {
        symbol = stack[i];
        foundSymbol = true;
        break;
      }
      else if (stack[i] === '*') {
        symbol = stack[i];
        foundSymbol = true;
        break;
      }
      else if (stack[i] === '-') {
        symbol = stack[i];
        foundSymbol = true;
        break;
      }
      else if (stack[i] === '/') {
        symbol = stack[i];
        foundSymbol = true;
        break;
      }
      lastNumber += stack[i]
    }
    let sum;
    let numberAndSign = {
      number: lastNumber,
      sign: symbol
    }
    if (foundSymbol) {
      if (operation === 'finalResult') {
        if (intermediateResult) {
          sum = CalCulateFinalResult(lastNumber, symbol, intermediateResult);
          return sum;
        }
        else {
          sum = CalCulateFinalResult(lastNumber, symbol, swapDisplay);
          return sum;
        }
      }
      else {
        return numberAndSign;
      }
    }
    else {
      if (operation === 'finalResult') {
        sum = lastNumber;
        return sum;
      }
      else {
        return numberAndSign;
      }
    }
  
  }
  
  
  
  export { ArrayToString, CalCulateFinalResult, getLastInputAndSymbol, calculatorData, scientificData}