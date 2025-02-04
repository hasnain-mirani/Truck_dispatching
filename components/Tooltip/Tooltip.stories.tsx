import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components/Button/Button";
import { Tooltip, TooltipProps } from "./Tooltip";

const meta: Meta<TooltipProps> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    explainer: "This is a tooltip",
    withArrow: true,
    placement: "top",
  },
  argTypes: {
    withArrow: {
      control: { type: "boolean" },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "select" },
    },
    explainer: {
      control: "text",
      description: "Tooltip content",
    },
  },
};

type Story = StoryObj<TooltipProps>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button intent="primary" size="lg">
        Hover me
      </Button>
    </Tooltip>
  ),
};

export default meta;
