"use client"

import { Box, Typography } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { SelectField } from "components/SelectField/SelectField"
import { TextField } from "components/TextField/TextField"

export default function DemoBookingPageClient() {
  const [fleetSize, setFleetSize] = useState("")
  const [industry, setIndustry] = useState("")

  return (
    <AuthLayout imageSrc="/assets/contact-us/bg.jpg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Book your exclusive demo
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Simple. Powerful. Affordable. <br />
          Let’s grab 15 minutes that work for you.
        </Typography>

        <SelectField
          label="Your fleet size"
          placeholder="Select your fleet size"
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
        >
          <MenuItem value="small">Small (1-10 vehicles)</MenuItem>
          <MenuItem value="medium">Medium (11-50 vehicles)</MenuItem>
          <MenuItem value="large">Large (50+ vehicles)</MenuItem>
        </SelectField>

        <TextField
          label="How many vehicles are in your fleet?"
          placeholder="e.g. 25"
        />

        <SelectField
          label="Your industry"
          placeholder="Select your industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <MenuItem value="construction">Construction</MenuItem>
          <MenuItem value="service">Service</MenuItem>
          <MenuItem value="logistics">Logistics</MenuItem>
        </SelectField>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="First Name" placeholder="John" />
          <TextField label="Last Name" placeholder="Doe" />
        </Box>

        <TextField
          label="Company Name"
          placeholder="e.g. Acme Inc."
        />

        {/* Work Email */}
        <TextField
          label="Work Email"
          placeholder="e.g. john@example.com"
        />

        <TextField
          label="Phone Number"
          placeholder="e.g. +1 (123) 456-7890"
        />

        <Button intent="primary" size="lg" fullWidth>
          Book Demo
        </Button>
      </Box>
    </AuthLayout>
  )
}
