/**
 *
 * BrandPoints
 *
 */
import { Button } from 'app/components/ui/button';
import React, { memo, useEffect } from 'react';
import { ContactNavigationTabs } from '../../components/contact-tabs';
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
import useDebounce from 'utils/hooks/debounce-hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { formatToUSD } from 'utils/formatAmount';
import { useAgentSlice } from '../../AgentsContact/agentSlice';
import BrandPointsTable from './brand-points-table';
import { useAdminSlice } from '../../slice';
import { Input } from 'app/components/ui/input';

interface Props { }

export const BrandPoints = memo((props: Props) => {
    const user = useSelector(selectUser);
    const { toast } = useToast();

    const [order, setOrder] = React.useState(false);

    const { useGetPointsLazyQuery, useDeleteBrandMutation } = useAdminSlice();
    const [search, setSearch] = React.useState('');
    const [pagination, setPagination] = React.useState<any>({
        pageIndex: 0,
        pageSize: 2,
    });
    const [sort, setSort] = React.useState<string>('');

    const searchDebounce = useDebounce(search, 300);
    let payload = {
        search: searchDebounce,
        page: pagination.pageIndex + 1,
        sort: sort,
        order: order ? 'asc' : 'desc',
    };

    const [
        brandPointsList,
        {
            isLoading: isBrandLoading,
            isSuccess: isBrandSuccess,
            data: brandPointsData,
            error: isBrandError,
        },
    ] = useGetPointsLazyQuery();

    const dispatch = useDispatch();
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    React.useEffect(() => {
        brandPointsList(payload);
    }, [pagination]);
    const { actions: addTeamMember } = useAdminSlice();
    const brandPointsLists = brandPointsData;

    const brandColumns: ColumnDef<any>[] = [
        {
            id: 'serialNo',
            header: 'S. No.',
            cell: ({ row, table }) => {
                const pageIndex = table.getState().pagination.pageIndex;
                const pageSize = table.getState().pagination.pageSize;
                const rowIndex = row.index;
                return <div>{pageIndex * pageSize + rowIndex + 1}</div>;
            },
        },
        {
            accessorKey: 'name',
            header: () => (
                <div className="flex flex-col gap-1">
                    <span>Brand Name</span>
                    <input
                        type="text"
                        placeholder="Search brand..."
                        className="px-2 py-1 text-sm border rounded-md"
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            ),
            cell: ({ row }) => <div>{row.original.productName ?? '_'}</div>,

        },
        {
            accessorKey: 'karigarPoints',
            header: 'Karigar Points',
            cell: ({ row }) => <div>{row.original.karigerPoints ?? '_'}</div>,
        },
        {
            accessorKey: 'dealerPoints',
            header: 'Dealer Points',
            cell: ({ row }) => <div>{row.original.dealerPoints ?? '_'}</div>,
        },
        {
            accessorKey: 'createdAt',
            header: 'Date Created',
            cell: ({ row }) => (
                <div className="max-w-[8.4rem] text-base leading-8">
                    {dateForMateWithTime(row.getValue('createdAt')) || '_'}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const handleEdit = (value) => {
                    console.log('Edit:', row.original);
                    dispatch(addTeamMember.setEdit({ data: value }));
                    // your logic here
                };

                const handleDelete = () => {
                    console.log('Delete:', row.original);
                    deleteBrandById(row.original.id);
                    // your logic here
                };

                return (
                    <div className="flex gap-4 items-center">
                        <div
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
                            onClick={() => handleEdit(row.original)}
                        >
                            <Pencil className="w-5 h-5" />
                        </div>
                        <div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-5 h-5" />
                        </div>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
    ];






    const [
        deleteBrandById,
        {
            isLoading: isDeleteLoading,
            isSuccess: isDeleteSuccess,
            data: isDeleteData,
            error: isDeleteError,
        },
    ] = useDeleteBrandMutation();
    React.useEffect(() => {
        if (isDeleteSuccess) {
            toast({
                title: 'Brand Point Deleted',
                description: 'Brand Point deleted successfully',
                duration: 2000,
                variant: 'success',
            });
            brandPointsList(payload);
        }
    }, [isDeleteSuccess]);

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

    const brandTable = useReactTable({
        data: brandPointsLists?.data ?? [],
        columns: brandColumns,
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
    console.log(brandPointsData);

    return (
        <div className="">
            <div className="container">
                <ContactNavigationTabs />
                <BrandPointsTable
                    // search={search}
                    // setSearch={setSearch}
                    table={brandTable}
                    pagination={pagination}
                    columns={brandColumns}
                    brandPointsListData={brandPointsLists}
                />
            </div>
        </div>
    );
});
