// This file uses server-side code.
"use server";

/**
 * @fileOverview Explains a given numerical formula and identifies its likely area of application.
 *
 * - explainFormula - A function that explains a given numerical formula.
 * - ExplainFormulaInput - The input type for the explainFormula function.
 * - ExplainFormulaOutput - The return type for the explainFormula function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const ExplainFormulaInputSchema = z.object({
  formula: z.string().describe("The numerical formula to explain."),
});
export type ExplainFormulaInput = z.infer<typeof ExplainFormulaInputSchema>;

const ExplainFormulaOutputSchema = z.object({
  explanation: z.string().describe("The explanation of the formula."),
  applicationArea: z
    .string()
    .describe("The likely area of application for the formula."),
});
export type ExplainFormulaOutput = z.infer<typeof ExplainFormulaOutputSchema>;

export async function explainFormula(
  input: ExplainFormulaInput
): Promise<ExplainFormulaOutput> {
  return explainFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: "explainFormulaPrompt",
  input: { schema: ExplainFormulaInputSchema },
  output: { schema: ExplainFormulaOutputSchema },
  prompt: `You are an expert in explaining numerical formulas.

You will be given a formula and you will explain what the formula does and what field of study it applies to.

Formula: {{{formula}}}`,
});

const explainFormulaFlow = ai.defineFlow(
  {
    name: "explainFormulaFlow",
    inputSchema: ExplainFormulaInputSchema,
    outputSchema: ExplainFormulaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
