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

export function EquationSolver() {
  const [equationType, setEquationType] = useState("linear"); // linear, quadratic

  // Linear: ax + b = c  => find x
  const [linearA, setLinearA] = useState("");
  const [linearB, setLinearB] = useState("");
  const [linearC, setLinearC] = useState("");
  const [linearResult, setLinearResult] = useState<string | null>(null);

  // Quadratic: ax^2 + bx + c = 0 => find x1, x2
  const [quadA, setQuadA] = useState("");
  const [quadB, setQuadB] = useState("");
  const [quadC, setQuadC] = useState("");
  const [quadResult, setQuadResult] = useState<string | null>(null);

  const solveLinear = () => {
    const a = parseFloat(linearA);
    const b = parseFloat(linearB);
    const c = parseFloat(linearC);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setLinearResult("Invalid coefficients.");
      return;
    }
    if (a === 0) {
      setLinearResult(
        b === c
          ? "Infinite solutions (identity)"
          : "No solution (contradiction)"
      );
      return;
    }
    const x = (c - b) / a;
    setLinearResult(`x = ${x.toFixed(4)}`);
  };

  const solveQuadratic = () => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setQuadResult("Invalid coefficients.");
      return;
    }
    if (a === 0) {
      // Not a quadratic equation
      setQuadResult(
        "Coefficient 'a' cannot be zero for a quadratic equation. This is a linear equation."
      );
      return;
    }
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setQuadResult(
        `Two distinct real roots: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`
      );
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      setQuadResult(`One real root (repeated): x = ${x.toFixed(4)}`);
    } else {
      const realPart = -b / (2 * a);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
      setQuadResult(
        `Two complex roots: x₁ = ${realPart.toFixed(
          4
        )} + ${imaginaryPart.toFixed(4)}i, x₂ = ${realPart.toFixed(
          4
        )} - ${imaginaryPart.toFixed(4)}i`
      );
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Equation Solver
        </CardTitle>
        <CardDescription>Solve linear and quadratic equations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="linear"
          onValueChange={setEquationType}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="linear">
              Linear Equation (ax + b = c)
            </TabsTrigger>
            <TabsTrigger value="quadratic">
              Quadratic Equation (ax² + bx + c = 0)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground font-body">
              Enter coefficients for ax + b = c
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="linear-a">a</Label>
                <Input
                  id="linear-a"
                  type="number"
                  value={linearA}
                  onChange={(e) => setLinearA(e.target.value)}
                  placeholder="a"
                  className="font-code"
                />
              </div>
              <div>
                <Label htmlFor="linear-b">b</Label>
                <Input
                  id="linear-b"
                  type="number"
                  value={linearB}
                  onChange={(e) => setLinearB(e.target.value)}
                  placeholder="b"
                  className="font-code"
                />
              </div>
              <div>
                <Label htmlFor="linear-c">c (result)</Label>
                <Input
                  id="linear-c"
                  type="number"
                  value={linearC}
                  onChange={(e) => setLinearC(e.target.value)}
                  placeholder="c"
                  className="font-code"
                />
              </div>
            </div>
            <Button onClick={solveLinear} className="w-full">
              Solve for x
            </Button>
            {linearResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-lg text-primary">
                  {linearResult}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="quadratic" className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground font-body">
              Enter coefficients for ax² + bx + c = 0
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="quad-a">a</Label>
                <Input
                  id="quad-a"
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(e.target.value)}
                  placeholder="a"
                  className="font-code"
                />
              </div>
              <div>
                <Label htmlFor="quad-b">b</Label>
                <Input
                  id="quad-b"
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(e.target.value)}
                  placeholder="b"
                  className="font-code"
                />
              </div>
              <div>
                <Label htmlFor="quad-c">c</Label>
                <Input
                  id="quad-c"
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(e.target.value)}
                  placeholder="c"
                  className="font-code"
                />
              </div>
            </div>
            <Button onClick={solveQuadratic} className="w-full">
              Solve for x
            </Button>
            {quadResult && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-body text-sm text-muted-foreground">
                  Result:
                </p>
                <p className="font-headline text-lg text-primary whitespace-pre-wrap">
                  {quadResult}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <p className="font-body text-sm text-muted-foreground mt-6">
          Simultaneous equation solver coming soon!
        </p>
      </CardContent>
    </Card>
  );
}
