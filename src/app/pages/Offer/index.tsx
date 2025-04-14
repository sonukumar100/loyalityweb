"use client"

import { useState } from "react"

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Download,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "app/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "app/components/ui/popover"
import { Calendar } from "app/components/ui/calendar"
import { Badge } from "app/components/ui/badge"
// import { cn } from "@/lib/utils"


import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "app/components/ui/table"
import OfferForm from "./offer-form"

// Define the data type for our offers
type Offer = {
  id: number
  date: Date
  createdBy: string
  type: string
  title: string
  offerCode: string
  startDate: Date
  endDate: Date
  gift: number
  status: "active" | "inactive"
}

// Sample data
const offers: Offer[] = [
  {
    id: 1,
    date: new Date("2025-04-07"),
    createdBy: "Admin",
    type: "Contractor",
    title: "Special Sell",
    offerCode: "##sell",
    startDate: new Date("2024-09-03"),
    endDate: new Date("2025-04-10"),
    gift: 4,
    status: "active",
  },
]

export const OfferList = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [titleFilter, setTitleFilter] = useState<string>("")
  const [offerCodeFilter, setOfferCodeFilter] = useState<string>("")
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>(undefined)
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("all")

  // Filter data based on active tab
  const filteredOffers = offers.filter((offer) => {
    if (activeTab === "active") return offer.status === "active"
    if (activeTab === "inactive") return offer.status === "inactive"
    return true
  })

  const columns: ColumnDef<Offer>[] = [
    {
      accessorKey: "date",
      header: "Date / Created by",
      cell: ({ row }) => (
        <div>
          {format(row.original.date, "dd MMM yyyy")} / {row.original.createdBy}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <a href="#" className="text-primary hover:underline">
          {row.original.title}
        </a>
      ),
    },
    {
      accessorKey: "offerCode",
      header: "Offer Code",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => format(row.original.startDate, "dd MMM yyyy"),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => format(row.original.endDate, "dd MMM yyyy"),
    },
    {
      accessorKey: "gift",
      header: "Gift",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700">
            {row.original.gift}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${row.original.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
          />

          <div
            className={`w-6 h-3 rounded-full ${row.original.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
          />
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredOffers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Count offers by status
  const allCount = offers.length
  const activeCount = offers.filter((offer) => offer.status === "active").length
  const inactiveCount = offers.filter((offer) => offer.status === "inactive").length

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">
                All{" "}
                <Badge variant="outline" className="ml-1">
                  {allCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active{" "}
                <Badge variant="outline" className="ml-1">
                  {activeCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Deactive{" "}
                <Badge variant="outline" className="ml-1">
                  {inactiveCount}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 w-[200px]" />
            </div>
            <Button variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Date Filter
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Pages 1 of 1</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronsLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <span className="text-sm">1</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronsRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
              <TableRow>
                <TableHead>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "PPP") : "Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Contractor">Contractor</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </TableHead>
                <TableHead>
                  <Input placeholder="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
                </TableHead>
                <TableHead>
                  <Input
                    placeholder="Offer Code"
                    value={offerCodeFilter}
                    onChange={(e) => setOfferCodeFilter(e.target.value)}
                  />
                </TableHead>
                <TableHead>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDateFilter ? format(startDateFilter, "PPP") : "Start Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDateFilter} onSelect={setStartDateFilter} initialFocus />
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDateFilter ? format(endDateFilter, "PPP") : "End Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDateFilter} onSelect={setEndDateFilter} initialFocus />
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Excel export button */}
      <div className="fixed bottom-6 right-24">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-14 w-14 bg-green-100 border-green-200 hover:bg-green-200"
        >
          <Download className="h-6 w-6 text-green-700" />
        </Button>
      </div>

      {/* Add new button */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="rounded-full h-14 w-14 bg-yellow-400 hover:bg-yellow-500 text-black">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <OfferForm />
    </div>
  )
}
