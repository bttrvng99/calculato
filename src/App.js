import "./App.css";
import { useState } from "react";

var final = false;

function App() {
  var [originalNumber, setOriginalNumber] = useState(0);
  var [fullEquation, setEquation] = useState("");
  var [viewResult, setViewResult] = useState("0");
  var insertedNumber = 0;
  var [inputExpression, setInputExpression] = useState("");

  const enterNumber = (number) => {
    // debugger;
    if (viewResult === "0" || final) {
      viewResult = number.toString();
      final = false;
    } else viewResult += number.toString();
    setViewResult(viewResult);
  };

  const enterOperand = (operand) => {
    setInputExpression(operand);
    insertedNumber = Number(viewResult);
    if (originalNumber === 0 || inputExpression === "") {
      setOriginalNumber(insertedNumber);
      setViewResult("0");
    } else {
      setOriginalNumber(
        calculate(inputExpression, originalNumber, insertedNumber)
      );
      setViewResult("0");
    }
  };

  const enterPrefix = () => {
    if (viewResult !== "0") setViewResult(0 - Number(viewResult));
  };

  const clickEqual = () => {
    insertedNumber = Number(viewResult);
    if (inputExpression.length === 0 || originalNumber === 0) {
      setViewResult(insertedNumber);
    } else {
      setViewResult(calculate(inputExpression, originalNumber, insertedNumber));
    }
    var ogNumber = originalNumber;
    var ogExpression = inputExpression;
    var ogNumber2 = insertedNumber;
    setInputExpression("");
    setOriginalNumber("0");
    setEquation(ogNumber + " " + ogExpression + " " + ogNumber2 + " =");
    final = true;
  };

  const backspace = () => {
    if (viewResult.length > 1)
      setViewResult(viewResult.slice(0, viewResult.length - 1));
    else setViewResult("0");
  };

  const clear = (input) => {
    switch (input) {
      case "C":
        setOriginalNumber(0);
        insertedNumber = 0;
        setInputExpression("");
        setEquation("")
        setViewResult("0");
        break;
      case "CE":
        setViewResult("0");
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
            {inputExpression}
          </div>
          <div className="screen--inserted">{viewResult}</div>
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
              if (!viewResult.includes(".")) viewResult += ".";
              setViewResult(viewResult);
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
  var orgNumber = originalNumber;
  switch (inputExpression) {
    case "+": {
      orgNumber += insertedNumber;
      break;
    }
    case "-": {
      orgNumber -= insertedNumber;
      break;
    }
    case "*": {
      orgNumber *= insertedNumber;
      break;
    }
    case "/": {
      orgNumber /= insertedNumber;
      break;
    }
    default: {
      break;
    }
  }
  return orgNumber;
}

export default App;
