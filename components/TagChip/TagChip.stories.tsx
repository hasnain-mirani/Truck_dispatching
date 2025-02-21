import type { Meta, StoryObj } from "@storybook/react"
import { TagChip, TagChipProps } from "./TagChip"

const meta: Meta<TagChipProps> = {
  title: "Components/TagChip",
  component: TagChip,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: "Truckvise",
    count: 25,
    avatarBgColor: "#d1d1d1",
    avatarTextColor: "#6b6b6b",
    onClick: undefined,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Text displayed next to the count avatar.",
    },
    count: {
      control: "text",
      description: "Optional numeric/string badge displayed in the avatar.",
    },
    avatarBgColor: {
      control: "color",
      description: "Background color of the avatar.",
    },
    avatarTextColor: {
      control: "color",
      description: "Text color of the avatar content.",
    },
    onClick: {
      action: "clicked",
      description: "Fires when the TagChip is clicked (makes it clickable).",
    },
    sx: {
      control: false,
      description: "MUI sx prop for custom styling.",
    },
  },
}

export default meta
type Story = StoryObj<TagChipProps>

export const Default: Story = {}

export const NoCount: Story = {
  args: {
    count: undefined,
    label: "No Avatar",
  },
}

export const CustomColors: Story = {
  args: {
    count: "99+",
    label: "Notifications",
    avatarBgColor: "#fecf19",
    avatarTextColor: "#000",
  },
}

export const Clickable: Story = {
  args: {
    onClick: () => alert("TagChip clicked!"),
  },
}
