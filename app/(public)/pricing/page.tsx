import { Metadata } from "next"
import PricingPageClient from "./PricingPageClient"

export const metadata: Metadata = {
  title: "Pricing - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function PricingPage() {
  return <PricingPageClient />
}
