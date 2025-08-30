import { Checkbox } from '@renderer/components/ui/checkbox'
import { User, userProps } from '@renderer/types/user'
import { ColumnDef } from '@tanstack/react-table'
import { getValue } from '@renderer/lib/mapping'
import { DataTableColumnHeader } from './columns-header'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function getColumns(): ColumnDef<User>[] {
  return Object.entries(userProps).map(([key, value]) => {
    if (key === 'hoten') {
      return {
        accessorKey: key,
        header: ({ column }) => <DataTableColumnHeader column={column} title={value} />,
        cell({ getValue: getVal }) {
          const cellValue = getVal() as string
          return getValue(key, cellValue)
        }
      }
    }
    return {
      accessorKey: key,
      header: value,
      cell({ getValue: getVal }) {
        const cellValue = getVal() as string
        return getValue(key, cellValue)
      }
    }
  })
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },
  ...getColumns()
]
