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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, differenceInDays, addDays, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function DateCalculator() {
  const [calcType, setCalcType] = useState<"difference" | "add_subtract">(
    "difference"
  );

  // For difference
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [diffResult, setDiffResult] = useState<string | null>(null);

  // For add/subtract
  const [operationDate, setOperationDate] = useState<Date | undefined>(
    new Date()
  );
  const [daysToModify, setDaysToModify] = useState<string>("0");
  const [addSubtractResult, setAddSubtractResult] = useState<string | null>(
    null
  );
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const calculateDifference = () => {
    if (startDate && endDate) {
      const diff = differenceInDays(endDate, startDate);
      setDiffResult(`The difference is ${diff} day(s).`);
    } else {
      setDiffResult("Please select both dates.");
    }
  };

  const calculateAddSubtract = () => {
    if (operationDate && daysToModify) {
      const numDays = parseInt(daysToModify, 10);
      if (isNaN(numDays)) {
        setAddSubtractResult("Invalid number of days.");
        return;
      }
      const resultDate =
        operation === "add"
          ? addDays(operationDate, numDays)
          : subDays(operationDate, numDays);
      setAddSubtractResult(`The new date is ${format(resultDate, "PPP")}.`);
    } else {
      setAddSubtractResult("Please select a date and enter days.");
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Date Calculator
        </CardTitle>
        <CardDescription>
          Calculate date differences or add/subtract days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={calcType}
          onValueChange={(value) => setCalcType(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="difference">
              Difference Between Dates
            </TabsTrigger>
            <TabsTrigger value="add_subtract">Add/Subtract Days</TabsTrigger>
          </TabsList>
          <TabsContent value="difference" className="mt-6 space-y-4">
            <div>
              <Label className="font-body">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="font-body">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button onClick={calculateDifference} className="w-full">
              Calculate Difference
            </Button>
            {diffResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-lg text-primary">
                  {diffResult}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="add_subtract" className="mt-6 space-y-4">
            <div>
              <Label className="font-body">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !operationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {operationDate ? (
                      format(operationDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={operationDate}
                    onSelect={setOperationDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="days-to-modify" className="font-body">
                Days to Add/Subtract
              </Label>
              <Input
                id="days-to-modify"
                type="number"
                value={daysToModify}
                onChange={(e) => setDaysToModify(e.target.value)}
                placeholder="Enter number of days"
                className="font-code"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setOperation("add")}
                variant={operation === "add" ? "default" : "outline"}
                className="flex-1"
              >
                Add Days
              </Button>
              <Button
                onClick={() => setOperation("subtract")}
                variant={operation === "subtract" ? "default" : "outline"}
                className="flex-1"
              >
                Subtract Days
              </Button>
            </div>
            <Button onClick={calculateAddSubtract} className="w-full">
              Calculate New Date
            </Button>
            {addSubtractResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-lg text-primary">
                  {addSubtractResult}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
