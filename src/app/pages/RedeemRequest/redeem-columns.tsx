import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from 'app/components/ui/button';
import { Calendar } from 'app/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { dateFormate } from 'utils/dateformate';
import { Coupon } from './types/coupon-types';
import { settingConfig } from 'utils/settingConfig';
interface GetColumnsParams {
  activeTab: string;
  dateFilter: Date | undefined;
  setDateFilter: (date: Date | undefined) => void;
}

export const getCouponColumns = ({
  activeTab,
  dateFilter,
  setDateFilter,
}: GetColumnsParams): ColumnDef<Coupon>[] => {
  return [
    {
      accessorKey: 'created_at',
      header: () => (
        <div className="flex flex-col gap-1">
          <span>Date</span>
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
      cell: ({ row }) => {
        const created_at = row.original.created_at;
        return (
          <div>
            <div className="text-xs text-muted-foreground">
              {dateFormate(created_at)}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Name',
      accessorKey: 'user', // this gives access to the full user object
      cell: ({ getValue }) => {
        const user = getValue() as { fullName?: string; email?: string };
        return <span>{user?.email || user?.fullName || 'N/A'}</span>;
      },
    },
    {
      accessorKey: 'request_id',
      header: 'Req ID',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },

    {
      accessorKey: 'mobile_number',
      header: 'Mobile Number',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    {
      accessorKey: 'account_status',
      header: 'A/c status',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    {
      accessorKey: 'giftType',
      header: 'Type',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value === '1' ? 'Cash' : 'Gift'}</span>;
      },
    },
    {
      accessorKey: 'gift_name',
      header: 'Product Name',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    // {
    //     accessorKey: 'gift',
    //     header: 'Gift',
    //     cell: ({ getValue }) => {
    //         const value = getValue() as string | undefined
    //         return <span>{value || '_'}</span>;
    //     },
    // },
    {
      accessorKey: 'offer',
      header: 'offer-Valid Upto',
      cell: ({ getValue }) => {
        const offer = getValue() as { end_date?: string };
        return <span>{dateFormate(offer?.end_date) || '_'}</span>;
      },
    },
    {
      accessorKey: 'points',
      header: 'Points Req',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    {
      accessorKey: 'points_req_type',
      header: 'Points Req  Type',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    {
      accessorKey: 'points_transfer',
      header: 'Points Transfer Mobile No.',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },

    {
      accessorKey: 'redeem_req_status',
      header: 'Redeem Status',
      cell: ({ getValue }) => {
        const value = getValue(); // ensures number

        return (
          <span>
            {value === '0'
              ? 'Pening'
              : value === '1'
              ? 'Approved'
              : value === '2'
              ? 'Rejected'
              : '_'}
          </span>
        );
      },
    },
    {
      accessorKey: 'gift_points_status',
      header: 'Gift Points Status',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return <span>{value || '_'}</span>;
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex items-center space-x-3">
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => console.log('Delete gift', id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];
};
