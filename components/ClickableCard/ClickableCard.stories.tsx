import type { Meta, StoryObj } from "@storybook/react"
import { ClickableCard, ClickableCardProps } from "./ClickableCard"

const meta: Meta<ClickableCardProps> = {
  title: "Components/ClickableCard",
  component: ClickableCard,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    image: "https://cdn.worldvectorlogo.com/logos/dhl-1.svg",
    title: "Placeholder Title",
  },
  argTypes: {
    image: {
      control: "text",
      description: "URL of the image/logo displayed on the card.",
    },
    title: {
      control: "text",
      description: "Text displayed in the bottom overlay (e.g., '12 Trucks').",
    },
    href: {
      control: "text",
      description: "If provided, the card navigates to this URL when clicked (uses Next.js Link).",
    },
    onClick: {
      action: "clicked",
      description: "If provided (and href is not), a custom callback is fired on card click.",
    },
    sx: {
      control: false,
      description: "MUI's sx prop for custom styling.",
    },
  },
}

export default meta

type Story = StoryObj<ClickableCardProps>

export const Default: Story = {
  args: {},
}

export const WithHref: Story = {
  args: {
    title: "12 Trucks",
    image: "https://cdn.worldvectorlogo.com/logos/ups-logo-1.svg",
    href: "/fleet/ups",
  },
}

export const WithOnClick: Story = {
  args: {
    title: "8 Trucks",
    image: "https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg",
    onClick: () => alert("Card clicked!"),
  },
}

export const CustomStyling: Story = {
  args: {
    title: "Custom Width",
    image: "https://cdn.worldvectorlogo.com/logos/aramex-logo-1.svg",
    sx: { width: 300 },
  },
}
