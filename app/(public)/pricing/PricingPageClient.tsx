"use client"

import { Box, Typography } from "@mui/material"
import { PricingCard } from "components/PricingCard/PricingCard"

const pricingPlans = [
  {
    title: "Essential",
    description: "For smaller fleets to organize vehicle inventory & manage inspections",
    totalPrice: 3,
    priceDescription: "per vehicle, per month, billed annually or $4 billed monthly*",
    trialText: "or Start a Free Trial for 30 days",
    trialLink: "#",
    onDemoClick: () => console.log("Essential Demo clicked!"),
  },
  {
    title: "Premium",
    description: "Helps professionals to manage your fleet with years of experience in fleet management",
    trialText: "or Start a Free Trial for 30 days",
    trialLink: "#",
    onDemoClick: () => console.log("Premium Demo clicked!"),
  },
]

export default function PricingPageClient() {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" color="#FBAB20" fontWeight="400">
        Get Started!
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        Automate your fleet operations
      </Typography>
      <Typography variant="h6" mb={4}>
        30-day free trial. Simple, scalable pricing. No credit card required.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 4,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title}
            description={plan.description}
            totalPrice={plan.totalPrice}
            priceDescription={plan.priceDescription}
            trialText={plan.trialText}
            trialLink={plan.trialLink}
            onDemoClick={plan.onDemoClick}
          />
        ))}
      </Box>
    </Box>
  )
}
