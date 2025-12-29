import { CodeBlock } from '@/components/code-block'

export function DataTableDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Data Table</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Powerful table component with advanced features using TanStack Table.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-3">
        <p className="text-sm font-medium">
          We're going to build a data table using <strong>TanStack Table</strong> (formerly React Table).
        </p>
        <p className="text-sm text-muted-foreground">
          In this guide, we'll show you how to use TanStack Table v8 with the Table component to create
          powerful data tables for your React Native application. We'll cover sorting, filtering, pagination, and more.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { DataTable } from '@/components/ui/data-table';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<DataTable columns={columns} data={data} />`} language="tsx" />
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="rounded-lg border p-6">
        <h3 className="font-semibold mb-3">On This Page</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Installation</li>
          <li>• Data Table Component</li>
          <li>• Column Definitions</li>
          <li>• Sorting</li>
          <li>• Filtering</li>
          <li>• Pagination</li>
          <li>• Row Selection</li>
        </ul>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground">
          1. Install TanStack Table:
        </p>
        <CodeBlock code="npm install @tanstack/react-table" language="bash" />
        <p className="text-muted-foreground mt-4">
          2. Add the Table component to your project:
        </p>
        <CodeBlock code="npx native-shadcn add table" language="bash" />
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p className="text-muted-foreground">
          We're going to build a data table to show a list of users. We'll use the following data structure:
        </p>
        <CodeBlock
          code={`type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}`}
          language="tsx"
        />
      </div>

      {/* Step 1: Create table components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Create Table Component Files</h2>
        <p className="text-muted-foreground">
          Create a <code className="text-sm bg-muted px-1 py-0.5 rounded">data-table.tsx</code> file that will contain our reusable data table component:
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">app/components/ui/data-table.tsx</h3>
          <CodeBlock
            code={`import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { View, Text } from "react-native"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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

  return (
    <View className="gap-4">
      <View className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  <Text>No results.</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </View>
      <View className="flex-row items-center justify-between px-2">
        <Text className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </Text>
        <View className="flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onPress={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </View>
      </View>
    </View>
  )
}`}
            language="tsx"
          />
        </div>
      </div>

      {/* Step 2: Define columns */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Define Your Columns</h2>
        <p className="text-muted-foreground">
          Next, define your column definitions:
        </p>
        <CodeBlock
          code={`import { ColumnDef } from "@tanstack/react-table"
import { Text } from "react-native"

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Text className="font-medium">{row.getValue("name")}</Text>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Text className="lowercase">{row.getValue("email")}</Text>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Text className="capitalize">{status}</Text>
      )
    },
  },
]`}
          language="tsx"
        />
      </div>

      {/* Step 3: Render the table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Render the Table</h2>
        <p className="text-muted-foreground">
          Finally, pass your data and columns to the DataTable component:
        </p>
        <CodeBlock
          code={`import { DataTable } from "@/components/ui/data-table"
import { columns, User } from "./columns"

async function getData(): Promise<User[]> {
  // Fetch data from your API or database
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      status: "active",
    },
    // ... more data
  ]
}

export default function UsersPage() {
  const data = await getData()

  return (
    <View className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </View>
  )
}`}
          language="tsx"
        />
      </div>

      {/* Sorting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Sorting</h2>
        <p className="text-muted-foreground">
          You can make columns sortable by using the <code className="text-sm bg-muted px-1 py-0.5 rounded">header</code> property:
        </p>
        <CodeBlock
          code={`import { ArrowUpDown } from "lucide-react-native"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onPress={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <Text className="lowercase">{row.getValue("email")}</Text>,
  },
]`}
          language="tsx"
        />
      </div>

      {/* Filtering */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Filtering</h2>
        <p className="text-muted-foreground">
          Add a search input to filter your data:
        </p>
        <CodeBlock
          code={`import { Input } from "@/components/ui/input"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    // ... table config
  })

  return (
    <View className="gap-4">
      <View className="flex-row items-center">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChangeText={(value) =>
            table.getColumn("email")?.setFilterValue(value)
          }
          className="max-w-sm"
        />
      </View>
      <View className="rounded-md border">
        <Table>
          {/* ... table structure */}
        </Table>
      </View>
    </View>
  )
}`}
          language="tsx"
        />
      </div>

      {/* Row Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Row Selection</h2>
        <p className="text-muted-foreground">
          Add checkboxes to select rows:
        </p>
        <CodeBlock
          code={`import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ... other columns
]`}
          language="tsx"
        />
      </div>

      {/* Pagination */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Pagination</h2>
        <p className="text-muted-foreground">
          Pagination is handled automatically by TanStack Table. The DataTable component includes Previous/Next buttons.
          You can customize the page size:
        </p>
        <CodeBlock
          code={`const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 10, // Show 10 rows per page
    },
  },
  // ... other config
})`}
          language="tsx"
        />
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Use TypeScript for type safety with your data and columns</li>
          <li>Keep column definitions in a separate file for reusability</li>
          <li>Use React.memo() for cell renderers to optimize performance</li>
          <li>Implement server-side pagination for large datasets</li>
          <li>Add loading states while fetching data</li>
          <li>Make tables responsive with horizontal scrolling</li>
        </ul>
      </div>

      {/* Resources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Learn More</h2>
        <p className="text-muted-foreground">
          For more information on TanStack Table:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>
            <a
              href="https://tanstack.com/table/v8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TanStack Table Documentation
            </a>
          </li>
          <li>
            <a
              href="https://tanstack.com/table/v8/docs/examples/react/basic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TanStack Table Examples
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
