import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { tableTemplate } from '@templates/table'

// Functional table preview
function TablePreview() {
  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 dark:text-green-400'
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'Unpaid':
        return 'text-red-600 dark:text-red-400'
      default:
        return ''
    }
  }

  return (
    <div className="w-full p-4">
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <caption className="mt-4 text-sm text-muted-foreground">
              A list of your recent invoices.
            </caption>
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Invoice
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Method
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.invoice}
                  className={`border-b transition-colors hover:bg-muted/50 ${
                    index === invoices.length - 1 ? 'border-0' : ''
                  }`}
                >
                  <td className="p-4 align-middle font-medium">{invoice.invoice}</td>
                  <td className={`p-4 align-middle ${getStatusColor(invoice.paymentStatus)}`}>
                    {invoice.paymentStatus}
                  </td>
                  <td className="p-4 align-middle">{invoice.paymentMethod}</td>
                  <td className="p-4 text-right align-middle">{invoice.totalAmount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/50 font-medium">
              <tr>
                <td className="p-4" colSpan={3}>
                  Total
                </td>
                <td className="p-4 text-right">$1,750.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export function TableDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Table</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A responsive table component for displaying data.
        </p>
      </div>

      <ComponentPreview
        name="Table"
        preview={<TablePreview />}
        code={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Text } from 'react-native';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

export function InvoiceTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">
              <Text>{invoice.invoice}</Text>
            </TableCell>
            <TableCell>
              <Text>{invoice.paymentStatus}</Text>
            </TableCell>
            <TableCell>
              <Text>{invoice.paymentMethod}</Text>
            </TableCell>
            <TableCell className="text-right">
              <Text>{invoice.totalAmount}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Text>Total</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text>$1,750.00</Text>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}`}
      />

      <InstallationSteps
        cli="npx native-shadcn add table"
        manual={tableTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <pre className="rounded-lg border bg-muted p-4">
              <code>{`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Component</th>
                <th className="p-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">Table</td>
                <td className="p-4 text-sm text-muted-foreground">Wrapper with horizontal scroll support</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableHeader</td>
                <td className="p-4 text-sm text-muted-foreground">Container for table header rows</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableBody</td>
                <td className="p-4 text-sm text-muted-foreground">Container for table body rows</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableFooter</td>
                <td className="p-4 text-sm text-muted-foreground">Container for table footer</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableRow</td>
                <td className="p-4 text-sm text-muted-foreground">Individual table row</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableHead</td>
                <td className="p-4 text-sm text-muted-foreground">Header cell</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">TableCell</td>
                <td className="p-4 text-sm text-muted-foreground">Data cell</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">TableCaption</td>
                <td className="p-4 text-sm text-muted-foreground">Table caption/description</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Responsive design with horizontal scrolling</li>
          <li>Composable table components</li>
          <li>Customizable styling with Tailwind CSS</li>
          <li>Support for headers, body, and footers</li>
          <li>Accessible table structure</li>
        </ul>
      </div>
    </div>
  )
}
