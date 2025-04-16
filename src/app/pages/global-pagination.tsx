import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  RefreshCw,
} from 'lucide-react';
import { Button } from 'app/components/ui/button';
import { Table } from '@tanstack/react-table';
import { useOfferSlice } from './Offer/slice';
import { useState } from 'react';

type GlobalPaginationProps = {
  table: Table<any>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  onRefresh?: () => void; // Optional callback for parent refresh

};

export const GlobalPagination = ({
  table,
  pagination,
  setPagination,
  onRefresh,
}: GlobalPaginationProps) => {
  const { useLazyGetOfferQuery } = useOfferSlice();
  const [getOffer] = useLazyGetOfferQuery();
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle page changes
  const handlePageChange = (pageIndex: number) => {
    setPagination(prev => ({ ...prev, pageIndex }));
    getOffer({ page: pageIndex + 1, limit: pagination.pageSize }); // Fetch new data with updated page
  };

  // Handle page size changes
  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ pageIndex: 0, pageSize }); // Reset to first page when page size changes
    getOffer({ page: 1, limit: pageSize }); // Fetch data with updated page size
  };

  // Refresh button click handler
  const handleRefresh = () => {
    setLoading(true);
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="flex items-center justify-end w-full space-x-4 px-2 py-2">
      {/* Refresh button */}
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16 rounded-[4px]"
        onClick={() => handleRefresh()}
        disabled={loading} // Disable the button while loading
      >
        <RefreshCw
          className={`h-8 w-8 ${loading ? 'animate-spin' : ''}`} // Apply animation when loading
        />
      </Button>

      {/* Page info */}
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        Pages {pagination.pageIndex + 1} of {table.getPageCount()}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center space-x-1 pagination-btn">
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16"
          onClick={() => handlePageChange(0)} // Go to the first page
          disabled={pagination.pageIndex === 0}
        >
          <ChevronsLeftIcon className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16"
          onClick={() => handlePageChange(pagination.pageIndex - 1)} // Go to previous page
          disabled={pagination.pageIndex === 0}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </Button>
        <span className="text-sm w-6 text-center">
          {pagination.pageIndex + 1}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16"
          onClick={() => handlePageChange(pagination.pageIndex + 1)} // Go to next page
          disabled={pagination.pageIndex + 1 >= table.getPageCount()}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16"
          onClick={() => handlePageChange(table.getPageCount() - 1)} // Go to the last page
          disabled={pagination.pageIndex + 1 >= table.getPageCount()}
        >
          <ChevronsRightIcon className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};
