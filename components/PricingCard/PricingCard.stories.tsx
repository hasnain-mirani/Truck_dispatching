import type { Meta, StoryObj } from "@storybook/react"
import { PricingCard } from "./PricingCard"

const meta: Meta<typeof PricingCard> = {
  title: "Components/PricingCard",
  component: PricingCard,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    title: "Essential",
    description: "For smaller fleets to organize vehicle inventory & manage inspections",
    totalPrice: 3,
    priceDescription: "per vehicle, per month, billed annually or $4 billed monthly*",
  },
  argTypes: {
    onDemoClick: { action: "onDemoClick" },
  },
}

export default meta
type Story = StoryObj<typeof PricingCard>

export const Default: Story = {}

export const WithDifferentPricing: Story = {
  args: {
    totalPrice: 5,
    priceDescription: "per vehicle, per month, billed annually or $6 billed monthly*",
  },
}

export const WithCustomTitle: Story = {
  args: {
    title: "Professional",
  },
}

export const WithDemoClick: Story = {
  args: {
    onDemoClick: () => alert("Demo clicked!"),
  },
}
