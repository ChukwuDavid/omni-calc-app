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
  Plus,
  RotateCcw,
  X as Multiply,
  Equal,
  Pi,
} from "lucide-react"; // Removed Sigma as it's not used for an icon

const AdvancedOps: {
  display: string | React.ReactNode;
  value: string;
  type: "fn" | "op" | "num" | "sp";
  action?: (current: number) => number;
  symbol?: string;
  takesParams?: number;
}[] = [
  { display: "sin", value: "sin", type: "fn", symbol: "sin(" },
  { display: "cos", value: "cos", type: "fn", symbol: "cos(" },
  { display: "tan", value: "tan", type: "fn", symbol: "tan(" },
  { display: "log", value: "log", type: "fn", symbol: "log(" }, // base 10
  { display: "ln", value: "ln", type: "fn", symbol: "ln(" }, // natural log
  { display: "√", value: "sqrt", type: "fn", symbol: "sqrt(" },
  { display: "x²", value: "sq", type: "fn", symbol: "^2" }, // Op: number^2
  { display: "xʸ", value: "pow", type: "op", symbol: "^" }, // Op: base^exponent
  {
    display: <Pi size={20} />,
    value: "PI",
    type: "num",
    symbol: String(Math.PI),
  },
  { display: "e", value: "E", type: "num", symbol: String(Math.E) },
  { display: "(", value: "(", type: "sp", symbol: "(" },
  { display: ")", value: ")", type: "sp", symbol: ")" },
];

