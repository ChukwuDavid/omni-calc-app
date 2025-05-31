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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus, Repeat } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TimeDuration {
  hours: string;
  minutes: string;
  seconds: string;
}

const timeUnits = {
  seconds: { label: "Seconds", factor: 1 },
  minutes: { label: "Minutes", factor: 60 },
  hours: { label: "Hours", factor: 3600 },
  days: { label: "Days", factor: 86400 },
};
type TimeUnitKey = keyof typeof timeUnits;

export function TimeCalculator() {
  const [activeTab, setActiveTab] = useState<"duration" | "conversion">(
    "duration"
  );

  // Duration Calculation State
  const [duration1, setDuration1] = useState<TimeDuration>({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [duration2, setDuration2] = useState<TimeDuration>({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [durationResult, setDurationResult] = useState<string | null>(null);

  // Unit Conversion State
  const [conversionValue, setConversionValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<TimeUnitKey>("minutes");
  const [toUnit, setToUnit] = useState<TimeUnitKey>("hours");
  const [conversionResult, setConversionResult] = useState<string | null>(null);

  const parseDurationToSeconds = (duration: TimeDuration): number => {
    const h = parseInt(duration.hours, 10) || 0;
    const m = parseInt(duration.minutes, 10) || 0;
    const s = parseInt(duration.seconds, 10) || 0;
    return h * 3600 + m * 60 + s;
  };

  const formatSecondsToDurationString = (totalSeconds: number): string => {
    const sign = totalSeconds < 0 ? "-" : "";
    const absSeconds = Math.abs(totalSeconds);
    const h = Math.floor(absSeconds / 3600);
    const m = Math.floor((absSeconds % 3600) / 60);
    const s = absSeconds % 60;
    return `${sign}${h}h ${m}m ${s}s`;
  };

  const handleDurationCalculate = () => {
    const seconds1 = parseDurationToSeconds(duration1);
    const seconds2 = parseDurationToSeconds(duration2);
    let totalResultSeconds: number;

    if (operation === "add") {
      totalResultSeconds = seconds1 + seconds2;
    } else {
      totalResultSeconds = seconds1 - seconds2;
      if (totalResultSeconds < 0) {
        setDurationResult(
          "Result is negative: " +
            formatSecondsToDurationString(totalResultSeconds)
        );
        return;
      }
    }
    setDurationResult(formatSecondsToDurationString(totalResultSeconds));
  };

  const handleDurationChange = (
    setter: React.Dispatch<React.SetStateAction<TimeDuration>>,
    field: keyof TimeDuration,
    value: string
  ) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const handleConversion = () => {
    const val = parseFloat(conversionValue);
    if (isNaN(val)) {
      setConversionResult("Invalid input value.");
      return;
    }

    const fromFactor = timeUnits[fromUnit].factor;
    const toFactor = timeUnits[toUnit].factor;

    const valueInSeconds = val * fromFactor;
    const resultValue = valueInSeconds / toFactor;

    setConversionResult(
      `${conversionValue} ${
        timeUnits[fromUnit].label
      } = ${resultValue.toLocaleString(undefined, {
        maximumFractionDigits: 6,
      })} ${timeUnits[toUnit].label}`
    );
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Time Calculator
        </CardTitle>
        <CardDescription>
          Perform time duration arithmetic or convert time units.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "duration" | "conversion")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="duration">Duration Calculation</TabsTrigger>
            <TabsTrigger value="conversion">Unit Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="duration" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration 1 */}
              <div className="space-y-4 p-4 border rounded-lg">
                <Label className="font-body text-lg">Duration 1</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="d1-hours" className="font-body text-xs">
                      Hours
                    </Label>
                    <Input
                      id="d1-hours"
                      type="number"
                      min="0"
                      value={duration1.hours}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration1,
                          "hours",
                          e.target.value
                        )
                      }
                      placeholder="H"
                      className="font-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="d1-minutes" className="font-body text-xs">
                      Minutes
                    </Label>
                    <Input
                      id="d1-minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={duration1.minutes}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration1,
                          "minutes",
                          e.target.value
                        )
                      }
                      placeholder="M"
                      className="font-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="d1-seconds" className="font-body text-xs">
                      Seconds
                    </Label>
                    <Input
                      id="d1-seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={duration1.seconds}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration1,
                          "seconds",
                          e.target.value
                        )
                      }
                      placeholder="S"
                      className="font-code"
                    />
                  </div>
                </div>
              </div>

              {/* Duration 2 */}
              <div className="space-y-4 p-4 border rounded-lg">
                <Label className="font-body text-lg">Duration 2</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="d2-hours" className="font-body text-xs">
                      Hours
                    </Label>
                    <Input
                      id="d2-hours"
                      type="number"
                      min="0"
                      value={duration2.hours}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration2,
                          "hours",
                          e.target.value
                        )
                      }
                      placeholder="H"
                      className="font-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="d2-minutes" className="font-body text-xs">
                      Minutes
                    </Label>
                    <Input
                      id="d2-minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={duration2.minutes}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration2,
                          "minutes",
                          e.target.value
                        )
                      }
                      placeholder="M"
                      className="font-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="d2-seconds" className="font-body text-xs">
                      Seconds
                    </Label>
                    <Input
                      id="d2-seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={duration2.seconds}
                      onChange={(e) =>
                        handleDurationChange(
                          setDuration2,
                          "seconds",
                          e.target.value
                        )
                      }
                      placeholder="S"
                      className="font-code"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="operation-select" className="font-body">
                Operation
              </Label>
              <Select
                value={operation}
                onValueChange={(value) =>
                  setOperation(value as "add" | "subtract")
                }
              >
                <SelectTrigger
                  id="operation-select"
                  className="w-full md:w-[180px]"
                >
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">
                    <div className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" /> Add
                    </div>
                  </SelectItem>
                  <SelectItem value="subtract">
                    <div className="flex items-center">
                      <Minus className="mr-2 h-4 w-4" /> Subtract
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleDurationCalculate} className="w-full">
              Calculate Duration
            </Button>

            {durationResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-2xl text-primary">
                  {durationResult}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="conversion" className="mt-6 space-y-6">
            <div>
              <Label htmlFor="conversion-value" className="font-body">
                Value to Convert
              </Label>
              <Input
                id="conversion-value"
                type="number"
                value={conversionValue}
                onChange={(e) => setConversionValue(e.target.value)}
                placeholder="Enter value"
                className="font-code"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div>
                <Label htmlFor="from-unit-select" className="font-body">
                  From Unit
                </Label>
                <Select
                  value={fromUnit}
                  onValueChange={(v) => setFromUnit(v as TimeUnitKey)}
                >
                  <SelectTrigger id="from-unit-select">
                    <SelectValue placeholder="From unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => {
                  const temp = fromUnit;
                  setFromUnit(toUnit);
                  setToUnit(temp);
                }}
                aria-label="Swap units"
              >
                <Repeat className="h-5 w-5 text-primary" />
              </Button>

              <div>
                <Label htmlFor="to-unit-select" className="font-body">
                  To Unit
                </Label>
                <Select
                  value={toUnit}
                  onValueChange={(v) => setToUnit(v as TimeUnitKey)}
                >
                  <SelectTrigger id="to-unit-select">
                    <SelectValue placeholder="To unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleConversion} className="w-full">
              Convert Units
            </Button>

            {conversionResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-xl text-primary">
                  {conversionResult}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
