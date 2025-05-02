import { useEffect, useState } from 'react';
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
import { UserTabs } from './user-tabs';
import { GlobalPagination } from '../global-pagination';
import { getUserColumns } from './user-columns'; // adjust path as needed
import { UserVerifyModal } from './user-verify-modal';

export const UserList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const { useLazyGetUserListQuery } = useUserSlice();
  const [getUserList, { data, isError, isSuccess }] = useLazyGetUserListQuery();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = useState('all');
  const paginationData = data?.pagination;

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
      params.filter =
        activeTab == '1'
          ? 'pending'
          : activeTab === '2'
            ? 'verified'
            : activeTab === '3'
              ? 'rejected'
              : 'suspect';
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
      payload.filter =
        activeTab == '1'
          ? 'pending'
          : activeTab === '2'
            ? 'verified'
            : activeTab === '3'
              ? 'rejected'
              : 'suspect';
    }
    getUserList(payload);
  }, [activeTab]);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [userId, setUserId] = useState<number | null>(null); // State to store the user ID
  const [is_verified, setIsVerified] = useState<string | undefined>(undefined); // State to store the user ID
  // Use the getUserColumns function to set columns
  const columns = getUserColumns(
    dateFilter,
    setDateFilter,
    setModalOpen,
    setUserId,
    setIsVerified,
  );

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
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
        <UserTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          paginationData={paginationData}
        />
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
        {/* Modal */}
        {modalOpen && (
          <UserVerifyModal
            setModalOpen={setModalOpen}
            isOpen={modalOpen}
            userId={userId}
            is_verified={is_verified}
          />
        )}
      </div>
      <OfferTable
        table={table}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      {/* floating buttons */}
      <div className="fixed bottom-4 right-4 z-50">
        <OfferForm />
      </div>
    </div>
  );
};
