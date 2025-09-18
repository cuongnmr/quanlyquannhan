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

import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { ScrollArea, ScrollBar } from '@renderer/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { getValue } from '@renderer/lib/mapping'
import { User, userProps } from '@renderer/types/user'
import { useNavigate } from '@tanstack/react-router'
import { ChangeEvent, RefObject, useState } from 'react'
import { DataTableViewOptions } from './columns-toggle'
import { Sheet, UserRoundPen } from 'lucide-react'

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
  ref: RefObject<HTMLDivElement | null>
}

export function DataTable<TData extends User, TValue>({
  columns,
  data,
  onRefresh,
  ref
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

  async function handleExport(selected?: boolean) {
    if (selected) {
      const data = selectedRows.reduce<Record<string, string>[]>((acc, curr) => {
        const data: Record<string, string> = {}
        Object.entries(curr.original).forEach((item) => {
          data[userProps[item[0]]] = item[1]
        })
        acc.push(data)
        return acc
      }, [])
      await window.api.exportExcel('ds_quannhan', data)
    } else {
      const file = data.reduce<Record<string, string>[]>((acc, curr) => {
        const data: Record<string, string> = {}
        Object.entries(curr).forEach((item) => {
          data[userProps[item[0]]] = getValue(item[0], item[1])
        })
        acc.push(data)
        return acc
      }, [])
      await window.api.exportExcel('ds_quannhan', file)
    }
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <UserRoundPen />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="leading-none font-medium">Sửa hàng loạt</h4>
                      <p className="text-muted-foreground text-sm">
                        Đã chọn {selectedRows.length} mục
                      </p>
                    </div>
                    <div className="grid gap-2">
                      {Object.entries(mapping).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor={key}>{value}</Label>
                          <Input
                            id={key}
                            name={key}
                            className="col-span-2 h-8"
                            type="text"
                            placeholder="Giá trị"
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Đóng
                      </Button>
                      <Button type="button" onClick={handleSubmit}>
                        Lưu
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Sheet />
                <span className="hidden lg:inline">Xuất excel</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Xuất file excel</DropdownMenuLabel>
              {selectedRows.length > 0 && (
                <DropdownMenuItem onClick={() => handleExport(true)}>
                  {selectedRows.length} mục đã chọn
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => handleExport()}>Tất cả danh sách</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="min-w-0 min-h-0 flex-1 -m-3">
        <ScrollArea className="w-full h-full p-3" ref={ref}>
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
