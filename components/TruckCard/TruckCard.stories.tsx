import type { Meta, StoryObj } from "@storybook/react"
import { TruckCard, TruckCardProps } from "./TruckCard"

const meta: Meta<TruckCardProps> = {
  title: "Components/TruckCard",
  component: TruckCard,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    identifier: "UPS-34DFR734W2",
    type: "RAM PICKUP TRUCK",
    imageUrl:
      "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
    capacity: "1000kg total capacity",
    wheels: "4 wheels",
    status: "idle",
    cardWidth: 320,
  },
  argTypes: {
    identifier: {
      control: "text",
      description: "Unique identifier (e.g., VIN) displayed at the top.",
    },
    type: {
      control: "text",
      description: "Truck type or model name (e.g., 'RAM PICKUP TRUCK').",
    },
    imageUrl: {
      control: "text",
      description: "URL of the truck image displayed at the top of the card.",
    },
    capacity: {
      control: "text",
      description: "e.g., '1000kg total capacity'.",
    },
    wheels: {
      control: "text",
      description: "e.g., '4 wheels'.",
    },
    status: {
      control: "select",
      options: ["on-route", "idle", "out-of-service"],
      description: "Operational status of the truck (on-route, idle, or out-of-service).",
    },
    sx: {
      control: false,
      description: "MUI's sx prop for styling overrides.",
    },
    onClick: {
      action: "clicked",
      description: "Fires when the card is clicked. This makes the card hoverable and clickable.",
    },
  },
}

export default meta
type Story = StoryObj<TruckCardProps>

export const Default: Story = {}

export const OnRoute: Story = {
  args: {
    status: "on-route",
    identifier: "DHL-ABC123",
    type: "VOLVO FH",
    cardWidth: 320,
    imageUrl:
      "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
  },
}

export const OutOfService: Story = {
  args: {
    status: "out-of-service",
    identifier: "FEDEX-XYZ789",
    type: "MERCEDES ACTROS",
    cardWidth: 320,
    imageUrl:
      "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
  },
}

export const MinimalInfo: Story = {
  args: {
    identifier: "NoCap-123",
    type: "Unknown Truck",
    cardWidth: 320,
    imageUrl:
      "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
    capacity: undefined,
    wheels: undefined,
  },
}

export const Clickable: Story = {
  args: {
    onClick: () => alert("Truck card clicked!"),
  },
}
