"use client"
import { Email } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { TextField } from "components/TextField/TextField"

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMsg("")

    if (!email) {
      setError("Email is required.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = (await response.json()) as { error?: string; message?: string }
      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send reset link")
      }

      setSuccessMsg("Reset link sent! Please check your email.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout imageSrc="/assets/auth/forgot-password/forgot-password.jpg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Reset Your Password
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter your email address below and we’ll send you a link to reset your password.
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {successMsg && (
          <Typography variant="body2" color="primary">
            {successMsg}
          </Typography>
        )}

        <TextField
          label="Email ID"
          placeholder="e.g. john@example.com"
          startIcon={<Email />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" intent="primary" size="lg" fullWidth disabled={isLoading} loading={isLoading}>
          {isLoading ? "SENDING..." : "SEND RESET LINK"}
        </Button>

        <Typography variant="body2">
          Remember your password? <Link href="/auth/login">Back to Login</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
