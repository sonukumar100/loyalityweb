// src/app/pages/your-page-path/Chat-columns.ts

import { type ColumnDef } from '@tanstack/react-table';
import { dateFormate } from 'utils/dateformate';
import { settingConfig } from 'utils/settingConfig';
import { Chat } from './types/chat-types';

export const getChatColumns = (
  setModalOpen: (open: boolean) => void, // Pass the function to handle closing modal
  setChatId: (id: number) => void, // Pass the function to handle setting Chat ID
  setUserName: (name: string) => void, // Pass the function to handle setting User Name
): ColumnDef<Chat>[] => [
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="flex flex-col gap-1">
        <span>Message Data</span>
      </div>
    ),
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return (
        <div className="text-xs text-muted-foreground">
          {dateFormate(createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: 'full_name',
    header: 'Name',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'mobile_number',
    header: 'Mobile',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
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
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center space-x-3">
          <button
            className="text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => {
              setModalOpen(true);
              setChatId(id);
              setUserName(row.original.full_name);
            }} // Open modal with the selected coupon
          >
            <img src="/images/send-message.svg" alt="send-message" />
          </button>
        </div>
      );
    },
  },
];
