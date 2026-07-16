'use server';

/**
 * @fileOverview This file defines a Genkit flow to explain VaR results in plain English.
 *
 * - explainVaRResult - A function that takes VaR results as input and returns an explanation.
 * - ExplainVaRResultInput - The input type for the explainVaRResult function.
 * - ExplainVaRResultOutput - The return type for the explainVaRResult function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainVaRResultInputSchema = z.object({
  absoluteVaR: z.number().describe('The absolute VaR value.'),
  relativeVaR: z.number().describe('The relative VaR value.'),
  varPercentageOfNAV: z.number().describe('The VaR as a percentage of the portfolio NAV.'),
  marginalVaR: z.number().describe('The marginal VaR value.'),
  componentVaR: z.number().describe('The component VaR value.'),
  conditionalVaR: z.number().describe('The conditional VaR value.'),
  confidenceInterval: z.number().describe('The confidence interval used for VaR calculation (e.g., 0.95 for 95%).'),
});
export type ExplainVaRResultInput = z.infer<typeof ExplainVaRResultInputSchema>;

const ExplainVaRResultOutputSchema = z.object({
  explanation: z.string().describe('A plain English explanation of the VaR results.'),
});
export type ExplainVaRResultOutput = z.infer<typeof ExplainVaRResultOutputSchema>;

export async function explainVaRResult(input: ExplainVaRResultInput): Promise<ExplainVaRResultOutput> {
  return explainVaRResultFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainVaRResultPrompt',
  input: {schema: ExplainVaRResultInputSchema},
  output: {schema: ExplainVaRResultOutputSchema},
  prompt: `You are an expert in financial risk management. Your task is to explain the provided Value at Risk (VaR) results in plain English, so that a non-expert can understand the risk associated with their investment portfolio.

Here are the VaR results:

Absolute VaR: {{absoluteVaR}}
Relative VaR: {{relativeVaR}}
VaR % of NAV: {{varPercentageOfNAV}}
Marginal VaR: {{marginalVaR}}
Component VaR: {{componentVaR}}
Conditional VaR: {{conditionalVaR}}
Confidence Interval: {{confidenceInterval}}

Provide a concise and clear explanation of these results, highlighting the potential losses the portfolio could experience and the meaning of each VaR metric.  Avoid overly technical jargon.`,
});

const explainVaRResultFlow = ai.defineFlow(
  {
    name: 'explainVaRResultFlow',
    inputSchema: ExplainVaRResultInputSchema,
    outputSchema: ExplainVaRResultOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
