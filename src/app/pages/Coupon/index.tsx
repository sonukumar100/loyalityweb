import { useEffect, useState } from 'react';

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Download,
  PencilIcon,
  Plus,
  RefreshCw,
  Search,
  Trash2Icon,
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
import CouponForm from './coupon-form';
import { useCouponSlice } from 'app/pages/Coupon/slice';
import { CouponTable } from './coupon-table';
import { CouponTabs } from './coupon-tabs';
import { GlobalPagination } from '../global-pagination';
import { Switch } from 'app/components/ui/switch';
import { Label } from '@radix-ui/react-label';
import clsx from 'clsx';
import { dateFormate } from 'utils/dateformate';
import { useDispatch } from 'react-redux';
import { selectCouponEdit as couponEdit } from './slice/selectors';
import { useAgentSlice } from '../Admin/AgentsContact/agentSlice';


// Define the data type for our Coupons
type Coupon = {
  id: number;
  date: Date;
  createdBy: string;
  type: string;
  title: string;
  CouponCode: string;
  created_at: Date;
  updatedAt: Date;
  productName: string;
  remark: string;
  user: {
    email: string;
  }

};

// Sample data

export const CouponList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useLazyGetCouponListQuery, useDeleteCouponById } = useCouponSlice();
  const [getCouponList, { data: couponList, isError, isSuccess }] = useLazyGetCouponListQuery();
  const { actions: couponEdit } = useCouponSlice();

  const dispatch = useDispatch();
  const [deleteCouponById] = useDeleteCouponById();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = useState('all');
  const allCount = couponList?.pagination?.total;
  const totalScanned = couponList?.pagination?.totalScanned;
  const totalAvailable = couponList?.pagination?.totalAvailable;
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
    console.log('activeTab', activeTab);
    if (activeTab !== 'all') {
      params.filter = activeTab == 'active' ? 'scanned' : activeTab == 'group' ? 'group' : 'available';
    }

    getCouponList(params);
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
      payload.filter = activeTab == 'active' ? 'scanned' : activeTab == 'group' ? 'group' : 'available';
    }
    getCouponList(payload);
  }, [activeTab]);

  console.log('data=========>', activeTab);




  const columns: ColumnDef<Coupon>[] = [
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
    ...(true
      ? [{
        accessorKey: 'couponCode',
        header: 'Coupon Code',
        cell: ({ getValue }) => {
          const couponCode = getValue() as string;
          return <span>{couponCode}</span>;
        },
      }]
      : []),

    {
      accessorKey: 'productName',
      header: 'Product Name',
      cell: ({ getValue }) => {
        const productName = getValue() as string;
        return <span>{productName}</span>;
      },
    },
    ...(true
      ?
      [
        {
          accessorKey: 'couponCode',
          header: 'Coupon Code',
          cell: ({ getValue }) => {
            const couponCode = getValue() as string;
            return <span>{couponCode}</span>;
          }
        },

      ] : []),
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'useDate',
          header: 'Use Date/Used By',
          cell: ({ row }) => (
            <div>
              {row.original?.updatedAt ? dateFormate(row.original.updatedAt) : 'Not Used'}
              {row.original?.user?.email ? ` / ${row.original.user.email}` : ''}
            </div>
          ),
        }]
        : []
    ),
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'email',
          header: 'Email',
          cell: ({ row }) => (
            <div>
              {row.original?.user?.email}
            </div>
          ),
        }]
        : []
    ),
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'points',
          header: 'Points',
          cell: ({ row }) => (
            <div>
              {row.original?.karigerPoints}
            </div>
          ),
        }]
        : []
    ),
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'state',
          header: 'state',
          cell: ({ row }) => (
            <div>
              {row.original?.user?.state}
            </div>
          ),
        }]
        : []
    ),
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'district',
          header: 'District',
          cell: ({ row }) => (
            <div>
              {row.original?.user?.city}
            </div>
          ),
        }]
        : []
    ),
    {
      accessorKey: 'remark',
      header: 'Remark',
      cell: ({ getValue }) => {
        const remark = getValue() as string;
        return <span>{remark}</span>;
      },
    },
    ...(
      activeTab === 'active'
        ? [{
          accessorKey: 'viewLocation',
          header: 'View Location Map',
          cell: ({ row }) => (
            <div>
              {row.original?.state}
            </div>
          ),
        }]
        : []
    ),




    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex items-center space-x-3">
            {/* Edit button */}
            <button
              onClick={() => { dispatch(couponEdit.setEdit({ data: row?.original })) }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            {/* Delete button */}
            <button
              onClick={() => {
                // handle delete logic here
                deleteCouponById(id);
                console.log('Delete gift', id);
              }}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div >
        );
      },
    }
  ];

  const table = useReactTable({
    data: couponList?.data ?? [],
    columns,
    pageCount: Math.ceil((couponList?.pagination?.total ?? 0) / pagination.pageSize),
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
        <CouponTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          totalScanned={totalScanned}
          totalAvailable={totalAvailable}
        />{' '}
        {/* <CouponFilters /> */}
        <GlobalPagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
          onRefresh={() => {
            getCouponList({
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            });
          }}
        />
      </div>
      <CouponTable
        table={table}
        columns={columns}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />{' '}
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        <CouponForm />
      </div>
    </div>
  );
};
