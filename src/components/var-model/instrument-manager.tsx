'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import type { Instrument } from '@/lib/types';

const formSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required.'),
  position: z.coerce.number().positive('Position must be a positive number.'),
});

type InstrumentManagerProps = {
  instruments: Instrument[];
  addInstrument: (instrument: Omit<Instrument, 'id' | 'included'>) => void;
  removeInstrument: (id: string) => void;
  availableSymbols: string[];
};

export function InstrumentManager({
  instruments,
  addInstrument,
  removeInstrument,
  availableSymbols,
}: InstrumentManagerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: '',
      position: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addInstrument(values);
    form.reset();
     form.setValue('symbol', '');
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrument Symbol</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a symbol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableSymbols.map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Add Instrument
          </Button>
        </form>
      </Form>
      <ScrollArea className="h-48 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Position</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instruments.length > 0 ? (
              instruments.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell className="font-medium">{inst.symbol}</TableCell>
                  <TableCell className="text-right">
                    ${inst.position.toLocaleString()}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No instruments added.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
