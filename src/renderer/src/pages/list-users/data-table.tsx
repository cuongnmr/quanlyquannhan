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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'

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
import { ChangeEvent, useState } from 'react'
import { ScrollArea, ScrollBar } from '@renderer/components/ui/scroll-area'
import { DataTableViewOptions } from './columns-toggle'
import { Button } from '@renderer/components/ui/button'
import { Label } from '@renderer/components/ui/label'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const mapping: Record<string, string> = {
  bienche: 'Biên chế',
  capbac: 'Cấp bậc',
  chucvu: 'Chức vụ',
  trinhdo: 'Trình độ'
}

interface Props<TData extends User, TValue> extends DataTableProps<TData, TValue> {
  onRefresh: () => Promise<void>
}

export function DataTable<TData extends User, TValue>({
  columns,
  data,
  onRefresh
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [open, setOpen] = useState(false)
  const [stageData, setStageData] = useState<Record<string, string>>({})
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
  const selectedRows = table.getSelectedRowModel().rows

  function handleDetails(id: string) {
    console.log(id)
    navigate({ to: '/user/' + id })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    setStageData({
      ...stageData,
      [name]: value
    })
  }

  async function handleSubmit() {
    const ids = selectedRows.map((item) => item.original.id)
    await window.api.updateBulkUser(ids, stageData)
    await onRefresh()
    table.toggleAllRowsSelected(false)
    setStageData({})
    setOpen(false)
  }

  return (
    <div className="flex flex-col w-full h-full px-3">
      <div className="flex shrink-0 py-3 gap-2">
        <div className="flex-1">
          <Input
            placeholder="Tìm theo tên..."
            value={(table.getColumn('hoten')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('hoten')?.setFilterValue(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="shrink-0 flex gap-2">
          <DataTableViewOptions table={table} />
          {selectedRows.length > 0 && (
            <div className="shrink-0">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Sửa</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sửa hàng loạt</DialogTitle>
                    <DialogDescription>Đã chọn {selectedRows.length} mục</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {Object.entries(mapping).map(([key, value]) => (
                      <div key={key} className="grid w-full items-center gap-3">
                        <Label>{value}</Label>
                        <Input type="text" name={key} onChange={handleChange} />
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Đóng</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit}>
                      Lưu
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
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
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="text-muted-foreground text-sm shrink-0 py-3 border-t">
          Đã chọn {table.getFilteredSelectedRowModel().rows.length} trong tổng số{' '}
          {table.getFilteredRowModel().rows.length} mục.
        </div>
      )}
    </div>
  )
}
