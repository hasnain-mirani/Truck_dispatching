"use client"

import { Box, Container, Grid2, Paper, useMediaQuery, useTheme } from "@mui/material"
import { ReactNode } from "react"

interface AuthLayoutProps {
  imageSrc: string
  children: ReactNode
}

export function AuthLayout({ imageSrc, children }: AuthLayoutProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Container maxWidth="xl">
      <Grid2 container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Paper
          elevation={3}
          sx={{
            minHeight: "80%",
            width: "100%",
            maxWidth: 1200,
            overflow: "hidden",
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              flex: 7,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Box
            sx={{
              flex: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: "4px solid #fecf19",
              alignItems: "center",
              borderRadius: "0 20px 20px 0",
              p: 4,
            }}
          >
            {children}
          </Box>
        </Paper>
      </Grid2>
    </Container>
  )
}
