import {Lock } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "components/Button/Button";
import { AuthLayout } from "components/Layouts/AuthLayout";
import { TextField } from "components/TextField/TextField";

export const metadata: Metadata = {
    title: "Reset Password - Truckvise",
    twitter: {
      card: "summary_large_image",
    },
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout imageSrc="/assets/auth/reset-password/reset-password.jpg">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}>
        <Typography variant="h5" fontWeight="bold">
          Reset Your Password
        </Typography>

        <TextField label="New Password" passwordField placeholder="Enter a new password" startIcon={<Lock />} />
        <TextField label="Confirm New Password" passwordField placeholder="Re-enter your new password" startIcon={<Lock />} />

        <Button intent="primary" size="lg" fullWidth>RESET PASSWORD</Button>

        <Typography variant="body2">
          Back to{" "}
          <Link href="/auth/login">
            Login
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
