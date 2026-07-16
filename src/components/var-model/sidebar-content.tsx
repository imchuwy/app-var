'use client';

import {
  SidebarHeader,
  SidebarContent as SidebarScrollableContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { InstrumentManager } from './instrument-manager';
import type { Instrument } from '@/lib/types';

type SidebarContentProps = {
  // Simulation props
  simulationMethod: string;
  setSimulationMethod: (method: string) => void;

  // Instrument props
  instruments: Instrument[];
  addInstrument: (instrument: Omit<Instrument, 'id' | 'included'>) => void;
  removeInstrument: (id: string) => void;
  availableSymbols: string[];
};

export function SidebarContent(props: SidebarContentProps) {
  return (
    <>
      <SidebarHeader></SidebarHeader>
      <SidebarScrollableContent>
        <SidebarGroup>
          <SidebarGroupLabel>Simulation Settings</SidebarGroupLabel>
          <div className="space-y-4 p-2">
            <h4 className="font-medium">Calculation Method</h4>
            <RadioGroup
              value={props.simulationMethod}
              onValueChange={props.setSimulationMethod}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parametric" id="parametric" />
                <Label htmlFor="parametric">Parametric</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="historical" id="historical" />
                <Label htmlFor="historical">Historical</Label>
              </div>
            </RadioGroup>
          </div>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio</SidebarGroupLabel>
          <div className="p-2">
            <InstrumentManager
              instruments={props.instruments}
              addInstrument={props.addInstrument}
              removeInstrument={props.removeInstrument}
              availableSymbols={props.availableSymbols}
            />
          </div>
        </SidebarGroup>
      </SidebarScrollableContent>
    </>
  );
}
