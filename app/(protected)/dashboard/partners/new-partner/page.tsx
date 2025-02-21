import { Metadata } from "next"
import NewPartnerClient from "./newPartnerClient"

export const metadata: Metadata = {
  title: "Add Partner - Truckvise",
  description: "Add a new partner, license validity, and more.",
}

export default function AddPartnerPage() {
  return <NewPartnerClient />
}
