"use client";

import { cn } from "@/lib/utils";

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  className?: string;
}

export function CalculatorDisplay({
  expression,
  result,
  className,
}: CalculatorDisplayProps) {
  return (
    <div
      className={cn(
        "bg-background border border-input p-4 rounded-lg shadow-inner mb-6 text-right break-all min-h-[100px] flex flex-col justify-end",
        className
      )}
      aria-live="polite"
    >
      <div
        className="text-muted-foreground text-lg sm:text-xl h-8 overflow-x-auto overflow-y-hidden font-code"
        aria-label="Expression"
      >
        {expression || " "}
      </div>
      <div
        className="text-foreground text-3xl sm:text-4xl font-bold h-10 sm:h-12 overflow-x-auto overflow-y-hidden font-code"
        aria-label="Current Input or Result"
      >
        {result || "0"}
      </div>
    </div>
  );
}
