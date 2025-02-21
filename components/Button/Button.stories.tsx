import { Delete, Save } from "@mui/icons-material"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonProps } from "./Button"

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    intent: "primary",
    underline: false,
    children: "Button",
    size: "lg",
    href: undefined,
    loading: false,
    fullWidth: false,
    startIcon: undefined,
    endIcon: undefined,
  },
  argTypes: {
    intent: {
      options: ["primary", "secondary", "danger", "outline"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    underline: {
      control: { type: "boolean" },
    },
    href: {
      control: "text",
      description:
        "Set a URL to render as a link (using Next.js Link for internal routes or `<a>` for external links).",
    },
    loading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    startIcon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
  },
}

type Story = StoryObj<ButtonProps>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const WithStartIcon: Story = {
  args: {
    startIcon: <Save />,
    children: "Save",
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: <Save />,
    children: "Save",
  },
}

export const DangerButton: Story = {
  args: {
    intent: "danger",
    children: "Delete",
    startIcon: <Delete />,
  },
}

export const OutlineButton: Story = {
  args: {
    intent: "outline",
    children: "Outline Button",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
}

export default meta
