import { Metadata } from "next"
import TrucksClient from "./TrucksClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Trucks - Truckvise",
  description: "View and search trucks.",
}

export interface TruckRow {
  id: string
  vehicleName: string
  vin: string
  licensePlateNo: string
  bodyType: string
  fuelType: string
  make: string
  year: number
  trim: string
  registerStateProvince: string
  brakeSystem: string
  color: string
  tareWeight: string
  curbWeight: string
  GVMR: string
  ownership: string
  status: string
}

async function getTrucks(): Promise<TruckRow[]> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trucks`, { cache: "no-store" });
  // if (!res.ok) throw new Error("Failed to fetch trucks");
  // return res.json();

  return [
    {
      id: "1",
      vehicleName: "Truck A",
      vin: "VIN123456",
      licensePlateNo: "ABC-123",
      bodyType: "Closed",
      fuelType: "Diesel",
      make: "Ford",
      year: 2020,
      trim: "XLT",
      registerStateProvince: "NY",
      brakeSystem: "Disc",
      color: "White",
      tareWeight: "4000 kg",
      curbWeight: "5000 kg",
      GVMR: "7000 kg",
      ownership: "Leased",
      status: "In Service",
    },
    {
      id: "2",
      vehicleName: "Truck B",
      vin: "VIN654321",
      licensePlateNo: "XYZ-987",
      bodyType: "Open",
      fuelType: "Gasoline",
      make: "Chevy",
      year: 2021,
      trim: "LT",
      registerStateProvince: "CA",
      brakeSystem: "Drum",
      color: "Blue",
      tareWeight: "4500 kg",
      curbWeight: "5500 kg",
      GVMR: "7500 kg",
      ownership: "Owned",
      status: "Under Repair",
    },
    {
      id: "3",
      vehicleName: "Truck C",
      vin: "VIN987654",
      licensePlateNo: "LMN-321",
      bodyType: "Flatbed",
      fuelType: "Diesel",
      make: "Volvo",
      year: 2019,
      trim: "XL",
      registerStateProvince: "TX",
      brakeSystem: "Disc",
      color: "Red",
      tareWeight: "4200 kg",
      curbWeight: "5200 kg",
      GVMR: "7200 kg",
      ownership: "Owned",
      status: "In Service",
    },
  ]
}

export default async function TrucksPage() {
  const trucks = await getTrucks()
  return <TrucksClient trucks={trucks} />
}
