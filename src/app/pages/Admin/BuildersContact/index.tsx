/**
 *
 * AgentsContact
 *
 */
import { Button } from 'app/components/ui/button';
import React, { memo } from 'react';
import BuildersTable from './components/builder-table';
import { ContactNavigationTabs } from '../components/contact-tabs';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Checkbox } from 'app/components/ui/checkbox';
import { Pencil, Trash2 } from 'lucide-react';
import { imageUrl, settingConfig } from 'utils/settingConfig';
import { getFirstLettersOfEachWord } from 'utils/getFirstWordOflatter';
import { dateForMateWithTime } from 'utils/dateformate';
import { useToast } from 'app/components/ui/use-toast';
import { useBuilderSlice } from './buildersSlice';
import useDebounce from 'utils/hooks/debounce-hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { formatAmount, formatToUSD } from 'utils/formatAmount';

interface Props { }

export const BuildersContact = memo((props: Props) => {
  const { toast } = useToast();
  const user = useSelector(selectUser);

  const { useBuildersListQuery, useDeleteBuilderMutation } = useBuilderSlice();
  const [search, setSearch] = React.useState('');
  const [pagination, setPagination] = React.useState<any>({
    pageIndex: 0,
    pageSize: 2,
  });

  const [sort, setSort] = React.useState<string>('');
  const [order, setOrder] = React.useState(false);

  const searchDebounce = useDebounce(search, 300);
  let payload = {
    search: searchDebounce,
    page: pagination.pageIndex + 1,
    sort: sort,
    order: order ? 'asc' : 'desc',
  };

  const [
    buildersList,
    {
      isLoading: isBuilderList,
      isSuccess: isBuilderListSuccess,
      data: isBuilderListData,
      error: isBuilderListError,
    },
  ] = useBuildersListQuery();
  const dispatch = useDispatch();

  const builderColumns: ColumnDef<any>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex">
          <Checkbox
            className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <div className="ml-5">Builder Representative</div>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem] "
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />

          <div
            onClick={() => editBuilder(row?.original)}
            className="ml-5 cursor-pointer"
          >
            <div className="capitalize flex items-center">
              <img
                src={
                  row?.original?.avatar
                    ? imageUrl + row?.original?.avatar
                    : '/images/Avatar.svg'
                }
                alt=""
                className="flex-none w-14 h-14 rounded-full object-cover"
              />
              <div className="flex items-center ml-5">
                <div className="mt-0.5 font-medium text-[#101828]">
                  {row.original.name || '_'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),

      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'builder',
      header: 'Builder',
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className="capitalize  cursor-pointer"
        >
          {row?.original?.builderCompany || '_'}
        </div>
      ),
    },
    {
      accessorKey: 'campagin',
      header: ({ column }) => {
        return <div>Campaign</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className="cursor-pointer"
        >
          {row?.original?.campaign?.[0]?.title || '_'}
        </div>
      ),
    },

    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <div>Status</div>;
      },
      cell: ({ row }) =>
        row?.original?.assignedLoanOfficer?.length > 0 ? (
          <div
            onClick={() => editBuilder(row?.original)}
            className="bg-green-200 text-green-800 cursor-pointer rounded-full px-4 py-1 text-12 w-fit font-medium flex items-center"
          >
            <span className="mr-2">
              <div className="bg-green-800 rounded-full w-[.8rem] h-[.8rem]"></div>
            </span>
            {row?.original?.assignedLoanOfficer?.length > 0 && 'Assigned'}
          </div>
        ) : (
          <div
            onClick={() => editBuilder(row?.original)}
            className="bg-gray-200 text-gray-800 cursor-pointer rounded-full px-4 py-1 text-12 w-fit font-medium flex items-center"
          >
            <span className="mr-2">
              <div className="bg-gray-800 rounded-full w-[.8rem] h-[.8rem]"></div>
            </span>
            {row?.original?.assignedLoanOfficer?.length === 0 && 'Unassigned'}
          </div>
        ),
    },
    {
      accessorKey: 'AssignOfficer',
      header: ({ column }) => {
        return <div>Assigned Loan Officer</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className="text-[#101828] cursor-pointer font-medium "
        >
          <div className="flex items-center">
            {' '}
            {row?.original?.assignedLoanOfficer?.[0]?.avatar ? (
              <img
                className="rounded-full mr-2 w-[3rem] h-[3rem]"
                src={imageUrl + row?.original?.assignedLoanOfficer?.[0]?.avatar}
              />
            ) : row?.original?.assignedLoanOfficer?.[0]?.fullName ? (
              <div className="text-base font-medium bg-[#EAECF0] p-[.8rem] py-4 mr-3  uppercase rounded-full text-[#475467]">
                {getFirstLettersOfEachWord(
                  row?.original?.assignedLoanOfficer?.[0]?.fullName,
                )}
              </div>
            ) : (
              ''
            )}
            <div>
              {' '}
              <span className="text-center text-base">
                {row?.original?.assignedLoanOfficer?.[0]?.fullName || '_'}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'annualVolume',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setSort('annualVolume');
            setOrder(!order);
          }}
        >
          Annual Volume
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      ),
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className="capitalize cursor-pointer"
        >
          {/* {row?.original?.annualVolume && '$'} */}
          {row?.original?.annualVolume
            ? formatToUSD(row?.original?.annualVolume)
            : '_'}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <div>Date Created</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className=" max-w-[8.4rem] text-base leading-8 cursor-pointer"
        >
          {dateForMateWithTime(row.getValue('createdAt')) || '_'}
        </div>
      ),
    },
    {
      accessorKey: 'LastResponse',
      header: ({ column }) => {
        return <div>Last Response</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => editBuilder(row?.original)}
          className=" max-w-[6.4rem]  text-base leading-8 cursor-pointer"
        >
          {row.getValue('LastResponse') || '_'}
        </div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div
            onClick={() =>
              !isBuilderDelete ? builderDeleteById(row.original._id) : null
            }
            className="cursor-pointer"
          >
            <Trash2 className="h-8 w-8" />
          </div>
        );
      },
    },
  ];

  const { actions: builderActions } = useBuilderSlice();

  const editBuilder = value => {
    dispatch(builderActions.setEditBuilder({ data: value }));
    // console.log(value);
  };

  const buildersData = isBuilderListData?.data?.documents;

  React.useEffect(() => {
    buildersList(payload);
  }, [pagination, search, order]);

  const [
    builderDelete,
    {
      isLoading: isBuilderDelete,
      isSuccess: isBuilderDeleteSuccess,
      data: isBuilderDeleteData,
      error: isBuilderDeleteError,
    },
  ] = useDeleteBuilderMutation();

  const builderDeleteById = (id: any) => {
    if (user?.role === 'admin' || 'admin') {
      builderDelete(id);
    } else {
      toast({
        description: 'You cannot delete this record',
        variant: 'destructive',
      });
    }
  };

  React.useEffect(() => {
    if (isBuilderDeleteSuccess) {
      buildersList(payload);
      toast({
        description: 'Builder deleted successfully',
      });
    }
  }, [isBuilderDelete]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const resumesPagination = {
    totalPages: 3,
    pageSize: 10,
  };

  const buildersTable = useReactTable({
    data: buildersData ?? [],
    columns: builderColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    manualPagination: true,
    pageCount: resumesPagination?.totalPages,
    rowCount: resumesPagination?.pageSize,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  console.log(buildersData);

  return (
    <div className="">
      <div className="container">
        <ContactNavigationTabs />
        <BuildersTable
          search={search}
          setSearch={setSearch}
          table={buildersTable}
          pagination={pagination}
          columns={builderColumns}
          builderListData={isBuilderListData}
        />
      </div>
    </div>
  );
});
