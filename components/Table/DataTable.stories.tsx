import type { Meta, StoryObj } from "@storybook/react"
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react"
import { DataColumn, DataTable, DataTableProps } from "./DataTable"

interface Truck {
  vehicleName: string
  vin: string
  status: string
}
const columns: DataColumn<Truck>[] = [
  { key: "vehicleName", label: "Vehicle Name" },
  { key: "vin", label: "VIN" },
  {
    key: "status",
    label: "Status",
    render: (row: {
      status:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<unknown>>
        | Iterable<ReactNode>
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<unknown>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined
    }) => {
      const color = row.status === "Under Repair" ? "red" : "green"
      return <span style={{ color, fontWeight: "bold" }}>{row.status}</span>
    },
  },
]

const mockData: Truck[] = [
  {
    vehicleName: "Truck A",
    vin: "VIN123456",
    status: "In Service",
  },
  {
    vehicleName: "Truck B",
    vin: "VIN654321",
    status: "Under Repair",
  },
]

const meta: Meta<DataTableProps<Truck>> = {
  title: "Components/DataTable",
  component: DataTable<Truck>,
  args: {
    columns,
    data: mockData,
    enableActions: false,
  },
  argTypes: {
    columns: {
      control: false,
      description: "An array of column definitions for the table.",
    },
    data: {
      control: false,
      description: "An array of data objects to render as rows.",
    },
    enableActions: {
      control: { type: "boolean" },
      description: "If true, renders an 'Actions' column at the end of the table.",
    },
    onEdit: {
      action: "editClicked",
      description: "Called when the Edit icon is clicked, if enableActions is true.",
    },
    onDelete: {
      action: "deleteClicked",
      description: "Called when the Delete icon is clicked, if enableActions is true.",
    },
    onCancel: {
      action: "cancelClicked",
      description: "Called when the Cancel icon is clicked, if enableActions is true.",
    },
    sx: {
      control: false,
      description: "MUI sx prop for styling the table container.",
    },
  },
}

export default meta
type Story = StoryObj<DataTableProps<Truck>>

export const Default: Story = {}

export const NoData: Story = {
  args: {
    data: [],
  },
}

export const WithActions: Story = {
  args: {
    enableActions: true,
  },
}

export const CustomRender: Story = {
  args: {
    columns: [
      {
        key: "vehicleName",
        label: "Vehicle Name",
        render: (row: {
          vehicleName:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<unknown, string | JSXElementConstructor<unknown>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | ReactPortal
                | ReactElement<unknown, string | JSXElementConstructor<unknown>>
                | Iterable<ReactNode>
                | null
                | undefined
              >
            | null
            | undefined
        }) => <span style={{ fontStyle: "italic" }}>{row.vehicleName}</span>,
      },
      { key: "vin", label: "VIN" },
      { key: "status", label: "Status" },
    ],
  },
}
