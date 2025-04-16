import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/components/ui/table';

type Coupon = {
  id: number;
  date: Date;
  createdBy: string;
  type: string;
  title: string;
  CouponCode: string;
  startDate: Date;
  endDate: Date;
  gift: number;
  status: 'active' | 'inactive';
};

type CouponTableProps = {
  table: ReturnType<typeof useReactTable>;
  columns: ColumnDef<Coupon>[];
  dateFilter: Date | undefined;
  setDateFilter: (val: Date | undefined) => void;
};

export const CouponTable = ({
  table,
  columns,
  ...filters
}: CouponTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
