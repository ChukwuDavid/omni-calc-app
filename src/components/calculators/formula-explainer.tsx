"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  explainFormula,
  type ExplainFormulaOutput,
} from "@/ai/flows/explain-formula";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FormulaExplainer() {
  const [formula, setFormula] = useState("");
  const [explanation, setExplanation] = useState<ExplainFormulaOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formula.trim()) {
      setError("Please enter a formula.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setExplanation(null);
    try {
      const result = await explainFormula({ formula });
      setExplanation(result);
    } catch (e: any) {
      console.error("Error explaining formula:", e);
      setError(
        e.message ||
          "Failed to explain formula. The AI model might be unavailable or the input is invalid. Please try again."
      );
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Formula Explainer AI
        </CardTitle>
        <CardDescription className="font-body">
          Enter a numerical formula and our AI will explain it and identify its
          likely area of application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="formula-input" className="font-body">
            Formula
          </Label>
          <Textarea
            id="formula-input"
            placeholder="e.g., E = mc^2,  A = πr²,  F = ma"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="font-code text-base"
            rows={3}
            aria-label="Formula input"
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Explain Formula
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      {explanation && (
        <CardFooter className="flex flex-col items-start space-y-6 border-t pt-6">
          <div>
            <h3 className="font-headline text-xl text-primary mb-1">
              Explanation:
            </h3>
            <p className="font-body text-sm text-foreground/90 whitespace-pre-wrap">
              {explanation.explanation}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-xl text-primary mb-1">
              Application Area:
            </h3>
            <p className="font-body text-sm text-foreground/90">
              {explanation.applicationArea}
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
