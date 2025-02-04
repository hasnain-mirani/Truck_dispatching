import { Metadata } from "next"
import { Button } from "components/Button/Button"
import { Tooltip } from "components/Tooltip/Tooltip"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
}

export default function Web() {
  return (
    <>
      <h1>Welcome to Truckwise App</h1>

      <Tooltip explainer="Click to get started" withArrow placement="top">
        <Button intent="primary" size="lg">
          Get Started
        </Button>
      </Tooltip>
    </>
  )
}
