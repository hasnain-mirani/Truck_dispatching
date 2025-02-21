import { Metadata } from "next";
import DriversClient from "./DriversClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Drivers - Truckvise",
  description: "View and search drivers.",
};

export interface DriverRow {
  id: string;
  driverName: string;
  location: string;
  experience: number;
  assignedTruck: string;
  driverInsurance: string;
  designation: string;
}

async function getDrivers(): Promise<DriverRow[]> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, { cache: "no-store" });
  // if (!res.ok) throw new Error("Failed to fetch drivers");
  // return res.json();

  return [
    {
      id: "1",
      driverName: "Hanna Yappob",
      location: "UAE_Dubai",
      experience: 6,
      assignedTruck: "DHL-34DFR734W2",
      driverInsurance: "Yes",
      designation: "Employee",
    },
    {
      id: "2",
      driverName: "Suleman Al Khan",
      location: "UAE_Dubai",
      experience: 2,
      assignedTruck: "FF-34DFR734W2",
      driverInsurance: "No",
      designation: "Freelancer",
    },
    {
      id: "3",
      driverName: "Jacob Black",
      location: "UAE_Dubai",
      experience: 10,
      assignedTruck: "FF-34DFR734W2",
      driverInsurance: "Yes",
      designation: "Employee",
    },
    {
      id: "4",
      driverName: "Jason Boma",
      location: "UAE_Dubai",
      experience: 3.7,
      assignedTruck: "UPS-34DFR734W2",
      driverInsurance: "Yes",
      designation: "Employee",
    },
    {
      id: "5",
      driverName: "James Jon",
      location: "UAE_Dubai",
      experience: 4,
      assignedTruck: "UPS-34DFR734W2",
      driverInsurance: "Yes",
      designation: "Employee",
    },
  ];
}

export default async function DriversPage() {
  const drivers = await getDrivers();
  return <DriversClient drivers={drivers} />;
}
