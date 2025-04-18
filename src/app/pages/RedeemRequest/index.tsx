import { useEffect, useState } from 'react';
import { Button } from 'app/components/ui/button';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { RedeemTable } from './redeem-table';
import { RedeemTabs } from './redeem-tabs';
import { GlobalPagination } from '../global-pagination';
import { useRedeemSlice } from './slice';
import { getCouponColumns } from './redeem-columns';

// Sample data

export const RedeemList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useLazyRedeemRequestQuery } = useRedeemSlice();
  const [getRedeemList, { data: RedeemList }] = useLazyRedeemRequestQuery();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = useState('all');
  const allCount = RedeemList?.pagination?.total;
  const totalScanned = RedeemList?.pagination?.totalScanned;
  const totalAvailable = RedeemList?.pagination?.totalAvailable;
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

    getRedeemList(params);
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
    getRedeemList(payload);
  }, [activeTab]);

  const table = useReactTable({
    data: RedeemList?.data ?? [],
    columns: getCouponColumns({
      activeTab,
      dateFilter,
      setDateFilter,
    }),
    pageCount: Math.ceil(
      (RedeemList?.pagination?.total ?? 0) / pagination.pageSize,
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

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <RedeemTabs
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
        <GlobalPagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
          onRefresh={() => {
            getRedeemList({
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            });
          }}
        />
      </div>
      <RedeemTable
        table={table}
        // columns={columns}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />{' '}
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* <CouponForm open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  );
};
