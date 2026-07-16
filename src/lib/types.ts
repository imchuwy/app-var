export type Instrument = {
  id: string;
  symbol: string;
  position: number;
  included: boolean;
};

export type VaRResult = {
  absoluteVaR: number;
  relativeVaR: number;
  varPercentageOfNAV: number;
  marginalVaR: number;
  componentVaR: number;
  conditionalVaR: number;
  portfolioValue: number;
  portfolioStdDev: number;
};
