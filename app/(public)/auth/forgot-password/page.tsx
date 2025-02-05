import { Email } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { TextField } from "components/TextField/TextField"

export const metadata: Metadata = {
  title: "Forgot password - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout imageSrc="/assets/auth/forgot-password/forgot-password.jpg">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}>
        <Typography variant="h5" fontWeight="bold">
          Reset Your Password
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Enter your email address below and we’ll send you a link to reset your password.
        </Typography>

        <TextField label="Email ID" placeholder="e.g. john@example.com" startIcon={<Email />} />
        <Button intent="primary" size="lg" fullWidth>
          SEND RESET LINK
        </Button>

        <Typography variant="body2">
          Remember your password? <Link href="/auth/login">Back to Login</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
