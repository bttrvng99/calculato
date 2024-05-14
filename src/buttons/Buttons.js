import "./Buttons.css";
import { useState } from "react";

var final = false;

export default function Button({ 
    text,
     type,
     inputNumber,
     setInputNumber,
     inputExpression,
     setInputExpression,
     originalNumber, 
     setOriginalNumber,
     fullEquation,
     setEquation
    }) {
        var insertedNumber = 0;

  const enterNumber = (number) => {
    // debugger;
    if (inputNumber === "0" || final) {
      inputNumber = number.toString();
      final = false;
    } else inputNumber += number.toString();
    setInputNumber(inputNumber);
  };

  const enterOperand = (operand) => {
    debugger;
    setInputExpression(operand);
    console.log(inputExpression);
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
      setInputNumber(
        calculate(inputExpression, originalNumber, insertedNumber)
      );
    }
    // var ogNumber = originalNumber;
    // var ogExpression = inputExpression;
    // var ogNumber2 = insertedNumber;
    setInputExpression("");
    setOriginalNumber("0");
    setEquation(
      inputExpression.length > 0
        ? originalNumber + " " + inputExpression + " " + insertedNumber + " ="
        : insertedNumber + " ="
    );
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
        setEquation("");
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

  const clickButton = (text, type) => {
    switch (type) {
      case "number":
        enterNumber(Number(text));
        break;
      case "operand":
        enterOperand(text);
        break;
      case "clear":
        clear(text);
        break;
      case "sign":
        enterPrefix();
        break;
      case "decimal":
        if (!inputNumber.includes(".")) inputNumber += ".";
        setInputNumber(inputNumber);
        break;
      case "backspace":
        backspace();
        break;
      case "equal":
        clickEqual();
        break;
      default:
        break;
    }
  };

  console.log('render')
  return <button onClick={() => clickButton(text, type)}>{text}</button>;
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
