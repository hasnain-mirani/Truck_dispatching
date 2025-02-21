import { Metadata } from "next"
import NewDriverClient from "./NewDriverClient"

export const metadata: Metadata = {
  title: "Add Driver - Truckvise",
  description: "Add a new driver with personal and vehicle details.",
}

export default function AddDriverPage() {
  return <NewDriverClient />
}
