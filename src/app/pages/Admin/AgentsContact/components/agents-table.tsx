import React from 'react';
import { Input } from 'app/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'app/components/ui/table';
import { Button } from 'app/components/ui/button';
import { flexRender } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'app/components/ui/dropdown-menu';
import AgentFilter from './agent-filter';

type AgentsTableProps = {
  search: string;
  setSearch: (value: string) => void;
  table: any;
  pagination: any;
  columns: any;
  agentListData: any;
};
const AgentsTable = (props: AgentsTableProps) => {
  const { search, setSearch, table, pagination, columns, agentListData } =
    props;
  const [openFilters, setOpenFilters] = React.useState(false);
  return (
    <React.Fragment>
      <div className="w-full mt-16">
        <div className=" bg-white rounded-32">
          <div className=" py-10 px-10 pb-8 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center py-4  relative">
                <Input
                  className="w-[32rem] pl-16 rounded-default"
                  placeholder="Search Agents"
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
                <DropdownMenu open={openFilters} onOpenChange={setOpenFilters}>
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
                    <AgentFilter />
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
                  Import agents{' '}
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
            <div className="flex items-center pl-6 justify-start space-x-2 py-4">
              <div className="flex items-center pl-6 space-x-10 py-4">
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
                    {'>>'}
                  </Button>
                </div>
                <p className="text-gray-500 font-normal text-base font-poppins">
                  {table.getSelectedRowModel().rows.length} of{' '}
                  {agentListData?.data?.totalDocuments} rows selected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AgentsTable;
