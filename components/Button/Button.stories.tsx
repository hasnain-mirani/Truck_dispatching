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
  },
  argTypes: {
    intent: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
    underline: {
      control: { type: "boolean" },
    },
    href: {
      control: "text",
      description: "Set a URL to render as an anchor (`<a>`), otherwise it renders as a button.",
    },
  },
}

type Story = StoryObj<ButtonProps>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export default meta
