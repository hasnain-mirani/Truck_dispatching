"use client"
import { Lock } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { cookies } from "next/headers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "components/Button/Button"
import { AuthLayout } from "components/Layouts/AuthLayout"
import { TextField } from "components/TextField/TextField"

interface ResetPasswordClientProps {
  token: string
}

export default function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const saveResetToken = async () => {
      const cookieStore = await cookies()
      cookieStore.set("resetToken", token)
    }
    saveResetToken()
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      })
      const data = (await response.json()) as { error?: string; message?: string }

      if (!response.ok) {
        throw new Error(data.error || data.message || "Reset password failed")
      }

      router.push("/auth/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout imageSrc="/assets/auth/reset-password/reset-password.jpg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Reset Your Password
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <TextField
          label="New Password"
          passwordField
          placeholder="Enter a new password"
          startIcon={<Lock />}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm New Password"
          passwordField
          placeholder="Re-enter your new password"
          startIcon={<Lock />}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" intent="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? "RESETTING..." : "RESET PASSWORD"}
        </Button>

        <Typography variant="body2">
          Back to <Link href="/auth/login">Login</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
