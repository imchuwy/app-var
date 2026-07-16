'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Instrument, VaRResult } from '@/lib/types';
import { cn } from '@/lib/utils';

type InstrumentDetailTableProps = {
  instruments: Instrument[];
  varResults: VaRResult | null;
  toggleInstrument: (id: string) => void;
  removeInstrument: (id: string) => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

export function InstrumentDetailTable({
  instruments,
  varResults,
  toggleInstrument,
  removeInstrument,
}: InstrumentDetailTableProps) {
  const portfolioValue = varResults?.portfolioValue || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instrument Details</CardTitle>
        <CardDescription>
          Detailed breakdown of each instrument in your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Position</TableHead>
                <TableHead className="text-right">Weighting</TableHead>
                <TableHead className="text-right">Component VaR</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instruments.length > 0 ? (
                instruments.map((inst, index) => {
                  const weighting =
                    portfolioValue > 0 ? (inst.position / portfolioValue) * 100 : 0;
                  
                  // This is a mock calculation for component VaR per instrument
                  const componentVaR = varResults?.componentVaR 
                    ? (varResults.componentVaR / (instruments.filter(i => i.included).length || 1)) * (Math.random() * 0.4 + 0.8)
                    : 0;

                  return (
                    <TableRow
                      key={inst.id}
                      className={cn(!inst.included && 'text-muted-foreground opacity-50')}
                    >
                      <TableCell>
                        <Checkbox
                          checked={inst.included}
                          onCheckedChange={() => toggleInstrument(inst.id)}
                          aria-label="Include instrument in calculation"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{inst.symbol}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(inst.position)}
                      </TableCell>
                      <TableCell className="text-right">
                        {inst.included ? formatPercentage(weighting) : '0.00%'}
                      </TableCell>
                      <TableCell className="text-right">
                        {inst.included ? formatCurrency(componentVaR) : formatCurrency(0)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeInstrument(inst.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No instruments added.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
