"use client"

import { Box, Typography } from "@mui/material"
import React, { useState } from "react"
import { DataColumn, DataTable } from "components/Table/DataTable"
import type { TruckRow } from "./page"

const columns: DataColumn<TruckRow>[] = [
  { key: "vehicleName", label: "Vehicle Name" },
  { key: "vin", label: "VIN/SN" },
  { key: "licensePlateNo", label: "License Plate No" },
  { key: "bodyType", label: "Body Type" },
  { key: "fuelType", label: "Fuel Type" },
  { key: "make", label: "Make" },
  { key: "year", label: "Year" },
  { key: "trim", label: "Trim" },
  { key: "registerStateProvince", label: "Register State/Province" },
  { key: "brakeSystem", label: "Brake System" },
  { key: "color", label: "Color" },
  { key: "tareWeight", label: "Tare Weight" },
  { key: "curbWeight", label: "Curb Weight" },
  { key: "GVMR", label: "GVMR" },
  { key: "ownership", label: "Ownership" },
  { key: "status", label: "Status" },
]

interface TrucksClientProps {
  trucks: TruckRow[]
}

export default function TrucksClient({ trucks }: TrucksClientProps) {
  const handleEdit = (row: TruckRow) => {
    alert(`Edit clicked for: ${row.vehicleName}`)
  }

  const handleDelete = (row: TruckRow) => {
    alert(`Delete clicked for: ${row.vehicleName}`)
  }

  const [data, setData] = useState<TruckRow[]>(trucks)

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Trucks
      </Typography>

      <DataTable<TruckRow>
        columns={columns}
        data={data}
        enableActions
        onEdit={handleEdit}
        onDelete={(row: TruckRow) => {
          handleDelete(row)
          setData((prev) => prev.filter((item) => item.id !== row.id))
        }}
        sx={{ minWidth: 900 }}
      />
    </Box>
  )
}
