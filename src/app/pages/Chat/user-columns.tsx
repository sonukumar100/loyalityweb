// src/app/pages/your-page-path/user-columns.ts

import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from 'app/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { Calendar } from 'app/components/ui/calendar';
import { dateFormate } from 'utils/dateformate';
import { settingConfig } from 'utils/settingConfig';
import { User } from './types/user-types';
import { getStatusColorName, getStatusTextColorName } from 'utils/statusColor';

export const getUserColumns = (
  dateFilter: Date | undefined,
  setDateFilter: (date: Date | undefined) => void,
  setModalOpen: (open: boolean) => void, // Pass the function to handle closing modal
  setUserId: (id: number) => void, // Pass the function to handle setting user ID
  setIsVerified: (isVerified: string) => void, // Pass the function to handle setting isVerified
): ColumnDef<User>[] => [
  {
    accessorKey: 'createdAt',
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
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <div className="text-xs text-muted-foreground">
          {dateFormate(createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: 'full_name',
    header: 'Name',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'mobile_number',
    header: 'Mobile',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ getValue }) => {
      const stateId = getValue() as number;
      const state = settingConfig.stateList.find(s => s.id === stateId);
      return <span>{state?.label || 'Unknown State'}</span>;
    },
  },
  {
    accessorKey: 'city',
    header: 'District',
    cell: ({ row }) => {
      const stateId = row.original.state;
      const cityId = row.original.city;
      const state = settingConfig?.stateList.find(s => s.id === stateId);
      const city = state?.districts.find(d => d.id === cityId);
      return <span>{city?.label || 'Unknown District'}</span>;
    },
  },
  {
    accessorKey: 'total_scan_count',
    header: 'Total Scan Count',
    cell: ({ getValue }) => <span>{getValue() as number}</span>,
  },
  {
    accessorKey: 'total_scan_value',
    header: 'Total Scan Value',
    cell: ({ getValue }) => <span>{getValue() as number}</span>,
  },
  {
    accessorKey: 'last_scan_date',
    header: 'Last Scan Date',
    cell: ({ getValue }) => <span>{dateFormate(getValue() as string)}</span>,
  },
  {
    accessorKey: 'karigerPoints',
    header: 'Wallet',
    cell: ({ getValue }) => <span>{getValue() as number}</span>,
  },
  {
    accessorKey: 'total_redeem_requests',
    header: 'Request',
    cell: ({ getValue }) => <span>{getValue() as number}</span>,
  },
  {
    accessorKey: 'is_verified',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue() as string; // ensures number

      return (
        <span
          className="px-2 py-1 rounded-lg "
          style={{
            backgroundColor: getStatusColorName(value),
            color: getStatusTextColorName(value),
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center space-x-3">
          <button
            className="text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => {
              // openModal(row.original);
              setModalOpen(true);
              setUserId(id);
              setIsVerified(row.original.is_verified);
            }} // Open modal with the selected coupon
          >
            Update Status
          </button>
        </div>
      );
    },
  },
];
