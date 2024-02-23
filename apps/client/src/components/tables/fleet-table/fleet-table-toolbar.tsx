import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
}

export function DataTableToolbar<TData>({
  table,
  isLoading,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
      <div className="flex w-full flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:space-x-2">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-5">
        {isLoading && <Loader2 size={32} className="animate-spin" />}
      </div>
    </div>
  );
}
