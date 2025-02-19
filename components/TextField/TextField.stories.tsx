import { Save } from "@mui/icons-material"
import type { Meta, StoryObj } from "@storybook/react"
import { CustomTextFieldProps, TextField } from "./TextField"

const meta: Meta<CustomTextFieldProps> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: "Input",
    errorMessage: "",
    loading: false,
    passwordField: false,
    value: "",
    startIcon: undefined,
    endIcon: undefined,
  },
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    loading: { control: "boolean" },
    passwordField: { control: "boolean" },
    value: { control: "text" },
    onChange: { action: "changed" },
    startIcon: { control: false },
    endIcon: { control: false },
  },
}

type Story = StoryObj<CustomTextFieldProps>

export const Default: Story = {
  render: (args) => <TextField {...args} />,
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithStartIcon: Story = {
  args: {
    startIcon: <Save />,
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: <Save />,
  },
}

export const Error: Story = {
  args: {
    errorMessage: "Invalid input",
  },
}

export const PasswordField: Story = {
  args: {
    passwordField: true,
    label: "Password",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

export default meta
