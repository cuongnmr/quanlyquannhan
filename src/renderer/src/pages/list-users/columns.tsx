import { Checkbox } from '@renderer/components/ui/checkbox'
import { User, userProps } from '@renderer/types/user'
import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function getColumns(): ColumnDef<User>[] {
  return Object.entries(userProps).map(([key, value]) => {
    return {
      accessorKey: key,
      header: value
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
