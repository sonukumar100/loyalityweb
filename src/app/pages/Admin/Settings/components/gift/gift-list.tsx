import { useEffect, useState } from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react'; // Import icons
import {
  CalendarIcon,
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
import { useOfferSlice } from 'app/pages/Offer/slice';
import { OfferTable } from 'app/pages/Offer/offer-table';
import { OfferTabs } from 'app/pages/Offer/offer-tabs';
import { GlobalPagination } from 'app/pages/global-pagination';
import { Switch } from 'app/components/ui/switch';
import { Label } from '@radix-ui/react-label';
import clsx from 'clsx';
import { dateFormate } from 'utils/dateformate';
import { useAdminSlice } from 'app/pages/Admin/slice';
import { settingConfig } from 'utils/settingConfig';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminEditGift } from 'app/pages/Admin/slice/selectors';

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

export const GiftList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useGetGiftGalleryLazyQuery, } = useAdminSlice();
  const dispatch = useDispatch();
  const [getGiftList, { data, isError, isSuccess }] = useGetGiftGalleryLazyQuery();
  // const [updategiftStatus] = ();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = useState('all');
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
      params.giftStatus = activeTab == 'active' ? 1 : 0;
    }

    getGiftList(params);
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
      payload.giftStatus = activeTab == 'active' ? 1 : 0;
    }
    getGiftList(payload);
  }, [activeTab]);


  const { actions: addTeamMember } = useAdminSlice();

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
      accessorKey: 'giftTitle',
      header: 'Title',
      cell: ({ getValue }) => {
        const giftTitle = getValue() as string;
        return <span>{giftTitle}</span>;
      },
    },

    // {
    //   accessorKey: 'giftType',
    //   header: 'Type',
    //   cell: ({ row }) => (
    //     <div
    //     >
    //       {settingConfig.getSetting('giftType', row?.original?.giftType) || '_'}
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'giftType',
      header: 'Gift Type',
      cell: ({ row }) => (
        <div

        >
          {settingConfig.getSetting('giftType', Number(row.original.giftType))
          }
        </div>
      ),
    },
    {
      accessorKey: 'url',
      header: 'Image',
      cell: ({ getValue }) => {
        const imageUrl = getValue() as string;
        return (
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt="Gift"
              className="h-16 w-16 object-cover rounded-full"
            />
          </a>
        );
      },
    },

    {
      accessorKey: 'points',
      header: 'Points',
      cell: ({ getValue }) => {
        const points = getValue() as string;
        return <span>{points}</span>;
      },
    },

    {
      accessorKey: 'specifications',
      header: 'Specification',
      cell: ({ getValue }) => {
        const specifications = getValue() as string;
        return <span>{specifications}</span>;
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const giftId = row.original.id;

        return (
          <div className="flex items-center space-x-3">
            {/* Edit button */}
            <button
              onClick={() => {
                dispatch(addTeamMember.setEditGift({ data: row.original }));
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            {/* Delete button */}
            <button
              onClick={() => {
                // handle delete logic here
                console.log('Delete gift', giftId);
              }}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>
        );
      },
    }
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
        {/* <OfferTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          activeCount={activeCount}
          inactiveCount={inactiveCount}
        />{' '} */}
        {/* <OfferFilters /> */}
        <GlobalPagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
          onRefresh={() => {
            getGiftList({ page: pagination.pageIndex + 1, limit: pagination.pageSize });
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
      {/* <div className="fixed bottom-4 right-4 z-50">
        <OfferForm />
      </div> */}
    </div>
  );
};
