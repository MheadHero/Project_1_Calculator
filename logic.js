let runningsTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen"); //declare first, so can reuse

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
    if (value !== "=") {
      renderOperator();
    } else {
      render();
    }
  } else {
    handleNumber(value);
    render();
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningsTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      doMath(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningsTotal;
      runningsTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  const intBuffer = parseInt(buffer);
  if (runningsTotal === 0) {
    runningsTotal = intBuffer;
  } else {
    doMath(intBuffer);
  }
  previousOperator = symbol;
  currentOperator = symbol;
  buffer = "0";
}

function doMath(intBuffer) {
  if (previousOperator === "+") {
    runningsTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningsTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningsTotal *= intBuffer;
  } else {
    runningsTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer.length >= 13) {
    return;
  } else if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function render() {
  screen.innerText = buffer;
}

function renderOperator() {
  screen.innerText = previousOperator;
}

function init() {
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init(); //initializes the calculator
