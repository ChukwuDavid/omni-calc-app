"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicCalculator } from "@/components/calculators/basic-calculator";
import { AdvancedCalculator } from "@/components/calculators/advanced-calculator";
import { UnitConverter } from "@/components/calculators/unit-converter";
import { FinancialCalculator } from "@/components/calculators/financial-calculator";
import { DateCalculator } from "@/components/calculators/date-calculator";
import { EquationSolver } from "@/components/calculators/equation-solver";
import { FormulaExplainer } from "@/components/calculators/formula-explainer";
import { TimeCalculator } from "@/components/calculators/time-calculator"; // New Import
import {
  Calculator,
  Sigma,
  Scale,
  Landmark,
  CalendarDays,
  Superscript,
  Lightbulb,
  Menu,
  Clock,
} from "lucide-react"; // Added Clock
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { value: "basic", label: "Basic", icon: Calculator },
  { value: "advanced", label: "Advanced", icon: Sigma },
  { value: "unit", label: "Unit Converter", icon: Scale },
  { value: "financial", label: "Financial", icon: Landmark },
  { value: "date", label: "Date", icon: CalendarDays },
  { value: "time", label: "Time", icon: Clock }, // New Item
  { value: "equation", label: "Equation Solver", icon: Superscript },
  { value: "formula", label: "Formula AI", icon: Lightbulb },
];

export default function OmniCalcPage() {
  const [activeTab, setActiveTab] = React.useState(NAV_ITEMS[0].value);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto px-2 py-4 sm:p-4 min-h-screen flex flex-col items-center">
      <header className="my-6 sm:my-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-headline text-primary">
          OmniCalc
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 font-body">
          Your all-in-one calculation powerhouse.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full max-w-3xl"
      >
        <div className="hidden sm:block">
          <TabsList className="flex flex-wrap justify-center h-auto p-1">
            {NAV_ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex items-center gap-2 px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="sm:hidden mb-4 flex justify-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Menu className="h-5 w-5" />
                <span>
                  {NAV_ITEMS.find((item) => item.value === activeTab)?.label ||
                    "Menu"}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 pt-6">
              <nav className="flex flex-col space-y-1 px-2">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.value}>
                    <Button
                      variant={activeTab === item.value ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => handleTabChange(item.value)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <TabsContent value="basic" className="mt-6">
          <BasicCalculator />
        </TabsContent>
        <TabsContent value="advanced" className="mt-6">
          <AdvancedCalculator />
        </TabsContent>
        <TabsContent value="unit" className="mt-6">
          <UnitConverter />
        </TabsContent>
        <TabsContent value="financial" className="mt-6">
          <FinancialCalculator />
        </TabsContent>
        <TabsContent value="date" className="mt-6">
          <DateCalculator />
        </TabsContent>
        <TabsContent value="time" className="mt-6">
          {" "}
          {/* New Tab Content */}
          <TimeCalculator />
        </TabsContent>
        <TabsContent value="equation" className="mt-6">
          <EquationSolver />
        </TabsContent>
        <TabsContent value="formula" className="mt-6">
          <FormulaExplainer />
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-xs sm:text-sm text-muted-foreground font-body">
        {currentYear !== null ? (
          <p>&copy; {currentYear} OmniCalc. Precision at your fingertips.</p>
        ) : (
          <p>&copy; OmniCalc. Precision at your fingertips.</p>
        )}
      </footer>
    </div>
  );
}