export function AdvancedCalculator() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [currentExpression, setCurrentExpression] = useState<string>("");

  const handleInput = (val: string, type: string, symbol?: string) => {
    const inputSymbol = symbol || val;
    if (currentExpression.includes("=")) {
      // Start new calculation after equals
      if (type === "num" || (type === "fn" && symbol?.endsWith("("))) {
        setCurrentExpression(inputSymbol);
        setDisplayValue(inputSymbol);
      } else if (type === "op") {
        setCurrentExpression(displayValue + inputSymbol);
        setDisplayValue(displayValue + inputSymbol);
      }
      return;
    }

    if (type === "num" || type === "fn" || type === "sp" || type === "op") {
      if (
        displayValue === "0" &&
        inputSymbol !== "." &&
        !inputSymbol.endsWith("(") &&
        type !== "op" &&
        !currentExpression.endsWith(")")
      ) {
        // If display is "0" and not appending a decimal, or function call, or operator after closing parenthesis
        setDisplayValue(inputSymbol);
        setCurrentExpression(inputSymbol);
      } else {
        setDisplayValue((prev) => prev + inputSymbol);
        setCurrentExpression((prev) => prev + inputSymbol);
      }
    }
  };

  const handleClearAll = () => {
    setDisplayValue("0");
    setCurrentExpression("");
  };

  const handleDel = () => {
    if (currentExpression.includes("=")) {
      handleClearAll();
      return;
    }
    const newExpression = currentExpression.slice(0, -1);
    setCurrentExpression(newExpression);
    setDisplayValue(newExpression || "0");
  };

  const handleToggleSign = () => {
    // Toggles sign if displayValue is a standalone number or a result
    if (/^[-+]?\d*\.?\d+(?:e[-+]?\d+)?$/.test(displayValue)) {
      const toggledNumber = String(parseFloat(displayValue) * -1);
      setDisplayValue(toggledNumber);
      // If currentExpression was the same as displayValue, or it was a result.
      if (
        currentExpression === displayValue ||
        currentExpression.endsWith(`= ${displayValue}`)
      ) {
        setCurrentExpression(toggledNumber);
      }
      // Otherwise, if displayValue was part of a longer expression (e.g. "sin("), this action might be ambiguous.
      // Current simple implementation assumes +/- is used on a full number.
    }
  };

  const handleEquals = () => {
    let result: number | string | null = null;
    let evaluated = false;
    const expr = currentExpression.trim();

    if (!expr || expr.endsWith("=") || expr.endsWith("(")) {
      // Do nothing if empty, already evaluated, or ends with open paren
      return;
    }

    // Pattern 1: Trig functions (sin, cos, tan) - e.g., "sin(90)"
    const trigMatch = expr.match(
      /^(sin|cos|tan)\(([-+]?\d*\.?\d+(?:e[-+]?\d+)?)\)$/i
    );
    if (trigMatch) {
      const func = trigMatch[1].toLowerCase();
      const val = parseFloat(trigMatch[2]);
      if (!isNaN(val)) {
        let calcResult: number;
        if (func === "sin") calcResult = Math.sin(val * (Math.PI / 180));
        else if (func === "cos") calcResult = Math.cos(val * (Math.PI / 180));
        else {
          // tan
          if (Math.abs(val % 180) === 90) {
            result = "Error: Undefined";
          } else {
            calcResult = Math.tan(val * (Math.PI / 180));
            if (!result) result = calcResult; // Assign if not already 'Error: Undefined'
          }
        }
        if (result !== "Error: Undefined") result = calcResult!;
        evaluated = true;
      }
    }

    // Pattern 2: Log functions (log, ln) and sqrt - e.g., "log(100)", "sqrt(16)"
    if (!evaluated) {
      const logSqrtMatch = expr.match(
        /^(log|ln|sqrt)\(([-+]?\d*\.?\d+(?:e[-+]?\d+)?)\)$/i
      );
      if (logSqrtMatch) {
        const func = logSqrtMatch[1].toLowerCase();
        const val = parseFloat(logSqrtMatch[2]);
        if (!isNaN(val)) {
          if (func === "log") result = Math.log10(val);
          else if (func === "ln") result = Math.log(val);
          else if (func === "sqrt") {
            if (val < 0) result = "Error: Sqrt neg";
            else result = Math.sqrt(val);
          }
          evaluated = true;
        }
      }
    }

    // Pattern 3: Square (number^2) - e.g., "5^2"
    if (!evaluated) {
      const squareMatch = expr.match(/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)\^2$/);
      if (squareMatch) {
        const val = parseFloat(squareMatch[1]);
        if (!isNaN(val)) {
          result = val * val;
          evaluated = true;
        }
      }
    }

    // Pattern 4: Power (base^exponent) - e.g., "2^3"
    if (!evaluated) {
      const powerMatch = expr.match(
        /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)\^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)$/
      );
      if (powerMatch) {
        const base = parseFloat(powerMatch[1]);
        const exponent = parseFloat(powerMatch[2]);
        if (!isNaN(base) && !isNaN(exponent)) {
          result = Math.pow(base, exponent);
          evaluated = true;
        }
      }
    }

    // Pattern 5: Basic arithmetic (number op number) e.g. "3.14*2"
    if (!evaluated) {
      const simpleArithMatch = expr.match(
        /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)\s*([+\-×÷])\s*([-+]?\d*\.?\d+(?:e[-+]?\d+)?)$/
      );
      if (simpleArithMatch) {
        const val1 = parseFloat(simpleArithMatch[1]);
        const op = simpleArithMatch[2];
        const val2 = parseFloat(simpleArithMatch[3]);

        if (!isNaN(val1) && !isNaN(val2)) {
          if (op === "+") result = val1 + val2;
          else if (op === "-") result = val1 - val2;
          else if (op === "×") result = val1 * val2;
          else if (op === "÷") {
            if (val2 === 0) result = "Error: Div by 0";
            else result = val1 / val2;
          }
          evaluated = true;
        }
      }
    }

    if (evaluated && result !== null) {
      let displayResultStr = String(result);
      if (typeof result === "number") {
        if (isNaN(result)) displayResultStr = "Error: NaN";
        else if (!isFinite(result)) displayResultStr = "Error: Infinity";
        else {
          // Precision formatting for valid numbers
          if (
            Math.abs(result) > 1e-9 &&
            Math.abs(result) < 1e12 &&
            result !== 0
          ) {
            // Use toPrecision for a fixed number of significant digits.
            // parseFloat is used to remove trailing zeros from toPrecision if it's a whole number.
            displayResultStr = String(parseFloat(result.toPrecision(10)));
          } else if (result !== 0) {
            // For very small/large numbers, use default string (often sci notation)
            displayResultStr = String(result);
          } else {
            // result is 0
            displayResultStr = "0";
          }
        }
      }
      setDisplayValue(displayResultStr);
      setCurrentExpression((prevExpr) => `${prevExpr} = ${displayResultStr}`);
    } else if (expr && !evaluated) {
      setDisplayValue("Error: Syntax");
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Advanced Calculator
        </CardTitle>
        <CardDescription>
          Access scientific functions and more. Enter expressions like sin(90),
          5^2, or log(100).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalculatorDisplay
          expression={currentExpression}
          result={displayValue}
        />
        <div className="grid grid-cols-5 gap-2">
          {AdvancedOps.slice(0, 5).map((op) => (
            <CalculatorButton
              key={op.value}
              displayValue={op.display}
              onClick={() => handleInput(op.value, op.type, op.symbol)}
              buttonType="fn"
            />
          ))}
          {AdvancedOps.slice(5, 10).map((op) => (
            <CalculatorButton
              key={op.value}
              displayValue={op.display}
              onClick={() => handleInput(op.value, op.type, op.symbol)}
              buttonType={op.type === "fn" ? "fn" : "number"}
            />
          ))}

          <CalculatorButton
            displayValue={AdvancedOps[10].display}
            onClick={() =>
              handleInput(
                AdvancedOps[10].value,
                AdvancedOps[10].type,
                AdvancedOps[10].symbol
              )
            }
            buttonType="special"
          />
          <CalculatorButton
            displayValue={AdvancedOps[11].display}
            onClick={() =>
              handleInput(
                AdvancedOps[11].value,
                AdvancedOps[11].type,
                AdvancedOps[11].symbol
              )
            }
            buttonType="special"
          />
          <CalculatorButton
            displayValue={<RotateCcw size={20} />}
            onClick={handleClearAll}
            buttonType="special"
            aria-label="Clear All"
          />
          <CalculatorButton
            displayValue="%"
            onClick={() => handleInput("%", "op", "%")}
            buttonType="operator"
            aria-label="Percent"
            title="Percent not fully implemented in equals"
          />
          <CalculatorButton
            displayValue={<Divide size={20} />}
            onClick={() => handleInput("÷", "op", "÷")}
            buttonType="operator"
            aria-label="Divide"
          />

          <CalculatorButton
            displayValue="7"
            onClick={() => handleInput("7", "num")}
          />
          <CalculatorButton
            displayValue="8"
            onClick={() => handleInput("8", "num")}
          />
          <CalculatorButton
            displayValue="9"
            onClick={() => handleInput("9", "num")}
          />
          <CalculatorButton
            displayValue={<Multiply size={20} />}
            onClick={() => handleInput("×", "op", "×")}
            buttonType="operator"
            aria-label="Multiply"
          />
          <CalculatorButton
            displayValue="DEL"
            onClick={handleDel}
            buttonType="special"
          />

          <CalculatorButton
            displayValue="4"
            onClick={() => handleInput("4", "num")}
          />
          <CalculatorButton
            displayValue="5"
            onClick={() => handleInput("5", "num")}
          />
          <CalculatorButton
            displayValue="6"
            onClick={() => handleInput("6", "num")}
          />
          <CalculatorButton
            displayValue={<Minus size={20} />}
            onClick={() => handleInput("-", "op", "-")}
            buttonType="operator"
            aria-label="Subtract"
          />
          <CalculatorButton
            displayValue="ANS"
            onClick={() => alert("ANS not implemented")}
            buttonType="special"
          />

          <CalculatorButton
            displayValue="1"
            onClick={() => handleInput("1", "num")}
          />
          <CalculatorButton
            displayValue="2"
            onClick={() => handleInput("2", "num")}
          />
          <CalculatorButton
            displayValue="3"
            onClick={() => handleInput("3", "num")}
          />
          <CalculatorButton
            displayValue={<Plus size={20} />}
            onClick={() => handleInput("+", "op", "+")}
            buttonType="operator"
            aria-label="Add"
          />
          <CalculatorButton
            displayValue={<Equal size={20} />}
            onClick={handleEquals}
            buttonType="action"
            aria-label="Equals"
            gridSpan={1}
            className="row-span-2 h-auto"
          />

          <CalculatorButton
            displayValue="0"
            onClick={() => handleInput("0", "num")}
            gridSpan={2}
          />
          <CalculatorButton
            displayValue="."
            onClick={() => handleInput(".", "num")}
          />
          <CalculatorButton
            displayValue="+/-"
            onClick={handleToggleSign}
            buttonType="special"
          />
        </div>
      </CardContent>
    </Card>
  );
}
