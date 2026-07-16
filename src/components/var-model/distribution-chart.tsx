
'use client';

import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { VaRResult } from '@/lib/types';

// Standard normal cumulative distribution function (approximation)
function standardNormalCdf(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

// Function to generate points for a normal distribution curve
function generateNormalDistributionData(
  mean: number,
  stdDev: number,
  portfolioValue: number
) {
  if (stdDev === 0) return [];
  const data = [];
  const points = 201; // More points for a smoother curve
  const rangeInSigmas = 8; // e.g., from -4σ to +4σ
  const step = rangeInSigmas / (points - 1);

  for (let i = 0; i < points; i++) {
    const sigma = -rangeInSigmas / 2 + i * step;
    const x = sigma * stdDev; // P/L value
    const y =
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
    
    const percentile = standardNormalCdf(sigma) * 100;

    data.push({
      sigma: sigma,
      density: y,
      pl: x,
      portfolioValue: portfolioValue + x,
      percentile: percentile,
    });
  }
  return data;
}

interface DistributionChartProps {
  varResults: VaRResult | null;
}

export function DistributionChart({ varResults }: DistributionChartProps) {
  const chartData = useMemo(() => {
    if (!varResults || varResults.portfolioValue === 0) return [];
    return generateNormalDistributionData(
      0, // Assuming mean daily return is 0
      varResults.portfolioStdDev,
      varResults.portfolioValue
    );
  }, [varResults]);

  const chartConfig = {
    density: {
      label: 'Density',
      color: 'hsl(var(--accent))',
    },
  };

  if (!varResults || varResults.portfolioValue === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribution of Returns</CardTitle>
          <CardDescription>
            Add instruments to the portfolio to see the distribution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
            <p className="text-sm text-muted-foreground">Chart will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution of Returns</CardTitle>
        <CardDescription>
          Interactive normal distribution showing standard deviations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              type="number"
              dataKey="sigma"
              domain={[-4, 4]}
              tickFormatter={(value) => `${value.toFixed(1)}σ`}
              axisLine={false}
              tickLine={false}
              name="Standard Deviations (σ)"
              interval={0}
              ticks={[-4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
            />
            <YAxis
              tickFormatter={(value) => value.toFixed(4)}
              axisLine={false}
              tickLine={false}
              hide
            />
            <Tooltip
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => (
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="font-bold text-foreground">
                        {props.payload.sigma.toFixed(2)}σ from Mean
                      </div>
                      <div className="text-muted-foreground">
                        Confidence: {props.payload.percentile.toFixed(1)}%
                      </div>
                      <div className="text-muted-foreground">
                        P/L: ${props.payload.pl.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </div>
                       <div className="text-muted-foreground">
                        Portfolio Value: ${props.payload.portfolioValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  )}
                  label="Distribution"
                  hideIndicator
                  hideLabel
                />
              }
            />
            <defs>
              <linearGradient id="fillDensity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-density)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-density)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="density"
              type="natural"
              fill="url(#fillDensity)"
              stroke="var(--color-density)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
