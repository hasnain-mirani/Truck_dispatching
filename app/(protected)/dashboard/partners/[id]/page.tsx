import { Box, Button, Typography } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Single Truck - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" fontWeight="bold">
        Single truck
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary">
          Add Partner
        </Button>
      </Box>
    </div>
  )
}
