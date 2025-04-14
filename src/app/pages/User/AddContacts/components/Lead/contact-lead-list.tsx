import React, { useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from 'app/components/ui/button';
import { Checkbox } from 'app/components/ui/checkbox';
import { Input } from 'app/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/components/ui/table';
import { useLeadSlice } from '../../slice';
import { imageUrl, settingConfig } from 'utils/settingConfig';
import { dateForMateWithTime } from 'utils/dateformate';
import { useDebounce } from 'app/components/ui/multi-selector';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstLettersOfEachWord } from 'utils/getFirstWordOflatter';
import { toast } from 'app/components/ui/use-toast';
import { selectUser } from 'app/slice/selectors';
import { ContactNavigationTabs } from 'app/pages/Admin/components/contact-tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'app/components/ui/dropdown-menu';
import LeadFilter from './lead-filter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'app/components/ui/select';

export function ContactList() {
  const { useLeadListQuery, useDeleteLeadMutation } = useLeadSlice();
  const user = useSelector(selectUser);
  const [search, setSearch] = React.useState('');
  // const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const searchDebounce = useDebounce(search, 300);

  const [pagination, setPagination] = React.useState<any>({
    pageIndex: 0,
    pageSize: 2,
  });
  const [openFilters, setOpenFilters] = React.useState<boolean>(false);

  ///// LEAD LIST /////
  let payload = {
    search: searchDebounce,
    page: pagination.pageIndex + 1,
  };
  const [
    leadList,
    {
      isLoading: isleadList,
      isSuccess: isleadListSuccess,
      data: isleadListData,
      error: isleadListError,
    },
  ] = useLeadListQuery();
  const resumesPagination = {
    totalPages: isleadListData?.data?.totalPages,
    pageSize: isleadListData?.data?.pageSize,
  };

  ////// DELETE LEAD ////////
  const [
    leadsDelete,
    {
      isLoading: isleadDelete,
      isSuccess: isleadDeleteSuccess,
      data: isleadDeleteData,
      error: isleadDeleteError,
    },
  ] = useDeleteLeadMutation();
  const leadData = isleadListData?.data?.documents;
  const leadDelete = (id: any) => {
    leadsDelete(id);
  };
  useEffect(() => {
    if (isleadDeleteSuccess) {
      leadList(payload);
      toast({
        description: 'lead delete successfully',
      });
    }
  }, [isleadDeleteSuccess]);

  const columns: ColumnDef<any>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex max-w-[8.8rem]">
          <Checkbox
            className="w-8 h-8 border border-[#d4d8df] rounded-[.6rem]"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <div className="ml-5">Full name</div>
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
            className="ml-5 mr-5 cursor-pointer"
            onClick={() => edit(row?.original)}
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
                  {row.original.fullName || '_'}
                </div>
                {/* <div className="ml-3 cursor-pointer">
                                    <Pencil width={12} />
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      ),

      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'leadSource',
      header: 'Lead source',
      cell: ({ row }) => (
        <div
          onClick={() => edit(row?.original)}
          className="capitalize cursor-pointer"
        >
          {' '}
          {settingConfig.getSetting('leadSource', row.getValue('leadSource')) ||
            '_'}
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
          onClick={() => edit(row?.original)}
          className="capitalize cursor-pointer w-[13rem]"
        >
          {console.log(row?.original?.campaign)}
          {row?.original?.campaign?.[0]?.title || '_'}
        </div>
      ),
    },

    {
      accessorKey: 'LeadStatus',
      header: ({ column }) => {
        return <div>Lead Status</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => edit(row?.original)}
          className={`${row?.original?.assignedLoanOfficer?.length > 0
            ? row?.original?.clientStatuses == 1
              ? 'bg-blue text-white'
              : row?.original?.clientStatuses == 2
                ? 'bg-[#f4f4c9] text-[#525811]'
                : row?.original?.clientStatuses == 3
                  ? 'bg-[#fff6da] text-[#6d6120]'
                  : row?.original?.clientStatuses == 4
                    ? 'bg-[#e7fff0] text-[#11744d]'
                    : row?.original?.clientStatuses == 5
                      ? 'bg-[#222222] text-white'
                      : 'bg-grey-700'
            : 'bg-[#EAECF0]'
            } rounded-full px-4 py-1 text-12 w-fit font-medium flex items-center cursor-pointer`}
        >
          <span className="mr-2">
            <div
              className={`${row?.original?.assignedLoanOfficer?.length > 0
                ? row?.original?.clientStatuses == 1
                  ? 'bg-white'
                  : row?.original?.clientStatuses == 2
                    ? 'bg-[#a6bf12]'
                    : row?.original?.clientStatuses == 3
                      ? 'bg-[#cd9302]'
                      : row?.original?.clientStatuses == 4
                        ? 'bg-[#10c070]'
                        : row?.original?.clientStatuses == 5
                          ? 'bg-white'
                          : 'bg-blue-700'
                : 'bg-[#667085]'
                } rounded-full w-[.8rem] h-[.8rem]`}
            ></div>
          </span>{' '}
          {row?.original?.assignedLoanOfficer?.length > 0
            ? settingConfig.getSetting(
              'clientStatus',
              row?.original?.clientStatuses,
            )
            : 'Unassigned'}
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
          onClick={() => edit(row?.original)}
          className="text-[#101828] w-[12rem] font-medium cursor-pointer"
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
      accessorKey: 'AssignedAgent',
      header: ({ column }) => {
        return <div>Assigned Agent</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => edit(row?.original)}
          className="capitalize cursor-pointer"
        >
          {row?.original?.assignedAgent?.[0]?.name || '_'}
        </div>
      ),
    },
    {
      accessorKey: 'AssignedBuilder',
      header: ({ column }) => {
        return <div>Assigned Builder</div>;
      },
      cell: ({ row }) => (
        <div
          onClick={() => edit(row?.original)}
          className="capitalize cursor-pointer px-0"
        >
          {row?.original?.assignedBuilder?.[0]?.name || '_'}
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
          onClick={() => edit(row?.original)}
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
          onClick={() => edit(row?.original)}
          className="cursor-pointer max-w-[6.4rem]  text-base leading-8"
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
          <>
            {user?.role == 'admin' || user?.role == 'Admin' ? (
              <div
                onClick={() =>
                  !isleadDelete ? leadDelete(row.original._id) : null
                }
                className="cursor-pointer"
              >
                <Trash2 className="h-8 w-8" />
              </div>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  useEffect(() => {
    leadList(payload);
  }, [search, searchDebounce, pagination]);
  const table = useReactTable({
    data: leadData ?? [],
    columns,
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
  const dispatch = useDispatch();
  const { actions } = useLeadSlice();
  const edit = (value: any) => {
    dispatch(actions.setEdit({ data: value }));
  }

  return (
    <div className="">
      <div className="container">
        <ContactNavigationTabs />
        <div className="w-full mt-16">
          <div className=" bg-white rounded-32">
            <div className=" py-10 px-10 pb-8 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center py-4  relative">
                  <Input
                    className="w-[32rem] pl-16 rounded-default"
                    placeholder="Search Leads"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="absolute left-4 top-9">
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                        stroke="#667085"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <DropdownMenu
                    open={openFilters}
                    onOpenChange={setOpenFilters}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="leadBtnTab"
                        type="button"
                        className="  py-4  px-10 font-normal text-14 text-black rounded-full bg-transparent "
                      >
                        <span className="pr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M2.82174 4.72239C2.19146 4.01796 1.87631 3.66574 1.86443 3.3664C1.8541 3.10636 1.96585 2.85643 2.16652 2.69074C2.39753 2.5 2.87015 2.5 3.8154 2.5H16.1845C17.1298 2.5 17.6024 2.5 17.8334 2.69074C18.0341 2.85643 18.1458 3.10636 18.1355 3.3664C18.1236 3.66574 17.8084 4.01796 17.1782 4.72239L12.423 10.037C12.2973 10.1774 12.2345 10.2477 12.1897 10.3276C12.15 10.3984 12.1208 10.4747 12.1032 10.554C12.0833 10.6435 12.0833 10.7377 12.0833 10.9261V15.382C12.0833 15.5449 12.0833 15.6264 12.057 15.6969C12.0338 15.7591 11.996 15.8149 11.9468 15.8596C11.8912 15.9102 11.8155 15.9404 11.6642 16.001L8.83088 17.1343C8.52459 17.2568 8.37145 17.3181 8.24851 17.2925C8.14101 17.2702 8.04666 17.2063 7.98599 17.1148C7.91662 17.0101 7.91662 16.8452 7.91662 16.5153V10.9261C7.91662 10.7377 7.91662 10.6435 7.89672 10.554C7.87907 10.4747 7.84992 10.3984 7.81019 10.3276C7.7654 10.2477 7.70258 10.1774 7.57694 10.037L2.82174 4.72239Z"
                              stroke="#344054"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <LeadFilter />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="blueBtn"
                    type="button"
                    className=" py-2 px-10 ml-4 font-normal text-14 text-white rounded-full "
                  >
                    <span className="pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6.6665 13.3333L9.99984 10M9.99984 10L13.3332 13.3333M9.99984 10V17.5M16.6665 13.9524C17.6844 13.1117 18.3332 11.8399 18.3332 10.4167C18.3332 7.88536 16.2811 5.83333 13.7498 5.83333C13.5677 5.83333 13.3974 5.73833 13.3049 5.58145C12.2182 3.73736 10.2119 2.5 7.9165 2.5C4.46472 2.5 1.6665 5.29822 1.6665 8.75C1.6665 10.4718 2.36271 12.0309 3.48896 13.1613"
                          stroke="white"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    Import leads{' '}
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div>
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                          return (
                            <TableHead
                              key={header.id}
                              className="text-[1.2rem] font-medium "
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map(row => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map(cell => (
                            <TableCell
                              key={cell.id}
                              className="text-[1.4rem] text-[#667085]"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {leadData?.length > 0 ? (
                <div className="flex items-center pl-6 justify-start space-x-2 py-4">
                  <div className="flex items-center  pl-6 justify-start space-x-2 py-4">
                    <div className="flex-1 text-muted-foreground text-base font-poppins font-normal">
                      Page {pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="space-x-2">
                      <Button
                        className="text-base font-poppins font-normal"
                        variant="link"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'<<'}
                      </Button>
                      <Button
                        className="text-base font-poppins font-normal"
                        variant="link"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'Prev'}
                      </Button>
                      <Button
                        className="text-base font-poppins font-normal"
                        variant="link"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        {'Next'}
                      </Button>
                      <Button
                        className="text-base font-poppins font-normal"
                        variant="link"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                      >
                      </Button>
                    </div>
                    <p className="text-gray-500 font-normal text-base font-poppins">
                      {table.getSelectedRowModel().rows.length} of{' '}
                      {isleadListData?.data?.totalDocuments} rows selected
                    </p>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <p className="text-base font-normal font-poppins">
                      Rows Per Page:
                    </p>
                    <Select
                      value={rowsPerPage}
                      onValueChange={value => {
                        setRowsPerPage(Number(value));
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {settingConfig?.rowsPerPage?.map(item => (
                            <SelectItem
                              key={item.value}
                              value={`${item.value}`}
                            >
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
