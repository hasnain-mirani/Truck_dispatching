import { AccountCircle } from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem"
import type { Meta, StoryObj } from "@storybook/react"
import { CustomSelectFieldProps, SelectField } from "./SelectField"

const meta: Meta<CustomSelectFieldProps> = {
  title: "Components/SelectField",
  component: SelectField,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: "Select an option",
    errorMessage: "",
    loading: false,
    value: "option1",
    children: (
      <>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </>
    ),
  },
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    loading: { control: "boolean" },
    startIcon: { control: false },
    endIcon: { control: false },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
}

type Story = StoryObj<CustomSelectFieldProps>

export const Default: Story = {
  render: (args) => <SelectField {...args} />,
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithStartIcon: Story = {
  args: {
    startIcon: <AccountCircle />,
  },
}

export const WithError: Story = {
  args: {
    errorMessage: "This field is required",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

export default meta
