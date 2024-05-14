import "./Buttons.css";

var final = false;

export default function Button({
  text,
  type,
  inputNumber,
  onChangeInputNumber,
  inputExpression,
  onChangeInputExpression,
  originalNumber,
  onChangeOriginalNumber,
  fullEquation,
  onChangeFullEquation,
}) {
  var insertedNumber = 0;

  const enterNumber = (number) => {
    if (inputNumber === "0" || final) {
      inputNumber = number.toString();
      final = false;
    } else inputNumber += number.toString();
    onChangeInputNumber(inputNumber);
  };

  const enterOperand = (operand) => {
    onChangeInputExpression(operand);
    console.log(inputExpression);
    insertedNumber = Number(inputNumber);
    if (originalNumber === 0 || inputExpression === "") {
      onChangeOriginalNumber(insertedNumber);
      onChangeInputNumber("0");
    } else {
      onChangeOriginalNumber(
        calculate(inputExpression, originalNumber, insertedNumber)
      );
      onChangeInputNumber("0");
    }
  };

  const enterPrefix = () => {
    if (inputNumber !== "0") onChangeInputNumber(0 - Number(inputNumber));
  };

  const clickEqual = () => {
    insertedNumber = Number(inputNumber);
    if (inputExpression.length === 0 || originalNumber === 0) {
      onChangeInputNumber(insertedNumber);
    } else {
      onChangeInputNumber(
        calculate(inputExpression, originalNumber, insertedNumber)
      );
    }
    // var ogNumber = originalNumber;
    // var ogExpression = inputExpression;
    // var ogNumber2 = insertedNumber;
    onChangeInputExpression("");
    onChangeOriginalNumber("0");
    onChangeFullEquation(
      inputExpression.length > 0
        ? originalNumber + " " + inputExpression + " " + insertedNumber + " ="
        : insertedNumber + " ="
    );
    final = true;
  };

  const backspace = () => {
    if (inputNumber.length > 1)
      onChangeInputNumber(inputNumber.slice(0, inputNumber.length - 1));
    else onChangeInputNumber("0");
  };

  const clear = (input) => {
    switch (input) {
      case "C":
        onChangeOriginalNumber(0);
        insertedNumber = 0;
        onChangeInputExpression("");
        onChangeFullEquation("");
        onChangeInputNumber("0");
        final = false;
        break;
      case "CE":
        onChangeInputNumber("0");
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
        if (!inputNumber.toString().includes(".")) inputNumber += ".";
        onChangeInputNumber(inputNumber);
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

  console.log("render");
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
