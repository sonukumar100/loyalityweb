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
  UploadCloud,
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
import { getCouponColumns } from './coupon-columns';

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
  };
};

// Sample data

export const CouponList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const {
    useLazyGetCouponListQuery,
    useDeleteCouponById,
    useLazyDownloadExcelQuery,
  } = useCouponSlice();
  const [getCouponList, { data: couponList, isError, isSuccess }] =
    useLazyGetCouponListQuery();
  const [downloadExcel] = useLazyDownloadExcelQuery();
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
      params.filter =
        activeTab == 'active'
          ? 'scanned'
          : activeTab == 'group'
            ? 'group'
            : 'available';
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
      payload.filter =
        activeTab == 'active'
          ? 'scanned'
          : activeTab == 'group'
            ? 'group'
            : 'available';
    }
    getCouponList(payload);
  }, [activeTab]);
  const table = useReactTable({
    data: couponList?.data ?? [],
    columns: getCouponColumns({
      dateFilter,
      setDateFilter,
      activeTab,
      deleteCouponById,
      dispatch,
      couponEdit,
    }),
    pageCount: Math.ceil(
      (couponList?.pagination?.total ?? 0) / pagination.pageSize,
    ),
    manualPagination: true, // <-- important
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const [open, setOpen] = useState(false);
  const downloadCsv = () => {
    let payload: any = {};
    downloadExcel(payload);
  };
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
        <Button
          onClick={() => setOpen(true)}
          className="mt-6 left-[429px] top-[-7px] relative rounded-[10px] px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 p-[11px_15px]"
        >
          Generate Coupon
        </Button>
        <Button onClick={() => downloadCsv()}>DownLoad Coupon</Button>
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
        // columns={columns}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />{' '}
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        <CouponForm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};
