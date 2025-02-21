import { Box, Button, Grid, Typography } from "@mui/material";
import { Metadata } from "next";
import { ClickableCard } from "components/ClickableCard/ClickableCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partners - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
};

interface Partner {
  id: string;
  name: string;
  trucksCount: number;
  logoUrl: string;
}

async function getPartners(): Promise<Partner[]> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners`, { cache: "no-store" });
  // if (!res.ok) throw new Error("Failed to fetch partners");
  // return res.json();

  return [
    {
      id: "1",
      name: "DHL",
      trucksCount: 24,
      logoUrl: "/assets/dashboard/partners/dhl-logo.jpg",
    },
    {
      id: "2",
      name: "UPS",
      trucksCount: 12,
      logoUrl: "/assets/dashboard/partners/ups-logo.jpg",
    },
    {
      id: "3",
      name: "FedEx",
      trucksCount: 10,
      logoUrl: "/assets/dashboard/partners/FedEx-Logo.jpg",
    },
    {
      id: "4",
      name: "Freelancers",
      trucksCount: 50,
      logoUrl: "/assets/dashboard/partners/3d-trucks.jpg",
    },
  ];
}

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Partners
        </Typography>
        <Button variant="contained" color="primary">
          Add Partner
        </Button>
      </Box>

      <Grid container spacing={2}>
        {partners.map((partner) => (
          <Grid item key={partner.id}>
            <ClickableCard
              image={partner.logoUrl}
              title={`${partner.trucksCount} Trucks`}
              href={`/dashboard/partners/${partner.id}`}
              sx={{ width: 240 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
