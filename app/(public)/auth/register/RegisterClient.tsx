"use client";
import { Email, Lock, Person } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "components/Button/Button";
import { AuthLayout } from "components/Layouts/AuthLayout";
import { TextField } from "components/TextField/TextField";

export default function RegisterClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setIsLoading(true);

    try {

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message: string;
        responseObject: { requiresVerification: boolean } | null;
        statusCode: number;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");
      }

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.responseObject?.requiresVerification) {
        router.push("/auth/verify-email");
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc="/assets/auth/register/register.jpg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Create Your Account
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="First Name"
            placeholder="e.g. John"
            startIcon={<Person />}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name" 
            placeholder="e.g. Doe"
            startIcon={<Person />}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
        </Box>

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
          placeholder="Enter a secure password"
          startIcon={<Lock />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <TextField
          label="Confirm Password"
          passwordField
          placeholder="Re-enter your password"
          startIcon={<Lock />}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <FormControlLabel
          control={
            <Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
          }
          label="I agree to the Terms and Conditions"
        />

        <Button type="submit" intent="primary" size="lg" fullWidth disabled={isLoading} loading={isLoading}>
          {isLoading ? "SIGNING UP..." : "SIGN UP"}
        </Button>

        <Typography variant="body2">
          Already have an account? <Link href="/auth/login">Login here</Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
