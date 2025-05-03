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
import io from 'socket.io-client';
import { Button } from 'app/components/ui/button';
// import { socket } from 'utils/notificationsSocket';
export const ChatList = () => {
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
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('connected');
  //     console.log('Socket connected with ID up:', socket.id);
  //   });
  // }, []);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8001', {
      transports: ['websocket'],
      upgrade: true,
    });
    // const socket = io(, {
    //   autoConnect: false, // Optional: to control when it connects
    // });
    const userId = 42; // Static user ID
    const adminId = 1; // Static admin ID

    // Set up listeners first
    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket.id);

      // Join the room after socket is connected
      socket.emit('joinRoom', { userId });
    });

    // socket.on('roomJoined', msg => {
    // console.log(msg);

    // Send the first message after room is joined

    // });

    socket.onAny((event, ...args) => {
      console.log('Socket event:', event, args);
    });

    socket.on('previousMessages', msgs => {
      console.log('Previous messages:', msgs);
      setMessages(msgs);
    });

    socket.on('receiveMessage', msg => {
      console.log('Received message:', msg);
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    const msg = 'Hello from the client!';
    const adminId = 1; // Static admin ID
    const userId = 42; // Static user ID
    const socket = io('http://localhost:8001', {
      transports: ['websocket'],
      upgrade: true,
    });
    socket.emit('sendMessage', {
      senderId: userId,
      receiverId: adminId,
      message: 'Hello from the client! click',
      sendBy: 1,
    });
  };
  const sendMessageAdmin = () => {
    const msg = 'Hello from the client!';
    const adminId = 1; // Static admin ID
    const userId = 42; // Static user ID
    const socket = io('http://localhost:8001', {
      transports: ['websocket'],
      upgrade: true,
    });
    socket.emit('sendMessage', {
      senderId: userId,
      receiverId: adminId,
      message: 'Hello ADMIN!',
      sendBy: 2,
    });
  };

  console.log('messages', messages);

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
        <Button
          onClick={() => sendMessage()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </Button>
        <Button
          onClick={() => sendMessageAdmin()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          SendBy admin
        </Button>

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
