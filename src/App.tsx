import { useState } from "react";
import "./App.css";

type Operator = "+" | "-" | "*" | "/" | null;

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNumber, setWaitingForNumber] = useState<boolean>(false);

  const inputNumber = (number: string) => {
    if (waitingForNumber) {
      setDisplay(number);
      setWaitingForNumber(false);
      return;
    }

    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForNumber) {
      setDisplay("0,");
      setWaitingForNumber(false);
      return;
    }

    if (!display.includes(",")) {
      setDisplay(display + ",");
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(false);
  };

  const changeSign = () => {
    if (display === "0" || display === "Ошибка") return;

    if (display.startsWith("-")) {
      setDisplay(display.substring(1));
    } else {
      setDisplay("-" + display);
    }
  };

  const calculatePercent = () => {
    if (display === "Ошибка") return;

    const number = parseFloat(display.replace(",", "."));

    if (Number.isNaN(number)) return;

    setDisplay(formatResult(number / 100));
  };

  const calculate = (
    a: number,
    b: number,
    operation: Exclude<Operator, null>,
  ): number | null => {
    switch (operation) {
      case "+":
        return a + b;

      case "-":
        return a - b;

      case "*":
        return a * b;

      case "/":
        if (b === 0) {
          return null;
        }

        return a / b;
    }
  };

  const formatResult = (number: number): string => {
    const rounded =
      Math.round((number + Number.EPSILON) * 100000000) / 100000000;

    return String(rounded).replace(".", ",");
  };

  const chooseOperator = (nextOperator: Exclude<Operator, null>) => {
    if (display === "Ошибка") return;

    const currentNumber = parseFloat(display.replace(",", "."));

    if (firstNumber === null) {
      setFirstNumber(currentNumber);
    } else if (operator !== null && !waitingForNumber) {
      const result = calculate(firstNumber, currentNumber, operator);

      if (result === null) {
        setDisplay("Ошибка");
        setFirstNumber(null);
        setOperator(null);
        setWaitingForNumber(true);
        return;
      }

      setDisplay(formatResult(result));
      setFirstNumber(result);
    }

    setOperator(nextOperator);
    setWaitingForNumber(true);
  };

  const calculateResult = () => {
    if (firstNumber === null || operator === null || display === "Ошибка") {
      return;
    }

    const secondNumber = parseFloat(display.replace(",", "."));

    const result = calculate(firstNumber, secondNumber, operator);

    if (result === null) {
      setDisplay("Ошибка");
    } else {
      setDisplay(formatResult(result));
    }

    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(true);
  };

  const formattedDisplay = (): string => {
    if (display === "Ошибка") return display;

    const [integerPart, decimalPart] = display.split(",");

    const negative = integerPart.startsWith("-");

    const cleanInteger = negative ? integerPart.substring(1) : integerPart;

    const formattedInteger = cleanInteger.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return (
      (negative ? "-" : "") +
      formattedInteger +
      (decimalPart !== undefined ? "," + decimalPart : "")
    );
  };

  return (
    <>
      <div className="calculator">
        <div className="display">{formattedDisplay()}</div>
        <div className="keysContainer">
          <div className="keys grey" onClick={clearCalculator}>
            {display === "0" ? "AC" : "C"}
          </div>
          <div className="keys grey" onClick={changeSign}>
            <span>
              <sup>+</sup>/<sub>−</sub>
            </span>
          </div>
          <div className="keys grey" onClick={calculatePercent}>
            %
          </div>
          <div
            className={`keys orange ${
              operator === "/" && waitingForNumber ? "" : ""
            }`}
            onClick={() => chooseOperator("/")}
          >
            ÷
          </div>
          <div className="keys" onClick={() => inputNumber("7")}>
            7
          </div>
          <div className="keys" onClick={() => inputNumber("8")}>
            8
          </div>
          <div className="keys" onClick={() => inputNumber("9")}>
            9
          </div>
          <div
            className={`keys orange ${
              operator === "*" && waitingForNumber ? "" : ""
            }`}
            onClick={() => chooseOperator("*")}
          >
            ×
          </div>
          <div className="keys" onClick={() => inputNumber("4")}>
            4
          </div>
          <div className="keys" onClick={() => inputNumber("5")}>
            5
          </div>
          <div className="keys" onClick={() => inputNumber("6")}>
            6
          </div>
          <div
            className={`keys orange ${
              operator === "-" && waitingForNumber ? "" : ""
            }`}
            onClick={() => chooseOperator("-")}
          >
            −
          </div>
          <div className="keys" onClick={() => inputNumber("1")}>
            1
          </div>
          <div className="keys" onClick={() => inputNumber("2")}>
            2
          </div>
          <div className="keys" onClick={() => inputNumber("3")}>
            3
          </div>
          <div
            className={`keys orange ${
              operator === "+" && waitingForNumber ? "" : ""
            }`}
            onClick={() => chooseOperator("+")}
          >
            +
          </div>
          <div className="keys zero" onClick={() => inputNumber("0")}>
            0
          </div>
          <div className="keys" onClick={inputDecimal}>
            ,
          </div>
          <div className="keys orange" onClick={calculateResult}>
            =
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
