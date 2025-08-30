import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Input } from '@renderer/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { User } from '@renderer/types/user'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ScrollArea, ScrollBar } from '@renderer/components/ui/scroll-area'
import { DataTableViewOptions } from './columns-toggle'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends User, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  })

  function handleDetails(id: string) {
    console.log(id)
    navigate({ to: '/user/' + id })
  }

  return (
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex shrink-0 pb-2 gap-2">
        <div className="flex-1">
          <Input
            placeholder="Tìm theo tên..."
            value={(table.getColumn('hoten')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('hoten')?.setFilterValue(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="shrink-0">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="min-w-0 min-h-0 flex-1 -m-3">
        <ScrollArea className="w-full h-full p-3">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    onDoubleClick={() => handleDetails(row.original.id)}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không có kết quả
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
