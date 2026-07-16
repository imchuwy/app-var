'use client';

import type { Instrument, VaRResult } from '@/lib/types';
import { VarResultsDisplay } from './var-results-display';
import { DistributionChart } from './distribution-chart';
import { InstrumentDetailTable } from './instrument-detail-table';

type MainDashboardProps = {
  varResults: VaRResult | null;
  isCalculating: boolean;
  instruments: Instrument[];
  toggleInstrument: (id: string) => void;
  removeInstrument: (id: string) => void;
};

export function MainDashboard({
  varResults,
  isCalculating,
  instruments,
  toggleInstrument,
  removeInstrument,
}: MainDashboardProps) {
  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <DistributionChart varResults={varResults} />
        </div>
        <div className="col-span-1">
          <VarResultsDisplay
            varResults={varResults}
            isCalculating={isCalculating}
          />
        </div>
        <div className="col-span-1">
          <InstrumentDetailTable
            instruments={instruments}
            varResults={varResults}
            toggleInstrument={toggleInstrument}
            removeInstrument={removeInstrument}
          />
        </div>
      </div>
    </main>
  );
}
