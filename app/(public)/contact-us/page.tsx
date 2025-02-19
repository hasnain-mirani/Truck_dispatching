import { Metadata } from "next"
import DemoBookingPageClient from "./DemoBookingPageClient"

export const metadata: Metadata = {
  title: "Book your exclusive demo - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function DemoBookingPage() {
  return <DemoBookingPageClient />
}
