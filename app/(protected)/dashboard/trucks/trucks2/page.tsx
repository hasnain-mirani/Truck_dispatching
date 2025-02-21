import { Metadata } from "next"
import TrucksClient from "./TrucksClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Trucks - Truckvise",
  description: "View and manage trucks with filtering and searching.",
}

export interface TruckCardData {
  id: string
  identifier: string
  type: string
  imageUrl: string
  capacity?: string
  wheels?: string
  status: "on-route" | "idle" | "out-of-service"
  partner: string
}

async function getTrucks(): Promise<TruckCardData[]> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trucks`, { cache: "no-store" });
  // if (!res.ok) throw new Error("Failed to fetch trucks");
  // return res.json();

  return [
    {
      id: "1",
      identifier: "UPS-34DFR734W2",
      type: "RAM PICKUP TRUCK",
      imageUrl:
        "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
      capacity: "1000kg total capacity",
      wheels: "4 wheels",
      status: "idle",
      partner: "UPS",
    },
    {
      id: "2",
      identifier: "DHL-34DFR734W2",
      type: "FORD PICKUP TRUCK",
      imageUrl:
        "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
      capacity: "1000kg total capacity",
      wheels: "4 wheels",
      status: "on-route",
      partner: "DHL",
    },
    {
      id: "3",
      identifier: "FEDEX-34DFR734W2",
      type: "RAM PICKUP TRUCK",
      imageUrl:
        "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
      capacity: "1000kg total capacity",
      wheels: "4 wheels",
      status: "out-of-service",
      partner: "FedEx",
    },
    {
      id: "4",
      identifier: "UPS-ABCD1234",
      type: "RAM PICKUP TRUCK",
      imageUrl:
        "https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/2025/ram-1500/gallery/desktop/my25-ram-1500-gallery-open-6-d.jpg.image.1440.jpg",
      capacity: "2000kg total capacity",
      wheels: "4 wheels",
      status: "idle",
      partner: "UPS",
    },
  ]
}

export default async function TrucksPage() {
  const trucks = await getTrucks()
  return <TrucksClient trucks={trucks} />
}
