"use client"

import { Box, Grid } from "@mui/material"
import React, { useState } from "react"
import { TagChip } from "components/TagChip/TagChip"
import { TextField } from "components/TextField/TextField"
import { TruckCard } from "components/TruckCard/TruckCard"
import type { TruckCardData } from "./page"

const partnerChips = ["DHL", "UPS", "FedEx", "Freelancers", "Truckvise"]

interface TrucksClientProps {
  trucks: TruckCardData[]
}

export default function TrucksClient({ trucks }: TrucksClientProps) {
  const [data] = useState<TruckCardData[]>(trucks)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null)

  const filteredData = data.filter((truck) => {
    const matchesSearch =
      truck.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.type.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedPartner) {
      const matchesPartner = truck.partner.toLowerCase() === selectedPartner.toLowerCase()
      return matchesSearch && matchesPartner
    }

    return matchesSearch
  })

  const handleChipClick = (partner: string) => {
    setSelectedPartner((prev) => (prev === partner ? null : partner))
  }

  return (
    <Box p={2}>
      <Box display="flex" gap={1} mb={2} flexWrap="wrap">
        {partnerChips.map((partner) => (
          <TagChip
            key={partner}
            count={filteredData.filter((t) => t.partner === partner).length}
            label={partner}
            onClick={() => handleChipClick(partner)}
            sx={{
              bgcolor: selectedPartner === partner ? "#cfcfcf" : "#e3e3e3",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      <TextField
        placeholder="Filter by Trucks..."
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {filteredData.map((truck) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={truck.id}>
            <TruckCard
              identifier={truck.identifier}
              type={truck.type}
              imageUrl={truck.imageUrl}
              capacity={truck.capacity}
              wheels={truck.wheels}
              status={truck.status}
              onClick={() => console.log(`Truck clicked: ${truck.identifier}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
