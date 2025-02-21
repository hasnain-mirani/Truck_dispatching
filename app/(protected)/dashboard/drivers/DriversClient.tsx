"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import { DataColumn, DataTable } from "components/Table/DataTable";
import { TagChip } from "components/TagChip/TagChip";
import { TextField } from "components/TextField/TextField";
import type { DriverRow } from "./page";

const columns: DataColumn<DriverRow>[] = [
  { key: "driverName", label: "Driver Name" },
  { key: "location", label: "Location" },
  { key: "experience", label: "Experience (years)" },
  { key: "assignedTruck", label: "Assigned Truck" },
  { key: "driverInsurance", label: "Driver Insurance" },
  { key: "designation", label: "Designation" },
];


const chipItems = ["DHL", "UPS", "FedEx", "Freelancers", "Truckvise"];

interface DriversClientProps {
  drivers: DriverRow[];
}

export default function DriversClient({ drivers }: DriversClientProps) {
  const [data, setData] = useState<DriverRow[]>(drivers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleEdit = (row: DriverRow) => {
    alert(`Edit clicked for driver: ${row.driverName}`);
  };

  const handleDelete = (row: DriverRow) => {
    alert(`Delete clicked for driver: ${row.driverName}`);
    setData((prev) => prev.filter((item) => item.id !== row.id));
  };

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.assignedTruck.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedChip) {
      if (selectedChip.toLowerCase() === "freelancers") {
        return (
          matchesSearch &&
          row.designation.toLowerCase() === "freelancer"
        );
      } else {
        return (
          matchesSearch &&
          row.assignedTruck.toLowerCase().includes(selectedChip.toLowerCase())
        );
      }
    }

    return matchesSearch;
  });

  const handleChipClick = (chipLabel: string) => {
    setSelectedChip((prev) => (prev === chipLabel ? null : chipLabel));
  };

  return (
    <Box p={2}>
      <TextField
        variant="outlined"
        placeholder="Search drivers..."
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {chipItems.map((chip) => {
          const count = filteredData.filter((driver) => {
            if (chip.toLowerCase() === "freelancers") {
              return driver.designation.toLowerCase() === "freelancer";
            } else {
              return driver.assignedTruck
                .toLowerCase()
                .includes(chip.toLowerCase());
            }
          }).length;

          return (
            <TagChip
              key={chip}
              count={count}
              label={chip}
              onClick={() => handleChipClick(chip)}
              sx={{
                bgcolor:
                  selectedChip === chip ? "#cfcfcf" : "#e3e3e3",
                cursor: "pointer",
              }}
            />
          );
        })}
      </Box>

      <DataTable<DriverRow>
        columns={columns}
        data={filteredData}
        enableActions
        onEdit={handleEdit}
        onDelete={handleDelete}
        sx={{ minWidth: 900 }}
      />
    </Box>
  );
}
