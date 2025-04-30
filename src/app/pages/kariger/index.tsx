import { useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from 'app/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { Calendar } from 'app/components/ui/calendar';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import OfferForm from './offer-form';
import { useUserSlice } from './slice';
import { OfferTable } from './offer-table';
import { OfferTabs } from './offer-tabs';
import { GlobalPagination } from '../global-pagination';
import { Switch } from 'app/components/ui/switch';
import clsx from 'clsx';
import { dateFormate } from 'utils/dateformate';
import { toast } from 'app/components/ui/use-toast';
import { settingConfig } from 'utils/settingConfig';

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

export const UserList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useLazyGetUserListQuery } = useUserSlice();
  const [getUserList, { data, isError, isSuccess }] = useLazyGetUserListQuery();
  // const [updateOfferStatus, { isSuccess: isOfferSuccess }] =
  // useUpdateOfferStatus();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = useState('all');
  const allCount = data?.pagination?.total;
  const activeCount = data?.pagination?.totalActive;
  const inactiveCount = data?.pagination?.totalInactive;
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

    getUserList(params);
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
    getUserList(payload);
  }, [activeTab]);
  // useEffect(() => {
  //   if (isOfferSuccess) {
  //     toast({
  //       title: 'Success',
  //       description: 'Offer status updated successfully',
  //       variant: 'sucsess',
  //     });
  //   }
  // }, [isOfferSuccess]);
  const columns: ColumnDef<Offer>[] = [
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
        const createdBy = row.original.createdAt;
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
      accessorKey: 'full_name',
      header: 'Name',
      cell: ({ getValue }) => {
        const full_name = getValue() as string;
        return <span>{full_name}</span>;
      },
    },
    {
      accessorKey: 'mobile_number',
      header: 'Mobile',
      cell: ({ getValue }) => {
        const mobile_number = getValue() as string;
        return <span>{mobile_number}</span>;
      },
    },
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ getValue }) => {
        const stateId = getValue() as number;
        const state = settingConfig.stateList.find(s => s.id == stateId);
        return <span>{state?.label || 'Unknown State'}</span>;
      },
    },
    {
      accessorKey: 'city',
      header: 'District',
      cell: ({ row }) => {
        const stateId = row.original.state;
        const cityId = row.original.city;
        const state = settingConfig?.stateList.find(s => s.id == stateId);
        const city = state?.districts.find(d => d.id == cityId);
        return <span>{city?.label || 'Unknown District'}</span>;
      },
    },

    {
      accessorKey: 'total_scan_count',
      header: 'Total Scan Count',
      cell: ({ getValue }) => {
        const total_scan_count = getValue() as string;
        return <span>{total_scan_count}</span>;
      },
    },

    {
      accessorKey: 'total_scan_value',
      header: 'Total Scan Value',
      cell: ({ getValue }) => {
        const total_scan_value = getValue() as string;
        return <span>{total_scan_value}</span>;
      },
    },

    {
      accessorKey: 'last_scan_date',
      header: 'Last Scan Date',
      cell: ({ getValue }) => {
        const last_scan_date = getValue() as string;
        return <span>{last_scan_date}</span>;
      },
    },
    {
      accessorKey: 'karigerPoints',
      header: 'Wallet',
      cell: ({ getValue }) => {
        const karigerPoints = getValue() as string;
        return <span>{karigerPoints}</span>;
      },
    },
    {
      accessorKey: 'total_redeem_requests',
      header: 'Request',
      cell: ({ getValue }) => {
        const total_redeem_requests = getValue() as string;
        return <span>{total_redeem_requests}</span>;
      },
    },
  ];

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    // pageCount: Math.ceil((data?.pagination?.total ?? 0) / pagination.pageSize),
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
            getUserList({
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
