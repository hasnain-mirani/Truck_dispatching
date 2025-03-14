"use client";
import { Email, Lock } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "components/Button/Button";
import { AuthLayout } from "components/Layouts/AuthLayout";
import { TextField } from "components/TextField/TextField";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json() as { error: string };

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push('/dashboard');

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc="/assets/auth/login/login.jpg">
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 2, 
          width: "100%", 
          maxWidth: 350 
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome to Truckvise
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
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
        
        <TextField 
          label="Password" 
          passwordField 
          placeholder="Your secret keyword to login" 
          startIcon={<Lock />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Box>

        <Button 
          type="submit"
          intent="primary" 
          size="lg" 
          fullWidth
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </Button>

        <Typography variant="body2">
          Don't have an account? <Link href="/auth/register">Register</Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
