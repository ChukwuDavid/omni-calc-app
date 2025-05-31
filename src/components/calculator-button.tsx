"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps extends Omit<ButtonProps, "value"> {
  displayValue: string | number | React.ReactNode;
  gridSpan?: number;
  buttonType?: "number" | "operator" | "action" | "special" | "fn"; // fn for functions like sqrt
  onClick?: () => void;
}

export function CalculatorButton({
  displayValue,
  gridSpan,
  buttonType = "number",
  className,
  onClick,
  ...props
}: CalculatorButtonProps) {
  return (
    <Button
      variant={
        buttonType === "operator" || buttonType === "fn"
          ? "secondary"
          : buttonType === "action"
          ? "default" // Use default (primary) for '='
          : "outline"
      }
      className={cn(
        "text-xl sm:text-2xl h-16 rounded-lg shadow-md active:shadow-inner active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        gridSpan && `col-span-${gridSpan}`,
        {
          "bg-accent text-accent-foreground hover:bg-accent/90":
            buttonType === "action",
          "bg-primary/10 hover:bg-primary/20 text-primary":
            buttonType === "special", // C, AC
          "bg-secondary hover:bg-secondary/80": buttonType === "operator",
          "bg-muted hover:bg-muted/80 text-foreground": buttonType === "fn",
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {displayValue}
    </Button>
  );
}
