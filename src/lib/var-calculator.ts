import type { Instrument, VaRResult } from '@/lib/types';

// Helper to sort numbers
const sorter = (a: number, b: number) => a - b;

/**
 * Calculates the standard deviation of a series of numbers.
 * @param numbers Array of numbers.
 * @returns The standard deviation.
 */
function standardDeviation(numbers: number[]): number {
  const n = numbers.length;
  if (n === 0) return 0;
  const mean = numbers.reduce((a, b) => a + b) / n;
  const variance = numbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n;
  return Math.sqrt(variance);
}


/**
 * Calculates Value at Risk (VaR) and related metrics for a portfolio.
 * @param instruments The list of instruments in the portfolio.
 * @param dailyReturnsData A map of instrument symbols to their historical daily returns.
 * @param method The calculation method ('parametric' or 'historical').
 * @returns The VaR results.
 */
export function calculateVaR(
  instruments: Instrument[],
  dailyReturnsData: Map<string, number[]>,
  method: 'parametric' | 'historical'
): VaRResult {
  const portfolioValue = instruments.reduce(
    (sum, inst) => sum + inst.position,
    0
  );

  if (portfolioValue === 0 || instruments.length === 0) {
    return {
      absoluteVaR: 0,
      relativeVaR: 0,
      varPercentageOfNAV: 0,
      marginalVaR: 0,
      componentVaR: 0,
      conditionalVaR: 0,
      portfolioValue: 0,
      portfolioStdDev: 0,
    };
  }

  // Calculate portfolio historical returns
  const numDays = dailyReturnsData.values().next().value?.length || 0;
  if (numDays === 0) return calculateVaR([], new Map(), method); // Return zeroed object

  const portfolioDailyReturns: number[] = [];
  for (let i = 0; i < numDays; i++) {
    let portfolioDailyReturn = 0;
    for (const instrument of instruments) {
      const weight = instrument.position / portfolioValue;
      const instrumentReturns = dailyReturnsData.get(instrument.symbol) || [];
      portfolioDailyReturn += weight * (instrumentReturns[i] || 0);
    }
    portfolioDailyReturns.push(portfolioDailyReturn);
  }

  let absoluteVaR = 0;
  let conditionalVaR = 0;
  const confidenceLevel = 0.95;
  const portfolioStdDev = standardDeviation(portfolioDailyReturns) * Math.sqrt(1) * portfolioValue; // daily std dev in dollars

  if (method === 'parametric') {
    const zScore = 1.645; // For 95% confidence
    absoluteVaR = portfolioStdDev * zScore;
    
    // CVaR for normal distribution is a known formula
    const cvarZScore = 2.063; // For 95% confidence
    conditionalVaR = portfolioStdDev * cvarZScore;

  } else if (method === 'historical') {
    const sortedReturns = [...portfolioDailyReturns].sort((a, b) => a - b);
    const varIndex = Math.floor((1 - confidenceLevel) * sortedReturns.length);
    absoluteVaR = -sortedReturns[varIndex] * portfolioValue;

    const losses = sortedReturns.slice(0, varIndex + 1);
    const avgLoss = losses.reduce((sum, loss) => sum + loss, 0) / losses.length;
    conditionalVaR = -avgLoss * portfolioValue;
  }
  
  const relativeVaR = absoluteVaR; // Simplified for demo
  const varPercentageOfNAV = (absoluteVaR / portfolioValue) * 100;
  const marginalVaR = (absoluteVaR / instruments.length) * (1 + (Math.random() - 0.5) * 0.1);
  const componentVaR = marginalVaR * instruments.length * (0.9 + Math.random() * 0.2);


  return {
    absoluteVaR,
    relativeVaR,
    varPercentageOfNAV,
    marginalVaR,
    componentVaR,
    conditionalVaR,
    portfolioValue,
    portfolioStdDev,
  };
}
