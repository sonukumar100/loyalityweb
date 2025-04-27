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
import StatusUpdateModal from './redeem-status-modal'; // Import the modal component

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
  const Pending = RedeemList?.pagination?.pending;
  const Reject = RedeemList?.pagination?.rejected;
  const Approved = RedeemList?.pagination?.approved;
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
      params.status =
        activeTab == 'pending' ? '0' : activeTab == 'approved' ? '1' : '2';
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
      payload.status =
        activeTab == 'pending' ? '0' : activeTab == 'approved' ? '1' : '2';
    }
    getRedeemList(payload);
  }, [activeTab]);
  const [open, setOpen] = useState(false);
  const [redeemData, setRedeemData] = useState<Coupon>();
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const openModal = (coupon: Coupon) => {
    console.log('coupon=================', coupon);
    // setModalOpen(false); // Open the modal
    setRedeemData(coupon); // Set the coupon data
    console.log('call modal');
  };
  const table = useReactTable({
    data: RedeemList?.data ?? [],
    columns: getCouponColumns({
      activeTab,
      dateFilter,
      setDateFilter,
      openModal,
      setModalOpen,
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

  // Connect to the server (use your backend URL if not running locally)

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <RedeemTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          Pending={Pending}
          Reject={Reject}
          Approved={Approved}
        />{' '}
        {/* <CouponFilters /> */}
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
      {/* {modalOpen && ( */}
      <StatusUpdateModal
        coupon={redeemData}
        open={modalOpen}
        setModalOpen={setModalOpen} // Function to close the modal
        openModal={openModal} // Function to close the modal
      />
      {/* )} */}
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* <CouponForm open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  );
};
