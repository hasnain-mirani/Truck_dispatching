import { Email, Lock, Person } from "@mui/icons-material"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { TextField } from "components/TextField/TextField"

export const metadata: Metadata = {
  title: "Create a new account - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}
export default function RegisterPage() {
  return (
    <AuthLayout imageSrc="/assets/auth/register/register.jpg">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}>
        <Typography variant="h5" fontWeight="bold">
          Create Your Account
        </Typography>

        <TextField label="Full Name" placeholder="e.g. John Doe" startIcon={<Person />} />
        <TextField label="Email ID" placeholder="e.g. john@example.com" startIcon={<Email />} />
        <TextField label="Password" passwordField placeholder="Enter a secure password" startIcon={<Lock />} />
        <TextField label="Confirm Password" passwordField placeholder="Re-enter your password" startIcon={<Lock />} />
        <FormControlLabel control={<Checkbox />} label="I agree to the Terms and Conditions" />

        <Button intent="primary" size="lg" fullWidth>
          SIGN UP
        </Button>
        <Typography variant="body2">
          Already have an account? <Link href="/auth/login">Login here</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
