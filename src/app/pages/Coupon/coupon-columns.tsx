import { format } from 'date-fns';
import { CalendarIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'app/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from 'app/components/ui/popover';
import { Calendar } from 'app/components/ui/calendar';
import { dateFormate } from 'utils/dateformate';
import { Dispatch } from 'redux';

export const getCouponColumns = ({
  dateFilter,
  setDateFilter,
  activeTab,
  deleteCouponById,
  dispatch,
  couponEdit,
}: {
  dateFilter?: Date;
  setDateFilter: (date?: Date) => void;
  activeTab: string;
  deleteCouponById: (id: number) => void;
  dispatch: Dispatch;
  couponEdit: any;
}): ColumnDef<any>[] => {
  return [
    {
      accessorKey: 'created_at',
      header: () => (
        <div className="flex flex-col gap-1">
          <span>Date / Created By</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-8 text-xs px-2 justify-start"
              >
                <CalendarIcon className="mr-1 h-3 w-3" />
                {dateFilter ? format(dateFilter, 'dd MMM yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground">
          {dateFormate(row.original.created_at)}
        </div>
      ),
    },
    {
      accessorKey: 'couponCode',
      header: 'Coupon Code',
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: 'productName',
      header: 'Product Name',
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    ...(activeTab === 'active'
      ? [
          {
            accessorKey: 'useDate',
            header: 'Use Date/Used By',
            cell: ({ row }) => (
              <div>
                {row.original.updatedAt
                  ? dateFormate(row.original.updatedAt)
                  : 'Not Used'}
                {row.original.user?.email
                  ? ` / ${row.original.user.email}`
                  : ''}
              </div>
            ),
          },
          {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => <div>{row.original.user?.email}</div>,
          },
          {
            accessorKey: 'points',
            header: 'Points',
            cell: ({ row }) => <div>{row.original.karigerPoints}</div>,
          },
          {
            accessorKey: 'state',
            header: 'State',
            cell: ({ row }) => <div>{row.original.user?.state}</div>,
          },
          {
            accessorKey: 'district',
            header: 'District',
            cell: ({ row }) => <div>{row.original.user?.city}</div>,
          },
          {
            accessorKey: 'viewLocation',
            header: 'View Location Map',
            cell: ({ row }) => <div>{row.original?.state}</div>,
          },
        ]
      : []),
    {
      accessorKey: 'remark',
      header: 'Remark',
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => dispatch(couponEdit.setEdit({ data: row.original }))}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteCouponById(row.original.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2Icon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];
};
