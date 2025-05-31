"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalculatorButton } from "@/components/calculator-button";
import { CalculatorDisplay } from "@/components/calculator-display";
import {
  Divide,
  Minus,
  Percent,
  Plus,
  RotateCcw,
  X as Multiply,
  Equal,
} from "lucide-react";

// This is a very simplified calculation logic for demonstration.
// A robust calculator would require a proper expression parser and evaluator.
const calculate = (
  operand1: number,
  operator: string,
  operand2: number
): number => {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "×":
      return operand1 * operand2;
    case "÷":
      return operand2 === 0 ? Infinity : operand1 / operand2; // Handle division by zero
    default:
      return operand2; // Should not happen with valid operator
  }
};

export function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [currentExpression, setCurrentExpression] = useState<string>("");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  // Effect to handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if ((key >= "0" && key <= "9") || key === ".") handleNumberInput(key);
      else if (key === "+") handleOperatorInput("+");
      else if (key === "-") handleOperatorInput("-");
      else if (key === "*") handleOperatorInput("×");
      else if (key === "/") handleOperatorInput("÷");
      else if (key === "Enter" || key === "=") handleEquals();
      else if (key === "Backspace") handleBackspace();
      else if (key === "Escape") handleClearAll();
      else if (key === "%") handlePercent();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayValue, previousValue, operator, waitingForOperand]);

  const handleNumberInput = (numStr: string) => {
    if (waitingForOperand) {
      setDisplayValue(numStr);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" && numStr !== "." ? numStr : displayValue + numStr
      );
    }
    setCurrentExpression((prev) => prev + numStr);
  };

  const handleOperatorInput = (op: string) => {
    if (operator && !waitingForOperand && previousValue) {
      const result = calculate(
        parseFloat(previousValue),
        operator,
        parseFloat(displayValue)
      );
      setDisplayValue(String(result));
      setPreviousValue(String(result));
    } else {
      setPreviousValue(displayValue);
    }
    setOperator(op);
    setWaitingForOperand(true);
    setCurrentExpression((prev) => `${displayValue} ${op} `);
  };

  const handleEquals = () => {
    if (operator && previousValue && !waitingForOperand) {
      const result = calculate(
        parseFloat(previousValue),
        operator,
        parseFloat(displayValue)
      );
      setCurrentExpression((prev) => `${prev} = ${result}`);
      setDisplayValue(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true); // Ready for new calculation
    }
  };

  const handleClearAll = () => {
    setDisplayValue("0");
    setCurrentExpression("");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (waitingForOperand) return; // Don't backspace if operator was last input
    setDisplayValue(displayValue.slice(0, -1) || "0");
    setCurrentExpression((prev) => prev.slice(0, -1) || "");
  };

  const handleToggleSign = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const handlePercent = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
    setCurrentExpression((prev) => `${prev}%`);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Basic Calculator
        </CardTitle>
        <CardDescription>Perform simple arithmetic operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <CalculatorDisplay
          expression={currentExpression}
          result={displayValue}
        />
        <div className="grid grid-cols-4 gap-2">
          <CalculatorButton
            displayValue={<RotateCcw size={20} />}
            onClick={handleClearAll}
            buttonType="special"
            gridSpan={1}
            aria-label="Clear All"
          />
          <CalculatorButton
            displayValue="+/-"
            onClick={handleToggleSign}
            buttonType="special"
            aria-label="Toggle Sign"
          />
          <CalculatorButton
            displayValue={<Percent size={20} />}
            onClick={handlePercent}
            buttonType="special"
            aria-label="Percent"
          />
          <CalculatorButton
            displayValue={<Divide size={20} />}
            onClick={() => handleOperatorInput("÷")}
            buttonType="operator"
            aria-label="Divide"
          />

          <CalculatorButton
            displayValue="7"
            onClick={() => handleNumberInput("7")}
          />
          <CalculatorButton
            displayValue="8"
            onClick={() => handleNumberInput("8")}
          />
          <CalculatorButton
            displayValue="9"
            onClick={() => handleNumberInput("9")}
          />
          <CalculatorButton
            displayValue={<Multiply size={20} />}
            onClick={() => handleOperatorInput("×")}
            buttonType="operator"
            aria-label="Multiply"
          />

          <CalculatorButton
            displayValue="4"
            onClick={() => handleNumberInput("4")}
          />
          <CalculatorButton
            displayValue="5"
            onClick={() => handleNumberInput("5")}
          />
          <CalculatorButton
            displayValue="6"
            onClick={() => handleNumberInput("6")}
          />
          <CalculatorButton
            displayValue={<Minus size={20} />}
            onClick={() => handleOperatorInput("-")}
            buttonType="operator"
            aria-label="Subtract"
          />

          <CalculatorButton
            displayValue="1"
            onClick={() => handleNumberInput("1")}
          />
          <CalculatorButton
            displayValue="2"
            onClick={() => handleNumberInput("2")}
          />
          <CalculatorButton
            displayValue="3"
            onClick={() => handleNumberInput("3")}
          />
          <CalculatorButton
            displayValue={<Plus size={20} />}
            onClick={() => handleOperatorInput("+")}
            buttonType="operator"
            aria-label="Add"
          />

          <CalculatorButton
            displayValue="0"
            onClick={() => handleNumberInput("0")}
            gridSpan={2}
          />
          <CalculatorButton
            displayValue="."
            onClick={() => handleNumberInput(".")}
          />
          <CalculatorButton
            displayValue={<Equal size={20} />}
            onClick={handleEquals}
            buttonType="action"
            aria-label="Equals"
          />
        </div>
      </CardContent>
    </Card>
  );
}
