"use client"

import { Box } from "@mui/material"
import React, { useState } from "react"
import { DataColumn, DataTable } from "components/Table/DataTable"
import { TagChip } from "components/TagChip/TagChip"
import { TextField } from "components/TextField/TextField"
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

const chipItems = [
  { id: "1", label: "DHL", count: 24 },
  { id: "2", label: "UPS", count: 12 },
  { id: "3", label: "FedEx", count: 10 },
  { id: "4", label: "Freelancers", count: 50 },
  { id: "5", label: "Truckvise", count: 25 },
]

interface TrucksClientProps {
  trucks: TruckRow[]
}

export default function TrucksClient({ trucks }: TrucksClientProps) {
  const [data, setData] = useState<TruckRow[]>(trucks)

  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleEdit = (row: TruckRow) => {
    alert(`Edit clicked for: ${row.vehicleName}`)
  }

  const handleDelete = (row: TruckRow) => {
    alert(`Delete clicked for: ${row.vehicleName}`)
    setData((prev) => prev.filter((item) => item.id !== row.id))
  }

  const filteredData = data.filter((row) => {
    const matchesSearch = row.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedChip) {
      const matchesChip = row.vehicleName.toLowerCase().includes(selectedChip.toLowerCase())
      return matchesSearch && matchesChip
    }

    return matchesSearch
  })

  const handleChipClick = (label: string) => {
    if (selectedChip === label) {
      setSelectedChip(null)
    } else {
      setSelectedChip(label)
    }
  }

  return (
    <Box p={2}>
      <TextField
        variant="outlined"
        placeholder="Search here..."
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {chipItems.map((chip) => (
          <TagChip
            key={chip.id}
            count={chip.count}
            label={chip.label}
            onClick={() => handleChipClick(chip.label)}
            sx={{
              bgcolor: selectedChip === chip.label ? "#cfcfcf" : "#e3e3e3",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      <DataTable<TruckRow>
        columns={columns}
        data={filteredData}
        enableActions
        onEdit={handleEdit}
        onDelete={handleDelete}
        sx={{ minWidth: 900 }}
      />
    </Box>
  )
}
