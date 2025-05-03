import { useEffect, useState } from 'react';

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Download,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { Calendar } from 'app/components/ui/calendar';
import { Badge } from 'app/components/ui/badge';
// import { cn } from "@/lib/utils"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/components/ui/table';
import OfferForm from './offer-form';
import { useOfferSlice } from './slice';
import { OfferTable } from './offer-table';
import { OfferTabs } from './offer-tabs';
import { GlobalPagination } from '../global-pagination';
import { Switch } from 'app/components/ui/switch';
import { Label } from '@radix-ui/react-label';
import clsx from 'clsx';
import { dateFormate } from 'utils/dateformate';
import { toast } from 'app/components/ui/use-toast';
import { socket } from 'utils/notificationsSocket';
import { io } from 'socket.io-client';

// Define the data type for our offers
type Offer = {
  id: number;
  date: Date;
  createdBy: string;
  type: string;
  title: string;
  offerCode: string;
  startDate: Date;
  endDate: Date;
  gift: number;
  status: 'active' | 'inactive';
};

// Sample data

export const OfferList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useLazyGetOfferQuery, useUpdateOfferStatus } = useOfferSlice();
  const [getOffer, { data, isError, isSuccess }] = useLazyGetOfferQuery();
  const [updateOfferStatus, { isSuccess: isOfferSuccess }] =
    useUpdateOfferStatus();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [activeTab, setActiveTab] = useState('all');
  const allCount = data?.pagination.total;
  const activeCount = data?.pagination.totalActive;
  const inactiveCount = data?.pagination.totalInactive;
  const [lastFetched, setLastFetched] = useState({
    pageIndex: -1,
    pageSize: -1,
  });

  useEffect(() => {
    if (
      pagination.pageIndex === lastFetched.pageIndex &&
      pagination.pageSize === lastFetched.pageSize &&
      lastFetched.pageIndex !== -1
    ) {
      return;
    }

    const params: any = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    };

    if (activeTab !== 'all') {
      params.offerStatus = activeTab == 'active' ? 1 : 0;
    }

    getOffer(params);
    setLastFetched({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  }, [pagination.pageIndex, pagination.pageSize, activeTab]);

  useEffect(() => {
    let payload: any = {
      page: 1,
      limit: 10,
    };
    if (activeTab !== 'all') {
      payload.offerStatus = activeTab == 'active' ? 1 : 0;
    }
    getOffer(payload);
  }, [activeTab]);
  useEffect(() => {
    if (isOfferSuccess) {
      toast({
        title: 'Success',
        description: 'Offer status updated successfully',
        variant: 'sucsess',
      });
    }
  }, [isOfferSuccess]);
  const columns: ColumnDef<Offer>[] = [
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
      cell: ({ row }) => {
        const createdBy = row.original.created_at;
        return (
          <div>
            <div className="text-xs text-muted-foreground">
              {dateFormate(createdBy)}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: 'offer_code',
      header: 'Offer Code',
      cell: ({ getValue }) => {
        const offer_code = getValue() as string;
        return <span>{offer_code}</span>;
      },
    },
    {
      accessorKey: 'user_type',
      header: 'Type',
      cell: ({ getValue }) => {
        const user_type = getValue() as string;
        return <span>{user_type}</span>;
      },
    },
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: ({ getValue }) => {
        const start_date = getValue() as string;
        return <span>{dateFormate(start_date)}</span>;
      },
    },
    {
      accessorKey: 'end_date',
      header: 'End Date',
      cell: ({ getValue }) => {
        const end_date = getValue() as string;
        return <span>{dateFormate(end_date)}</span>;
      },
    },

    {
      accessorKey: 'gifts',
      header: 'Gift',
      cell: ({ getValue }) => {
        const gifts = getValue() as Array<string>;
        return <span>{gifts?.length}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const offerStatus = row.original.offerStatus; // boolean value
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              onCheckedChange={checked => {
                updateOfferStatus({
                  offer_id: row.original.id,
                  offerStatus: checked ? 1 : 0,
                });
              }}
              checked={offerStatus}
              className={clsx(
                'transition-colors',
                offerStatus ? 'bg-green-500' : 'bg-gray-300',
              )}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: Math.ceil((data?.pagination?.total ?? 0) / pagination.pageSize),
    manualPagination: true, // <-- important
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <OfferTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          activeCount={activeCount}
          inactiveCount={inactiveCount}
        />{' '}
        {/* <OfferFilters /> */}
        <GlobalPagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
          onRefresh={() => {
            getOffer({
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            });
          }}
        />
      </div>
      <OfferTable
        table={table}
        columns={columns}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />{' '}
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        <OfferForm />
      </div>
    </div>
  );
};
