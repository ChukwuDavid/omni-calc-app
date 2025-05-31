"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FinancialCalculator() {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [calculationType, setCalculationType] = useState("percentage_of"); // percentage_of, discount, tip, markup

  const calculate = () => {
    const numAmount = parseFloat(amount);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numAmount) || isNaN(numPercentage)) {
      setResult("Invalid input");
      return;
    }

    let calculatedValue = 0;
    let description = "";

    switch (calculationType) {
      case "percentage_of":
        calculatedValue = (numAmount * numPercentage) / 100;
        description = `${numPercentage}% of ${numAmount} is ${calculatedValue.toFixed(
          2
        )}`;
        break;
      case "discount":
        const discountAmount = (numAmount * numPercentage) / 100;
        calculatedValue = numAmount - discountAmount;
        description = `Original: ${numAmount}, Discount: ${numPercentage}% (${discountAmount.toFixed(
          2
        )}), Final Price: ${calculatedValue.toFixed(2)}`;
        break;
      case "tip":
        const tipAmount = (numAmount * numPercentage) / 100;
        calculatedValue = numAmount + tipAmount;
        description = `Bill: ${numAmount}, Tip: ${numPercentage}% (${tipAmount.toFixed(
          2
        )}), Total: ${calculatedValue.toFixed(2)}`;
        break;
      case "markup":
        const markupAmount = (numAmount * numPercentage) / 100;
        calculatedValue = numAmount + markupAmount;
        description = `Cost: ${numAmount}, Markup: ${numPercentage}% (${markupAmount.toFixed(
          2
        )}), Selling Price: ${calculatedValue.toFixed(2)}`;
        break;
      default:
        setResult("Unknown calculation type");
        return;
    }
    setResult(description);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Financial Calculator
        </CardTitle>
        <CardDescription>
          Calculate percentages, discounts, tips, and markups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="percentage_of"
          onValueChange={setCalculationType}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="percentage_of">Percentage</TabsTrigger>
            <TabsTrigger value="discount">Discount</TabsTrigger>
            <TabsTrigger value="tip">Tip</TabsTrigger>
            <TabsTrigger value="markup">Markup</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="amount" className="font-body">
                {calculationType === "markup" ||
                calculationType === "percentage_of"
                  ? "Base Amount / Cost"
                  : "Amount / Bill"}
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="font-code"
              />
            </div>
            <div>
              <Label htmlFor="percentage" className="font-body">
                Percentage (%)
              </Label>
              <Input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
                className="font-code"
              />
            </div>
            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>
            {result && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-lg text-primary whitespace-pre-wrap">
                  {result}
                </p>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
