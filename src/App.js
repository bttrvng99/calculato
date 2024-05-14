import "./App.css";
import { useState } from "react";
import Button from "./buttons/Buttons";

var final = false;

const buttonList = [
  {
    id: 10,
    text: "%",
    type: "",
  },
  {
    id: 11,
    text: "CE",
    type: "clear",
  },
  {
    id: 12,
    text: "C",
    type: "clear",
  },
  {
    id: 13,
    text: "Backspace",
    type: "backspace",
  },
  {
    id: 14,
    text: "1/x",
    type: "",
  },
  {
    id: 15,
    text: "x^2",
    type: "",
  },
  {
    id: 16,
    text: "sqrt(x)",
    type: "",
  },
  {
    id: 17,
    text: "/",
    type: "operand",
  },
  {
    id: 7,
    text: "7",
    type: "number",
  },
  {
    id: 8,
    text: "8",
    type: "number",
  },
  {
    id: 9,
    text: "9",
    type: "number",
  },
  {
    id: 18,
    text: "*",
    type: "operand",
  },
  {
    id: 4,
    text: "4",
    type: "number",
  },
  {
    id: 5,
    text: "5",
    type: "number",
  },
  {
    id: 6,
    text: "6",
    type: "number",
  },
  {
    id: 19,
    text: "-",
    type: "operand",
  },
  {
    id: 1,
    text: "1",
    type: "number",
  },
  {
    id: 2,
    text: "2",
    type: "number",
  },
  {
    id: 3,
    text: "3",
    type: "number",
  },
  {
    id: 21,
    text: "+",
    type: "operand",
  },
  {
    id: 20,
    text: "+/-",
    type: "sign",
  },
  {
    id: 0,
    text: "0",
    type: "number",
  },
  {
    id: 23,
    text: ".",
    type: "decimal",
  },
  {
    id: 22,
    text: "=",
    type: "equal",
  },
];

function App() {
  var [originalNumber, setOriginalNumber] = useState(0);
  var [fullEquation, setFullEquation] = useState("");
  var [inputNumber, setInputNumber] = useState("0");
  var [inputExpression, setInputExpression] = useState("");

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
          {buttonList.map((button) => {
            return (
              <Button
                text={button.text}
                type={button.type}
                inputExpression={inputExpression}
                inputNumber={inputNumber}
                originalNumber={originalNumber}
                fullEquation={fullEquation}
                onChangeInputExpression={setInputExpression}
                onChangeInputNumber={setInputNumber}
                onChangeOriginalNumber={setOriginalNumber}
                onChangeFullEquation={setFullEquation}
                key={button.id}
              ></Button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
