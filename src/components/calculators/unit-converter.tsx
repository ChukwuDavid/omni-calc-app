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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

const unitCategories = {
  length: {
    label: "Length",
    units: {
      m: "Meter",
      km: "Kilometer",
      mi: "Mile",
      ft: "Feet",
      cm: "Centimeter",
    },
    conversions: {
      // Base: meter
      m: 1,
      km: 1000,
      mi: 1609.34,
      ft: 0.3048,
      cm: 0.01,
    },
  },
  mass: {
    label: "Mass",
    units: { kg: "Kilogram", g: "Gram", lb: "Pound", oz: "Ounce" },
    conversions: {
      // Base: kilogram
      kg: 1,
      g: 0.001,
      lb: 0.453592,
      oz: 0.0283495,
    },
  },
  time: {
    label: "Time",
    units: { s: "Second", min: "Minute", hr: "Hour", day: "Day" },
    conversions: {
      // Base: second
      s: 1,
      min: 60,
      hr: 3600,
      day: 86400,
    },
  },
  temperature: {
    label: "Temperature",
    units: { C: "Celsius", F: "Fahrenheit", K: "Kelvin" },
    // Temp conversions are not simple factors, handle separately
  },
};

type CategoryKey = keyof typeof unitCategories;

export function UnitConverter() {
  const [category, setCategory] = useState<CategoryKey>("length");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");
  const [inputValue, setInputValue] = useState<string>("1");
  const [result, setResult] = useState<string>("");

  const handleConvert = () => {
    const inputVal = parseFloat(inputValue);
    if (isNaN(inputVal)) {
      setResult("Invalid Input");
      return;
    }

    const cat = unitCategories[category];
    if (category === "temperature") {
      // Handle temperature separately
      let tempResult: number | null = null;
      if (fromUnit === "C" && toUnit === "F")
        tempResult = (inputVal * 9) / 5 + 32;
      else if (fromUnit === "F" && toUnit === "C")
        tempResult = ((inputVal - 32) * 5) / 9;
      else if (fromUnit === "C" && toUnit === "K")
        tempResult = inputVal + 273.15;
      else if (fromUnit === "K" && toUnit === "C")
        tempResult = inputVal - 273.15;
      else if (fromUnit === "F" && toUnit === "K")
        tempResult = ((inputVal - 32) * 5) / 9 + 273.15;
      else if (fromUnit === "K" && toUnit === "F")
        tempResult = ((inputVal - 273.15) * 9) / 5 + 32;
      else if (fromUnit === toUnit) tempResult = inputVal; // Same unit conversion

      if (tempResult !== null) {
        setResult(tempResult.toFixed(2));
      } else {
        setResult("N/A"); // Should not happen if units are valid C, F, K
      }
    } else {
      // For non-temperature categories, we expect 'conversions' property.
      if ("conversions" in cat && cat.conversions) {
        // Type guard for 'conversions'
        const currentConversions = cat.conversions;
        const fromFactor =
          currentConversions[fromUnit as keyof typeof currentConversions];
        const toFactor =
          currentConversions[toUnit as keyof typeof currentConversions];

        if (fromFactor !== undefined && toFactor !== undefined) {
          const valueInBase = inputVal * fromFactor;
          const convertedValue = valueInBase / toFactor;
          setResult(convertedValue.toFixed(5));
        } else {
          setResult("N/A"); // Invalid unit for category or factor not found
        }
      } else {
        // This case implies a structural issue with unitCategories if category is not 'temperature'.
        setResult("Conversion configuration error for this category.");
      }
    }
  };

  const currentUnits = unitCategories[category].units;

  const handleCategoryChange = (newCategory: CategoryKey) => {
    setCategory(newCategory);
    const defaultFromUnit = Object.keys(unitCategories[newCategory].units)[0];
    const defaultToUnit =
      Object.keys(unitCategories[newCategory].units)[1] || defaultFromUnit;
    setFromUnit(defaultFromUnit);
    setToUnit(defaultToUnit);
    setInputValue("1"); // Reset input value on category change
    setResult(""); // Reset result on category change
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Unit Converter</CardTitle>
        <CardDescription>
          Convert units for length, mass, time, and temperature.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category-select" className="font-body">
            Category
          </Label>
          <Select
            value={category}
            onValueChange={(value) =>
              handleCategoryChange(value as CategoryKey)
            }
          >
            <SelectTrigger id="category-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(unitCategories).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <Label htmlFor="from-unit-select" className="font-body">
              From
            </Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="from-unit-select">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentUnits).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => {
              const temp = fromUnit;
              setFromUnit(toUnit);
              setToUnit(temp);
            }}
          >
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </Button>

          <div>
            <Label htmlFor="to-unit-select" className="font-body">
              To
            </Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="to-unit-select">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currentUnits).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="input-value" className="font-body">
            Value
          </Label>
          <Input
            id="input-value"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="font-code"
          />
        </div>

        <Button onClick={handleConvert} className="w-full">
          Convert
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <p className="font-body text-sm text-muted-foreground">Result:</p>
            <p className="font-headline text-2xl text-primary">
              {inputValue} {currentUnits[fromUnit as keyof typeof currentUnits]}{" "}
              = {result} {currentUnits[toUnit as keyof typeof currentUnits]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
