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
// import AgentFilter from './agent-filter';

type brandPointsListDataProps = {
    // search: string;
    // setSearch: (value: string) => void;
    table: any;
    pagination: any;
    columns: any;
    brandPointsListData: any;
};
const BrandPointsTable = (props: brandPointsListDataProps) => {
    const { table, pagination, columns, brandPointsListData } =
        props;
    const [openFilters, setOpenFilters] = React.useState(false);
    console.log("table", brandPointsListData);
    return (
        <React.Fragment>
            <div className="w-full mt-16">
                <div className=" bg-white rounded-32">
                    <div className=" py-4 px-1 overflow-hidden">
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
                                    {brandPointsListData?.pagination?.totalDocuments} rows selected
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BrandPointsTable;
