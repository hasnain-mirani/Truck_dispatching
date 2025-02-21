import { Metadata } from "next"
import NewTruckClient from "./NewTruckClient"

export const metadata: Metadata = {
  title: "Add Truck - Truckvise",
  description: "Add a new truck, license validity, and more.",
}

export default function AddPartnerPage() {
  return <NewTruckClient />
}
