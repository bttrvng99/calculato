import "./App.css";
import { useState } from "react";

var final = false;

function App() {
  var [originalNumber, setOriginalNumber] = useState(0);
  var [fullEquation, setEquation] = useState("");
  var [inputNumber, setInputNumber] = useState("0");
  var insertedNumber = 0;
  var [inputExpression, setInputExpression] = useState("");

  const enterNumber = (number) => {
    // debugger;
    if (inputNumber === "0" || final) {
      inputNumber = number.toString();
      final = false;
    } else inputNumber += number.toString();
    setInputNumber(inputNumber);
  };

  const enterOperand = (operand) => {
    setInputExpression(operand);
    insertedNumber = Number(inputNumber);
    if (originalNumber === 0 || inputExpression === "") {
      setOriginalNumber(insertedNumber);
      setInputNumber("0");
    } else {
      setOriginalNumber(
        calculate(inputExpression, originalNumber, insertedNumber)
      );
      setInputNumber("0");
    }
  };

  const enterPrefix = () => {
    if (inputNumber !== "0") setInputNumber(0 - Number(inputNumber));
  };

  const clickEqual = () => {
    insertedNumber = Number(inputNumber);
    if (inputExpression.length === 0 || originalNumber === 0) {
      setInputNumber(insertedNumber);
    } else {
      setInputNumber(calculate(inputExpression, originalNumber, insertedNumber));
    }
    var ogNumber = originalNumber;
    var ogExpression = inputExpression;
    var ogNumber2 = insertedNumber;
    setInputExpression("");
    setOriginalNumber("0");
    setEquation(ogExpression.length > 0 ? ogNumber + " " + ogExpression + " " + ogNumber2 + " =" : ogNumber2 + " =");
    final = true;
  };

  const backspace = () => {
    if (inputNumber.length > 1)
      setInputNumber(inputNumber.slice(0, inputNumber.length - 1));
    else setInputNumber("0");
  };

  const clear = (input) => {
    switch (input) {
      case "C":
        setOriginalNumber(0);
        insertedNumber = 0;
        setInputExpression("");
        setEquation("")
        setInputNumber("0");
        final = false;
        break;
      case "CE":
        setInputNumber("0");
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <main>
        <div className="screen">
          <div className="screen--original">
            {final && inputExpression === "" ? fullEquation : originalNumber}
            {" " + inputExpression}
          </div>
          <div className="screen--inserted">{inputNumber}</div>
        </div>
        <div className="numpad">
          <button className="numpad--percentage">%</button>
          <button className="numpad--clearEntry" onClick={() => clear("CE")}>
            CE
          </button>
          <button className="numpad--clear" onClick={() => clear("C")}>
            C
          </button>
          <button className="numpad--backspace" onClick={() => backspace()}>
            Backspace
          </button>
          <button className="numpad--oneNth">1/x</button>
          <button className="numpad--square">x^2</button>
          <button className="numpad--squareRoot">sqrt(x)</button>
          <button className="numpad--divide" onClick={() => enterOperand("/")}>
            /
          </button>
          <button className="numpad--seven" onClick={() => enterNumber(7)}>
            7
          </button>
          <button className="numpad--eight" onClick={() => enterNumber(8)}>
            8
          </button>
          <button className="numpad--nine" onClick={() => enterNumber(9)}>
            9
          </button>
          <button
            className="numpad--multiply"
            onClick={() => enterOperand("*")}
          >
            *
          </button>
          <button className="numpad--four" onClick={() => enterNumber(4)}>
            4
          </button>
          <button className="numpad--five" onClick={() => enterNumber(5)}>
            5
          </button>
          <button className="numpad--six" onClick={() => enterNumber(6)}>
            6
          </button>
          <button className="numpad--minus" onClick={() => enterOperand("-")}>
            -
          </button>
          <button className="numpad--one" onClick={() => enterNumber(1)}>
            1
          </button>
          <button className="numpad--two" onClick={() => enterNumber(2)}>
            2
          </button>
          <button className="numpad--three" onClick={() => enterNumber(3)}>
            3
          </button>
          <button className="numpad--plus" onClick={() => enterOperand("+")}>
            +
          </button>
          <button className="numpad--prefix" onClick={() => enterPrefix()}>
            +/-
          </button>
          <button className="numpad--zero" onClick={() => enterNumber(0)}>
            0
          </button>
          <button
            className="numpad--decimal"
            onClick={() => {
              if (!inputNumber.includes(".")) inputNumber += ".";
              setInputNumber(inputNumber);
            }}
          >
            .
          </button>
          <button className="numpad--equal" onClick={() => clickEqual()}>
            =
          </button>
        </div>
      </main>
    </div>
  );
}

function calculate(inputExpression, originalNumber, insertedNumber) {
  var ogNumber = originalNumber;
  switch (inputExpression) {
    case "+": {
      ogNumber += insertedNumber;
      break;
    }
    case "-": {
      ogNumber -= insertedNumber;
      break;
    }
    case "*": {
      ogNumber *= insertedNumber;
      break;
    }
    case "/": {
      ogNumber /= insertedNumber;
      break;
    }
    default: {
      break;
    }
  }
  return ogNumber;
}

export default App;
