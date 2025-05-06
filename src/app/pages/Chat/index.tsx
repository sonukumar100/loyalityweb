import { useEffect, useState } from 'react';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useChatSlice } from './slice';
import { ChatTable } from './chat-table';
import { UserTabs } from './chat-tabs';
import { GlobalPagination } from '../global-pagination';
import { getChatColumns } from './chat-columns'; // adjust path as needed
import { ChatModal } from './chat-modal';
export const ChatList = () => {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [userName, setUserName] = useState('');
  const { useLazyGetFeedBackUniqueQuery } = useChatSlice();
  const [getfeedList, { data, isError, isSuccess }] =
    useLazyGetFeedBackUniqueQuery();
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

    getfeedList(params);
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
    getfeedList(payload);
  }, [activeTab]);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [userId, setUserId] = useState<number | null>(null); // State to store the user ID
  // Use the getChatColumns function to set columns
  const columns = getChatColumns(setModalOpen, setUserId, setUserName);

  const table = useReactTable({
    data: data?.data ?? [],
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
            getfeedList({
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            });
          }}
        />
        {/* Modal */}
        {modalOpen && (
          <ChatModal
            setModalOpen={setModalOpen}
            isOpen={modalOpen}
            userId={userId}
            userName={userName}
          />
        )}
      </div>
      <ChatTable
        table={table}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
    </div>
  );
};
