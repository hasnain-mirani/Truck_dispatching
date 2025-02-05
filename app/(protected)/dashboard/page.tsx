import { Box, Button, Typography } from "@mui/material";
import { Metadata } from "next";
import { DashboardLayout } from "components/Layouts/DashboardLayout";

export const metadata: Metadata = {
    title: "Dashboard - Truckvise",
    twitter: {
      card: "summary_large_image",
    },
  }

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight="bold">
        Welcome to Fleet Management
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary">
          Add Partner
        </Button>
      </Box>
    </DashboardLayout>
  );
}
