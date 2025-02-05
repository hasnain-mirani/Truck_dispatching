import { Email, Lock } from "@mui/icons-material"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { TextField } from "components/TextField/TextField"

export const metadata: Metadata = {
  title: "Login to your account - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function LoginPage() {
  return (
    <AuthLayout imageSrc="/assets/auth/login/login.jpg">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}>
        <Typography variant="h5" fontWeight="bold">
          Welcome to Truckvise
        </Typography>
        <TextField label="Email ID" placeholder="e.g. john@example.com" startIcon={<Email />} />
        <TextField label="Password" passwordField placeholder="Your secret keyword to login" startIcon={<Lock />} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Box>

        <Button intent="primary" size="lg" fullWidth>
          LOGIN
        </Button>

        <Typography variant="body2">
          Don’t have an account? <Link href="/auth/register">Register</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
